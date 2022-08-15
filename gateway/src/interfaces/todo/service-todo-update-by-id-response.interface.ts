import { ITodo } from './todo.interface';

export interface IServiceTodoUpdateByIdResponse {
  status: number;
  message: string;
  task: ITodo | null;
  errors: { [key: string]: any };
}
