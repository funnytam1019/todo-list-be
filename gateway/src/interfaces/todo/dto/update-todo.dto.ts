import { ApiProperty } from '@nestjs/swagger';

export class UpdateTodoDto {
  name: string;
  description: string;
  start_time: number;
  duration: number;
  is_solved: boolean;
}
