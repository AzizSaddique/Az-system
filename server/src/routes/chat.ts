import { Router } from 'express';
import { handleChatSubmission } from '../controllers/chatController.js';

export const chatRouter = Router();

chatRouter.post('/', handleChatSubmission);
