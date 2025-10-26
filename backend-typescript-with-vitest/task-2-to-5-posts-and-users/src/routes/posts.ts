import { Router } from 'express';
import { getPosts, getPostsByUserId } from '../controllers/postsController';

const router = Router();

router.get('/', getPosts);
router.get('/:id', getPostsByUserId);

export default router;
