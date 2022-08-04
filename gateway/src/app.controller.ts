import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { createTodoRequest } from './create-todo-request.dto';
import { CreateUserRequest } from './create-user-request.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

   @Post()
   createUser(@Body() createUserRequest: CreateUserRequest) {
      this.appService.createUser(createUserRequest);
   }

   @Post('todo')
   createTodo(@Body() createTodoRequest: createTodoRequest) {
      this.appService.createTodo(createTodoRequest);
   }
}

