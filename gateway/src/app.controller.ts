import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { createUserRequest } from './create-user-request.dto';

@Controller()
export class AppController {
   constructor(private readonly appService: AppService) {}
   
   @Post()
   createUser(@Body() createUserRequest: createUserRequest) {
         
   }
}