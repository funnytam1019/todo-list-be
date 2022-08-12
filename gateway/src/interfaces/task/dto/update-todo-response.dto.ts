import { ApiProperty } from '@nestjs/swagger';
import { ITodo } from '../todo.interface';

export class UpdateTodoResponseDto {
  message: string;
  data: {
    task: ITodo;
  };
  errors: { [key: string]: any };
}
