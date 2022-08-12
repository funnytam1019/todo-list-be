import { ITodo } from './task.interface';

export interface IServiceTodoSearchByUserIdResponse {
  status: number;
  message: string;
  tasks: ITodo[];
}
