import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateTodoRequestDTO } from './interfaces/user/dto/create-todo-request.dto';
import { CreateUserRequestDTO } from './interfaces/user/dto/create-user-request.dto';

@Injectable()
export class AppService {

  constructor(
    @Inject('USER_SERVICE') private readonly UserClient: ClientProxy,
    @Inject('TODO_SERVICE') private readonly TodoClient: ClientProxy
  ) { }

  createUser(createUserRequest: CreateUserRequestDTO) {
    this.UserClient.emit(
      'user_created',
      createUserRequest
    );
  }

  createTodo(createTodoRequest: CreateTodoRequestDTO) {
    this.TodoClient.emit(
      'todo_created',
      createTodoRequest
    )
  }
}
