import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('register')
  register(@Body() body: any) { return this.auth.register(body); }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() body: any) { return this.auth.login(body); }

  @Post('admin/login')
  @HttpCode(HttpStatus.OK)
  adminLogin(@Body() body: any) { return this.auth.adminLogin(body); }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refresh(@Body() body: { refreshToken: string }) { return this.auth.refresh(body.refreshToken); }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Body() body: { refreshToken: string }) { return this.auth.logout(body.refreshToken); }
}
