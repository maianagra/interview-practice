import { Router } from 'express';
import { getUserPosts } from '../controllers/userPostsController';

const router = Router();

router.get('/', getUserPosts);

export default router;
