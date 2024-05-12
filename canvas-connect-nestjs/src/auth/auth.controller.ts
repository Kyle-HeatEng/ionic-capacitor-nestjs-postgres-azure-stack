import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard, AuthRequest } from './auth.guard';
import { AuthService, UserRegisterRequest } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const access_token = await this.auth.login(body);

    return {
      success: true,
      message: 'User logged in successfully',
      data: [
        {
          access_token,
        },
      ],
    };
  }

  @Post('register')
  async register(@Body() body: UserRegisterRequest) {
    const message = await this.auth.register(body);

    return {
      success: true,
      message,
      data: [],
    };
  }

  @UseGuards(AuthGuard)
  @Get('test')
  async test(@Request() req: AuthRequest) {
    return {
      success: true,
      message: 'Test route',
      data: [],
    };
  }
}
