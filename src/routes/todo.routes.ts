import { Router } from 'express';
import * as todo from '../controllers/todo.controller';
import { asyncHandler } from '../app';

const router = Router();

router.get('/', asyncHandler(todo.getAll));
router.post('/', asyncHandler(todo.createOne));
router.get('/:id', asyncHandler(todo.getOne));
router.put('/:id', asyncHandler(todo.updateOne));
router.delete('/:id', asyncHandler(todo.deleteOne));

export default router;
