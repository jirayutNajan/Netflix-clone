import express from  'express';
import { getAllUsersDebug } from '../controllers/debug.controller.js';

const router = express.Router();

router.get("/users", getAllUsersDebug);

export default router;