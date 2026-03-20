import { Router, Request, Response } from 'express';
import { pool } from '../config/database';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'API is running' });
});

// Example: query the database
router.get('/ping-db', async (_req: Request, res: Response) => {
  const result = await pool.query('SELECT NOW() AS now');
  res.json({ db_time: result.rows[0].now });
});

export default router;
