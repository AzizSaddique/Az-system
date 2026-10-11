import { Request, Response } from 'express';
import { chatRequestSchema } from '../validators/chatValidator.js';
import { aiService, AiServiceError } from '../services/aiService.js';

export const handleChatSubmission = async (req: Request, res: Response) => {
  // 1. Zod Input Validation
  const validationResult = chatRequestSchema.safeParse(req.body);

  if (!validationResult.success) {
    const formattedErrors: Record<string, string[]> = {};
    for (const issue of validationResult.error.issues) {
      const field = issue.path[0]?.toString() || 'chat';
      if (!formattedErrors[field]) {
        formattedErrors[field] = [];
      }
      formattedErrors[field].push(issue.message);
    }

    return res.status(400).json({
      status: 'error',
      message: 'Validation failed. Please verify your query parameters.',
      errors: formattedErrors,
    });
  }

  const { message, history } = validationResult.data;

  // 2. Check configuration state early
  if (!aiService.isConfigured()) {
    return res.status(503).json({
      status: 'error',
      message:
        'AI Portfolio Assistant service is currently unconfigured or unavailable. Please reach out directly via the contact form or email at azizsaddiquesaddique@gmail.com.',
    });
  }

  // 3. Generate reply through Gemini service
  try {
    const reply = await aiService.generateReply(message, history);

    return res.status(200).json({
      status: 'ok',
      reply,
    });
  } catch (err: unknown) {
    if (err instanceof AiServiceError) {
      return res.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    return res.status(500).json({
      status: 'error',
      message: 'An unexpected error occurred while processing your request. Please try again later.',
    });
  }
};
