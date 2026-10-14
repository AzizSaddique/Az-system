import { z } from 'zod';

export const chatMessageSchema = z.object({
  role: z.enum(['user', 'model'], {
    errorMap: () => ({ message: "Role must be either 'user' or 'model'" }),
  }),
  text: z
    .string({ required_error: 'History message text is required' })
    .trim()
    .min(1, 'History message text cannot be empty')
    .max(4000, 'History message text cannot exceed 4000 characters'),
});

export const chatRequestSchema = z.object({
  message: z
    .string({ required_error: 'Message is required' })
    .trim()
    .min(1, 'Message cannot be empty')
    .max(1000, 'Message cannot exceed 1000 characters'),
  history: z
    .array(chatMessageSchema)
    .max(10, 'History cannot exceed 10 messages')
    .optional()
    .default([]),
});

export type ChatRequest = z.infer<typeof chatRequestSchema>;
export type ChatMessage = z.infer<typeof chatMessageSchema>;
