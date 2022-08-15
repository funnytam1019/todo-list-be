import { ApiProperty } from '@nestjs/swagger';

export class DeleteTodoResponseDto {
  message: string;
  data: null;
  errors: { [key: string]: any };
}
