import { Resend } from 'resend';
import { env } from '../config/env.js';
import { SCOPE_LABELS, ContactInput } from '../validators/contactValidator.js';

// Safe HTML character escaping to prevent HTML injection in emails
export const escapeHtml = (str: string): string => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

export interface EmailSendResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

let resendClient: Resend | null = null;

const getResendClient = (): Resend => {
  if (!env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not configured on the server');
  }
  if (!resendClient) {
    resendClient = new Resend(env.RESEND_API_KEY);
  }
  return resendClient;
};

export class EmailService {
  /**
   * Generates a plain-text version of the contact notification email.
   */
  public static generatePlainText(data: ContactInput, timestamp: string): string {
    const scopeLabel = SCOPE_LABELS[data.scope] || data.scope;
    const ndaStatus = data.nda
      ? 'YES (Confidential initiative / NDA preferred prior to detailed specs)'
      : 'NO (Standard inquiry)';

    return [
      '====================================================',
      'AZ // DISPATCH NODE - NEW TRANSMISSION PAYLOAD',
      '====================================================',
      '',
      `SENDER IDENTIFIER:  ${data.name}`,
      `RETURN ADDRESS:     ${data.email}`,
      `PROJECT SCOPE:      ${scopeLabel} [${data.scope}]`,
      `CONFIDENTIAL NDA:   ${ndaStatus}`,
      `SUBMISSION TIME:    ${timestamp}`,
      '',
      '----------------------------------------------------',
      'MESSAGE PAYLOAD:',
      '----------------------------------------------------',
      data.message,
      '',
      '----------------------------------------------------',
      `Note: Replying directly to this email will deliver to: ${data.email}`,
      '====================================================',
    ].join('\n');
  }

  /**
   * Generates a styled, cyber-industrial HTML version of the contact notification email.
   */
  public static generateHtml(data: ContactInput, timestamp: string): string {
    const safeName = escapeHtml(data.name);
    const safeEmail = escapeHtml(data.email);
    const safeScope = escapeHtml(SCOPE_LABELS[data.scope] || data.scope);
    const safeMessage = escapeHtml(data.message).replace(/\n/g, '<br/>');
    const safeTime = escapeHtml(timestamp);
    const ndaBadge = data.nda
      ? '<span style="color: #ffd166; font-weight: bold; background: rgba(255, 209, 102, 0.15); padding: 2px 8px; border-radius: 4px;">YES - NDA PREFERRED</span>'
      : '<span style="color: #94a3b8; background: rgba(148, 163, 184, 0.1); padding: 2px 8px; border-radius: 4px;">STANDARD INQUIRY</span>';

    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Portfolio Contact Inquiry</title>
</head>
<body style="margin: 0; padding: 24px; background-color: #0c0f14; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #e2e8f0;">
  <div style="max-width: 640px; margin: 0 auto; background-color: #151921; border: 1px solid #2d3748; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
    
    <!-- Top Header -->
    <div style="background-color: #1a202c; border-bottom: 1px solid #2d3748; padding: 20px 24px; display: flex; align-items: center; justify-content: space-between;">
      <div>
        <div style="font-family: monospace; font-size: 11px; letter-spacing: 0.15em; color: #00f2fe; text-transform: uppercase; font-weight: bold;">
          COMMUNICATION_LINK // 04_CONTACT
        </div>
        <h1 style="margin: 4px 0 0 0; font-size: 18px; font-weight: 700; color: #ffffff;">
          New Client Transmission Received
        </h1>
      </div>
    </div>

    <!-- Metadata Grid -->
    <div style="padding: 24px; border-bottom: 1px solid #232a3b;">
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr>
          <td style="padding: 8px 0; color: #94a3b8; width: 140px; font-family: monospace; font-size: 12px; text-transform: uppercase;">Sender Name:</td>
          <td style="padding: 8px 0; font-weight: 600; color: #ffffff;">${safeName}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #94a3b8; font-family: monospace; font-size: 12px; text-transform: uppercase;">Return Address:</td>
          <td style="padding: 8px 0; color: #00f2fe; font-family: monospace;"><a href="mailto:${safeEmail}" style="color: #00f2fe; text-decoration: none;">${safeEmail}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #94a3b8; font-family: monospace; font-size: 12px; text-transform: uppercase;">Project Scope:</td>
          <td style="padding: 8px 0; color: #ffffff; font-weight: 500;">${safeScope}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #94a3b8; font-family: monospace; font-size: 12px; text-transform: uppercase;">Confidentiality:</td>
          <td style="padding: 8px 0;">${ndaBadge}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #94a3b8; font-family: monospace; font-size: 12px; text-transform: uppercase;">Timestamp:</td>
          <td style="padding: 8px 0; color: #cbd5e1; font-family: monospace; font-size: 12px;">${safeTime}</td>
        </tr>
      </table>
    </div>

    <!-- Message Payload Box -->
    <div style="padding: 24px;">
      <div style="font-family: monospace; font-size: 11px; letter-spacing: 0.1em; color: #94a3b8; text-transform: uppercase; margin-bottom: 10px;">
        TRANSMISSION PAYLOAD // MESSAGE CONTENT
      </div>
      <div style="background-color: #0d1117; border: 1px solid #232a3b; border-radius: 8px; padding: 18px; color: #f1f5f9; font-size: 14px; line-height: 1.6; word-break: break-word;">
        ${safeMessage}
      </div>
    </div>

    <!-- Footer Note -->
    <div style="background-color: #12161f; border-top: 1px solid #232a3b; padding: 16px 24px; font-size: 12px; color: #64748b; font-family: monospace;">
      <div>⚡ Reply directly to this email to respond to <strong style="color: #94a3b8;">${safeEmail}</strong>.</div>
      <div style="margin-top: 4px;">Muhammad Aziz Saddique Portfolio • Automated Dispatch Engine</div>
    </div>

  </div>
</body>
</html>
    `.trim();
  }

  /**
   * Dispatches the contact notification email via the official Resend SDK.
   */
  public static async sendContactNotification(data: ContactInput): Promise<EmailSendResult> {
    const timestamp = new Date().toISOString();
    const plainText = this.generatePlainText(data, timestamp);
    const html = this.generateHtml(data, timestamp);
    const scopeLabel = SCOPE_LABELS[data.scope] || data.scope;

    try {
      const resend = getResendClient();

      const { data: resendData, error: resendError } = await resend.emails.send({
        from: env.CONTACT_FROM_EMAIL,
        to: env.CONTACT_TO_EMAIL,
        subject: `[Portfolio Inquiry] ${data.name} // ${scopeLabel}`,
        replyTo: data.email,
        text: plainText,
        html: html,
      });

      if (resendError) {
        // Safe logging without leaking credentials or message content
        console.error('[EmailService] Resend rejected transmission:', resendError.name, resendError.message);
        return {
          success: false,
          error: 'Email delivery provider rejected the transmission',
        };
      }

      console.log(`[EmailService] Contact notification sent successfully. Message ID: ${resendData?.id}`);

      return {
        success: true,
        messageId: resendData?.id,
      };
    } catch (err: any) {
      console.error('[EmailService] Failed to send email:', err?.message || err);
      const isUnconfigured = err?.message?.includes('not configured');
      return {
        success: false,
        error: isUnconfigured
          ? 'Email dispatch service is currently unconfigured'
          : 'Failed to communicate with email delivery provider',
      };
    }
  }
}
