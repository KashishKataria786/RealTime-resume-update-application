import express from 'express'
import {webhookController} from '../controllers/webhook.controllers.js'
import { verifySignature } from '../middlewares/verifyWebhook.js';
const webhookRouter = express.Router();

webhookRouter.post('/external-update',verifySignature,webhookController);

export default webhookRouter