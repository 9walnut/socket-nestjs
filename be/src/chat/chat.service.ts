import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { Repository } from 'typeorm';
import { AddChatDto } from './dto/add-chat.dto';
import { ChatRoom } from './entities/chatroom.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
    @InjectRepository(ChatRoom)
    private roomRepository: Repository<ChatRoom>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async addChat(addChatDto: AddChatDto): Promise<Chat> {
    const newChat = this.chatRepository.create(addChatDto);
    await this.chatRepository.save(newChat);
    return newChat;
  }

  async getChat(): Promise<Chat[]> {
    return await this.chatRepository.find({ order: { timestamp: 'DESC' } });
  }

  async addRoom(name: string, createdByUserId: number): Promise<ChatRoom> {
    const user = await this.userRepository.findOne({
      where: { usernumber: createdByUserId },
    });
    if (!user) {
      throw new Error('User not found'); // 유저를 찾지 못한 경우 오류 발생
    }
    const newRoom = this.roomRepository.create({ name, createdBy: user });
    await this.roomRepository.save(newRoom);
    return newRoom;
  }

  async getRooms(): Promise<ChatRoom[]> {
    return await this.roomRepository.find({
      relations: ['createdBy'],
      order: { id: 'ASC' },
    });
  }
}
