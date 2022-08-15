import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, Post, Put, Req } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { first, firstValueFrom, retry } from "rxjs";
import { Authorization } from "./decorators/authorization.decorator";
import { IAuthorizedRequest } from "./interfaces/common/authorized-request.interface";
import { CreateTodoResponseDto } from "./interfaces/todo/dto/create-todo-response.dto";
import { CreateTodoDto } from "./interfaces/todo/dto/create-todo.dto";
import { DeleteTodoResponseDto } from "./interfaces/todo/dto/delete-todo-response.dto";
import { GetTodosResponseDto } from "./interfaces/todo/dto/get-todo-response.dto";
import { TodoIdDto } from "./interfaces/todo/dto/todo-id.dto";
import { UpdateTodoResponseDto } from "./interfaces/todo/dto/update-todo-response.dto";
import { UpdateTodoDto } from "./interfaces/todo/dto/update-todo.dto";
import { IServiceTodoCreateResponse } from "./interfaces/todo/service-todo-create-response.interface";
import { IServiceTodoDeleteResponse } from "./interfaces/todo/service-todo-delete-response.interface";
import { IServiceTodoSearchByUserIdResponse } from "./interfaces/todo/service-todo-search-by-user-id-response.interface";
import { IServiceTodoUpdateByIdResponse } from "./interfaces/todo/service-todo-update-by-id-response.interface";

@Controller('todo')
export class TodoController {
  constructor(
    @Inject('TODO_SERVICE') private readonly todoServiceClient: ClientProxy,
  ) {}

  @Get()
  @Authorization(true)
  public async getTodo(
    @Req() request: IAuthorizedRequest
  ): Promise<GetTodosResponseDto> {
    const userInfo = request.user;

    const todoResponse: IServiceTodoSearchByUserIdResponse = await firstValueFrom(
      this.todoServiceClient.send('todo_search_by_user_id', userInfo.id)
    );
    
    return {
      message: todoResponse.message,
      data: {
        tasks: todoResponse.tasks,
      },
      errors: null,
    };
  }

  @Post()
  @Authorization(true)
  public async createTask(
    @Req() request: IAuthorizedRequest,
    @Body() todoRequest: CreateTodoDto
  ): Promise<CreateTodoResponseDto> {
    const userInfo = request.user;
    const createTodoResponse: IServiceTodoCreateResponse = await firstValueFrom(
      this.todoServiceClient.send(
        'task_create',
        Object.assign(todoRequest, { user_id: userInfo.id }),
      ),
    );

    if(createTodoResponse.status !== HttpStatus.CREATED) {
      throw new HttpException(
        {
          message: createTodoResponse.message,
          data: null,
          errors: createTodoResponse.errors,
        },
        createTodoResponse.status
      );
    }

    return {
      message: createTodoResponse.message,
      data: {
        task: createTodoResponse.task,
      },
      errors: null,
    };
  }

  @Delete(':id')
  @Authorization(true)
  public async deleteTodo(
    @Req() request: IAuthorizedRequest,
    @Param() params: TodoIdDto,
  ): Promise<DeleteTodoResponseDto> {
    const userInfo = request.user;

    const deleteTodoResponse: IServiceTodoDeleteResponse = await firstValueFrom(
      this.todoServiceClient.send('task_delete_by_id', {
        id: params.id,
        userId: userInfo.id,
      }),
    );

    if(deleteTodoResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: deleteTodoResponse.message,
          errors: deleteTodoResponse.errors,
          data: null,
        },
        deleteTodoResponse.status,
      );
    }

    return {
      message: deleteTodoResponse.message,
      data: null,
      errors: null,
    };
  }

  @Put(':id')
  @Authorization(true)
  public async updateTodo(
    @Req() request: IAuthorizedRequest,
    @Param() params: TodoIdDto,
    @Body() todoRequest: UpdateTodoDto,
  ): Promise<UpdateTodoResponseDto> {
    const userInfo = request.user;
    const updateTodoResponse: IServiceTodoUpdateByIdResponse = await firstValueFrom(
      this.todoServiceClient.send('todo_update_by_id', {
        id: params.id,
        userInfo: userInfo.id,
        task: todoRequest,
      }),
    );

    if (updateTodoResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: updateTodoResponse.message,
          errors: updateTodoResponse.errors,
          data: null,
        },
        updateTodoResponse.status,
      );
    }

    return {
      message: updateTodoResponse.message,
      data: {
        task: updateTodoResponse.task,
      },
      errors: null,
    };

  }


}