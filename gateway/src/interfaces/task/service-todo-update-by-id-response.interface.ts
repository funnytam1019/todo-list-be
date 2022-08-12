import { ITodo } from './task.interface';

export interface IServiceTodoUpdateByIdResponse {
  status: number;
  message: string;
  task: ITodo | null;
  errors: { [key: string]: any };
}
