import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Document } from 'mongoose';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<Document> {
    return await this.appService.getPing();
  }
}
