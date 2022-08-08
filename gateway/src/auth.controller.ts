import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { UserGetDTO } from './interfaces/user/dto/get-user.dto';

@Controller()
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(
    @Body() userRequest: UserGetDTO
    ) {
    return console.table(userRequest);
  }
}