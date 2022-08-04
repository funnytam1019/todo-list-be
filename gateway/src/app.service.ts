import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { createUserRequest } from './create-user-request.dto';

@Injectable()
export class AppService {
   private readonly users: any[] = [];

   constructor(@Inject('USER_SERVICE') 
      private readonly communicationClient: ClientProxy,
   ) {} 


   createUser(createUserRequest: createUserRequest) {
      this.users.push(createUserRequest);
      this.communicationClient.emit('user_created')
   }
}