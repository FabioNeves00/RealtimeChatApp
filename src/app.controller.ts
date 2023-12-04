import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/api/chat')
export class ChatController {
  constructor(private readonly appService: AppService) {}

  @Get('/messages')
  getMessages() {
    return this.appService.getMessages();
  }
}
