import { ITodo } from './todo.interface';

export interface IServiceTodoSearchByUserIdResponse {
  status: number;
  message: string;
  tasks: ITodo[];
}
