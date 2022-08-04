import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
   imports: [
      TypeOrmModule.forRoot({
         type: 'mysql',
         host: 'localhost',
         port: 3306,
         username: 'root',
         password: 'T@m1011999',
         database: 'nest_todo',
         autoLoadEntities: true, 
         synchronize: true,
      }),
      TodoModule
   ],
})
export class AppModule {}