export type TodoStatus = 'pending' | 'active' | 'completed';
export type TodoPriority = 'low' | 'medium' | 'high';

export interface Todo {
  id: number;
  title: string;
  description: string | null;
  status: TodoStatus;
  priority: TodoPriority;
  created_at: Date;
  updated_at: Date;
}

export interface CreateTodoDto {
  title: string;
  description?: string;
  priority?: TodoPriority;
}

export interface UpdateTodoDto {
  title?: string;
  description?: string;
  status?: TodoStatus;
  priority?: TodoPriority;
}
