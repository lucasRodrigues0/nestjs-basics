import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService, private configService: ConfigService) {}

  // http://localhost:3000/app/hello
  @Get('hello')
  getHello(): string {
    return this.configService.get('NODE_ENV');
  }
}
