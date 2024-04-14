import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AddChatDto } from './dto/add-chat.dto';
import { createChatRoomDto } from './dto/create-chat-room.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async createChatRoom(@Body() createChatRoomDto: createChatRoomDto) {
    return this.chatService.createChatRoom(createChatRoomDto);
  }

  @Post('message')
  @UseGuards(JwtAuthGuard)
  async addChat(@Body() addChatDto: AddChatDto) {
    return this.chatService.addChat(addChatDto);
  }

  // @Get('message')
  // @UseGuards(JwtAuthGuard)
  // async getChat() {
  //   return this.chatService.getChat;
  // }
}
