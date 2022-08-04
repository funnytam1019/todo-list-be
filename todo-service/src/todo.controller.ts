import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { TodoService } from './todo.service';


@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  all() {
     return this.todoService.all();
  };

  @EventPattern('todo_created')
  async create(data: any) {
      this.todoService.create({title: data.title, description: data.description});
      console.log('Create new todo', {todo: data})
  }

  @Get(':id')
  async get(
     @Param('id') id: number
  ) {
     return this.todoService.get(id);
  }

  @Put(':id')
  async update(
     @Param('id') id: number,
     @Body('title') title: string,
     @Body('description') description: string
  ) {
     return this.todoService.update(id, {title, description})
  }

  @Delete(':id')
  async delete(
     @Param('id') id: number
  ) {
     return this.todoService.delete(id);
  } 
}
