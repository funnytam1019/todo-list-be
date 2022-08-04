import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) { }

  @EventPattern('user_created')
  async createUser(data: any) {
    this.userService.createUser({
      id: data.id,
      name: data.name,
      age: data.age
    })
    console.log('Create new user', { user: data })
  }
}
