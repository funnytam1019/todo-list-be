import { Controller, Request, Post, UseGuards, Body, Get } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { UserGetDTO } from './interfaces/user/dto/get-user.dto';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  public async login(
    @Body() userRequest: UserGetDTO
    ) {
    return this.authService.login(userRequest);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(
    @Body() userRequest: UserGetDTO
  ) {
    console.log(userRequest.email)
    return userRequest;
  }
}