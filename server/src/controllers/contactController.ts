import { Request, Response } from 'express';
import { contactSchema } from '../validators/contactValidator.js';
import { EmailService } from '../services/emailService.js';
import { TurnstileService } from '../services/turnstileService.js';

export const handleContactSubmission = async (req: Request, res: Response) => {
  // 1. Zod Input Validation
  const validationResult = contactSchema.safeParse(req.body);

  if (!validationResult.success) {
    // Format field-specific errors safely
    const formattedErrors: Record<string, string[]> = {};
    for (const issue of validationResult.error.issues) {
      const field = issue.path[0]?.toString() || 'form';
      if (!formattedErrors[field]) {
        formattedErrors[field] = [];
      }
      formattedErrors[field].push(issue.message);
    }

    return res.status(400).json({
      status: 'error',
      message: 'Validation failed. Please verify your submission details.',
      errors: formattedErrors,
    });
  }

  const { data } = validationResult;

  // 2. Honeypot Spam Protection
  // If the hidden honeypot field is filled out, silently discard without sending email
  if (data._honeypot && data._honeypot.trim().length > 0) {
    console.warn('[Contact] Honeypot trap triggered; suppressing transmission.');
    return res.status(200).json({
      status: 'ok',
      message: 'Transmission confirmed. Your message has been routed to engineering dispatch.',
    });
  }

  // 3. Cloudflare Turnstile Server-Side Verification
  const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.ip;
  const turnstileResult = await TurnstileService.verifyToken(data.turnstileToken, clientIp);

  if (!turnstileResult.success) {
    if (turnstileResult.isUnconfigured) {
      return res.status(503).json({
        status: 'error',
        message: 'Security verification is temporarily unconfigured. Please email directly at azizsaddiquesaddique@gmail.com.',
      });
    }

    if (turnstileResult.isGatewayError) {
      return res.status(502).json({
        status: 'error',
        message: 'Security verification gateway is unreachable. Please try again shortly or email directly at azizsaddiquesaddique@gmail.com.',
      });
    }

    return res.status(400).json({
      status: 'error',
      message: 'Security verification failed. Please complete the verification challenge again.',
      errors: {
        turnstileToken: [turnstileResult.error || 'Verification challenge failed or expired.'],
      },
    });
  }

  // 4. Dispatch Notification via EmailService (only reached after Turnstile succeeds)
  const sendResult = await EmailService.sendContactNotification(data);

  if (!sendResult.success) {
    const isUnconfigured = sendResult.error?.includes('unconfigured');
    const statusCode = isUnconfigured ? 503 : 502;

    return res.status(statusCode).json({
      status: 'error',
      message: isUnconfigured
        ? 'The dispatch service is temporarily unconfigured. Please email directly at azizsaddiquesaddique@gmail.com.'
        : 'Transmission delivery failed. Please try again later or reach out directly at azizsaddiquesaddique@gmail.com.',
    });
  }

  // 4. Return Clean Confirmation
  return res.status(200).json({
    status: 'ok',
    message: 'Transmission confirmed. Your message has been routed to engineering dispatch.',
  });
};
