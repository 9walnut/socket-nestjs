import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AddChatDto } from './dto/add-chat.dto';
import { CreateChatRoomDto } from './dto/create-chat-room.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('chat')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  // @Post('create')
  // @ApiBody({ type: CreateChatRoomDto })
  // @ApiOperation({ summary: '채팅방 만들기' })
  // @ApiResponse({ status: 201, description: '채팅방 만들기 성공' })
  // @ApiResponse({ status: 403, description: 'Forbidden' })
  // async createChatRoom(@Body() createChatRoomDto: CreateChatRoomDto) {
  //   return this.chatService.createChatRoom(createChatRoomDto);
  // }

  // @Post('message')
  // @ApiBody({ type: AddChatDto })
  // @ApiOperation({ summary: '메시지 전송' })
  // @ApiResponse({ status: 201, description: '메시지 전송 성공' })
  // @ApiResponse({ status: 403, description: 'Forbidden' })
  // async addChat(@Body() addChatDto: AddChatDto) {
  //   return this.chatService.addChat(addChatDto);
  // }

  // @Get('message')
  // @UseGuards(JwtAuthGuard)
  // async getChat() {
  //   return this.chatService.getChat;
  // }
}
