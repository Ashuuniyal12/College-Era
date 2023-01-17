import express from 'express';
import { createChat, findChat, userChat } from '../Controllers/ChatController.js';

const router = express.Router();

router.post('/', createChat);
router.get('/:userID', userChat);
router.get('/find/:firstID/:secondID', findChat);
export default router;