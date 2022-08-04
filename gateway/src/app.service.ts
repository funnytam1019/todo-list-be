import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { createTodoRequest } from './create-todo-request.dto';
import { CreateUserRequest } from './create-user-request.dto';

@Injectable()
export class AppService {

  constructor(
    @Inject('USER_SERVICE') private readonly UserClient: ClientProxy,
    @Inject('TODO_SERVICE') private readonly TodoClient: ClientProxy
  ) {}

  createUser(createUserRequest: CreateUserRequest) {
    this.UserClient.emit(
      'user_created',
      createUserRequest
    );
  }

  createTodo(createTodoRequest: createTodoRequest) {
   this.TodoClient.emit(
      'todo_created',
      createTodoRequest
   )
  }
}
