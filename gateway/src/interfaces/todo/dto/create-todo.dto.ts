import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  name: string;
  description: string;
  start_time: number;
  duration: number;
}
