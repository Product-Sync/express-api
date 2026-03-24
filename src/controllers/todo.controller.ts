import { Request, Response } from 'express';
import * as repo from '../repositories/todo.repository';
import { TodoStatus, TodoPriority } from '../models/todo';

const VALID_STATUSES: TodoStatus[] = ['pending', 'active', 'completed'];
const VALID_PRIORITIES: TodoPriority[] = ['low', 'medium', 'high'];

export async function getAll(_req: Request, res: Response): Promise<void> {
  const todos = await repo.findAll();
  res.json(todos);
}

export async function getOne(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    res.status(400).json({ error: 'Invalid id' });
    return;
  }

  const todo = await repo.findById(id);
  if (!todo) {
    res.status(404).json({ error: 'Todo not found' });
    return;
  }
  res.json(todo);
}

export async function createOne(req: Request, res: Response): Promise<void> {
  const { title, description, priority } = req.body as {
    title?: unknown;
    description?: unknown;
    priority?: unknown;
  };

  if (typeof title !== 'string' || title.trim() === '') {
    res.status(400).json({ error: 'title is required and must be a non-empty string' });
    return;
  }
  if (description !== undefined && typeof description !== 'string') {
    res.status(400).json({ error: 'description must be a string' });
    return;
  }
  if (priority !== undefined && !VALID_PRIORITIES.includes(priority as TodoPriority)) {
    res.status(400).json({ error: `priority must be one of: ${VALID_PRIORITIES.join(', ')}` });
    return;
  }

  const todo = await repo.create({
    title: title.trim(),
    ...(description !== undefined && { description: (description as string).trim() }),
    ...(priority !== undefined && { priority: priority as TodoPriority }),
  });
  res.status(201).json(todo);
}

export async function updateOne(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    res.status(400).json({ error: 'Invalid id' });
    return;
  }

  const { title, description, status, priority } = req.body as {
    title?: unknown;
    description?: unknown;
    status?: unknown;
    priority?: unknown;
  };

  if (title !== undefined && (typeof title !== 'string' || title.trim() === '')) {
    res.status(400).json({ error: 'title must be a non-empty string' });
    return;
  }
  if (description !== undefined && typeof description !== 'string') {
    res.status(400).json({ error: 'description must be a string' });
    return;
  }
  if (status !== undefined && !VALID_STATUSES.includes(status as TodoStatus)) {
    res.status(400).json({ error: `status must be one of: ${VALID_STATUSES.join(', ')}` });
    return;
  }
  if (priority !== undefined && !VALID_PRIORITIES.includes(priority as TodoPriority)) {
    res.status(400).json({ error: `priority must be one of: ${VALID_PRIORITIES.join(', ')}` });
    return;
  }

  const todo = await repo.update(id, {
    ...(title !== undefined && { title: (title as string).trim() }),
    ...(description !== undefined && { description: (description as string).trim() }),
    ...(status !== undefined && { status: status as TodoStatus }),
    ...(priority !== undefined && { priority: priority as TodoPriority }),
  });

  if (!todo) {
    res.status(404).json({ error: 'Todo not found' });
    return;
  }
  res.json(todo);
}

export async function deleteOne(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    res.status(400).json({ error: 'Invalid id' });
    return;
  }

  const deleted = await repo.remove(id);
  if (!deleted) {
    res.status(404).json({ error: 'Todo not found' });
    return;
  }
  res.status(204).send();
}
