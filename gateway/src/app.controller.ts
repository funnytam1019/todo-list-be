import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateTodoRequestDTO } from './interfaces/user/dto/create-todo-request.dto';
import { CreateUserRequestDTO } from './interfaces/user/dto/create-user-request.dto';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

   @Post('user')
   createUser(@Body() createUserRequest: CreateUserRequestDTO) {
      this.appService.createUser(createUserRequest);
   }

   @Post('todo')
   createTodo(@Body() createTodoRequest: CreateTodoRequestDTO) {
      this.appService.createTodo(createTodoRequest);
   }
}

