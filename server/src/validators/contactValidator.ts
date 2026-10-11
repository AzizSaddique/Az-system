import { z } from 'zod';

export const ScopeEnum = z.enum([
  'fullstack',
  'iot',
  'career',
  'robotics',
  'general',
], {
  errorMap: () => ({ message: 'Please select a valid project scope (fullstack, iot, career, robotics, or general)' }),
});

export const contactSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .trim()
    .min(1, 'Name cannot be empty')
    .max(100, 'Name must be 100 characters or fewer'),
  email: z
    .string({ required_error: 'Email is required' })
    .trim()
    .email('Please provide a valid email address')
    .max(255, 'Email address must be 255 characters or fewer')
    .toLowerCase(),
  scope: ScopeEnum,
  message: z
    .string({ required_error: 'Message is required' })
    .trim()
    .min(1, 'Message cannot be empty')
    .max(800, 'Message cannot exceed 800 characters'),
  nda: z
    .boolean({ invalid_type_error: 'NDA selection must be a boolean' })
    .optional()
    .default(false),
  _honeypot: z
    .string()
    .optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

// Human-readable labels for scope values matching ContactPage.tsx options
export const SCOPE_LABELS: Record<z.infer<typeof ScopeEnum>, string> = {
  fullstack: 'Full-Stack Web or Mobile Development',
  iot: 'IoT & Embedded Hardware Prototyping',
  career: 'Full-Time / Engineering Role Inquiry',
  robotics: 'Robotics & ROS 2 Experimentation',
  general: 'Technical Consultation / Other',
};
