import { pool } from '../config/database';
import { Todo, CreateTodoDto, UpdateTodoDto } from '../models/todo';

export async function findAll(): Promise<Todo[]> {
  const { rows } = await pool.query<Todo>(
    'SELECT * FROM todos ORDER BY created_at DESC',
  );
  return rows;
}

export async function findById(id: number): Promise<Todo | null> {
  const { rows } = await pool.query<Todo>(
    'SELECT * FROM todos WHERE id = $1',
    [id],
  );
  return rows[0] ?? null;
}

export async function create(dto: CreateTodoDto): Promise<Todo> {
  const { rows } = await pool.query<Todo>(
    `INSERT INTO todos (title, description, priority)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [dto.title, dto.description ?? null, dto.priority ?? 'medium'],
  );
  return rows[0];
}

export async function update(id: number, dto: UpdateTodoDto): Promise<Todo | null> {
  const fields: string[] = [];
  const values: unknown[] = [];
  let idx = 1;

  if (dto.title !== undefined) {
    fields.push(`title = $${idx++}`);
    values.push(dto.title);
  }
  if (dto.description !== undefined) {
    fields.push(`description = $${idx++}`);
    values.push(dto.description);
  }
  if (dto.status !== undefined) {
    fields.push(`status = $${idx++}`);
    values.push(dto.status);
  }
  if (dto.priority !== undefined) {
    fields.push(`priority = $${idx++}`);
    values.push(dto.priority);
  }

  if (fields.length === 0) return findById(id);

  fields.push(`updated_at = NOW()`);
  values.push(id);

  const { rows } = await pool.query<Todo>(
    `UPDATE todos SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`,
    values,
  );
  return rows[0] ?? null;
}

export async function remove(id: number): Promise<boolean> {
  const { rowCount } = await pool.query(
    'DELETE FROM todos WHERE id = $1',
    [id],
  );
  return (rowCount ?? 0) > 0;
}
