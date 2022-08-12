import { Controller, Get, Inject, Req } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Authorization } from "./decorators/authorization.decorator";
import { IAuthorizedRequest } from "./interfaces/common/authorized-request.interface";

@Controller('todo')
export class TodoController {
  constructor(
    @Inject('TODO_SERVICE') private readonly todoServiceClient: ClientProxy,
  ) {}

  @Get()
  @Authorization(true)
  public async getTodo(
    @Req() request: IAuthorizedRequest
  ): Promise<GetTodoResponseDto>
}