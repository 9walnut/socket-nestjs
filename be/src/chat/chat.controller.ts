import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AddChatDto } from './dto/add-chat.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('message')
  @UseGuards(JwtAuthGuard)
  async addChat(@Body() addChatDto: AddChatDto) {
    return this.chatService.addChat(addChatDto);
  }

  @Get('message')
  @UseGuards(JwtAuthGuard)
  async getChat() {
    return this.chatService.getChat;
  }
}
