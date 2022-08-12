import { ApiProperty } from '@nestjs/swagger';
import { ITodo } from '../todo.interface';

export class GetTodosResponseDto {
  message: string;
  data: {
    tasks: ITodo[];
  };
  errors: { [key: string]: any };
}
