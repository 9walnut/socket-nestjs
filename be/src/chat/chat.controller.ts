import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AddMessageDto } from './dto/add-message.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('message')
  @UseGuards(JwtAuthGuard)
  async addMessage(@Body() addMessageDto: AddMessageDto) {
    return this.chatService.addMessage(addMessageDto);
  }

  @Get('message')
  @UseGuards(JwtAuthGuard)
  async getMessage() {
    return this.chatService.getMessage();
  }
}
