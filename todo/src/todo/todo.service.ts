import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
   constructor(
      @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>
   ) {
   }

   async all(): Promise<Todo[]> {
      return this.todoRepository.find();
   }

   async create(data: any): Promise<Todo> {
      return this.todoRepository.save(data);
   }

   async get(id: number): Promise<Todo> {
      return this.todoRepository.findOneBy({id});
   }

   async update(id: number, data: any): Promise<any> {
      return this.todoRepository.update(id, data);
   }

   async delete(id: number): Promise<any> {
      return this.todoRepository.delete(id);
   }
}
