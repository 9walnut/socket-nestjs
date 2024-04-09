import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { Repository } from 'typeorm';
import { AddChatDto } from './dto/add-chat.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
  ) {}

  async addChat(addChatDto: AddChatDto): Promise<Chat> {
    const newChat = this.chatRepository.create(addChatDto);
    await this.chatRepository.save(newChat);
    return newChat;
  }

  async getChat(): Promise<Chat[]> {
    return await this.chatRepository.find({ order: { timestamp: 'DESC' } });
  }
}
