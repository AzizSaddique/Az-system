import { Request, Response } from 'express';
import { contactSchema } from '../validators/contactValidator.js';
import { EmailService } from '../services/emailService.js';

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

  // 3. Dispatch Notification via EmailService
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
