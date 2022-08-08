import { LocalAuthGuard } from "./auth/local-auth.guard";
import { Controller, UseGuards } from "@nestjs/common";
import { Post } from "@nestjs/common";
import { Request } from "@nestjs/common";

@Controller('auth')
export class AUthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }
}