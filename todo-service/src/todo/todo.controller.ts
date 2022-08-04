import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
   constructor(private todoService: TodoService) {

   }

   @Get()
   all() {
      return this.todoService.all();
   };

   @Post()
   create(
      @Body('title') title: string,
      @Body('description') description: string,
   ) {
      return this.todoService.create({title, description});
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
