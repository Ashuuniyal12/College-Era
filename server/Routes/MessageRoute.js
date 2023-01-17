import express from 'express';
import { addMessage, getMessages } from '../Controllers/messgeController.js';

const router = express.Router();

router.post('/', addMessage);
router.get('/:chatID', getMessages);

export default router;