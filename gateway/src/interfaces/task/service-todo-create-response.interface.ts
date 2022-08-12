import { ITodo } from './todo.interface';

export interface IServiceTodoCreateResponse {
  status: number;
  message: string;
  task: ITodo | null;
  errors: { [key: string]: any };
}
