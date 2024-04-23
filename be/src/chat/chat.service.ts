import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { Repository } from 'typeorm';
import { AddChatDto } from './dto/add-chat.dto';
import { ChatRoom } from './entities/chatroom.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateChatRoomDto } from './dto/create-chat-room.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
    @InjectRepository(ChatRoom)
    private chatRoomRepository: Repository<ChatRoom>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createChatRoom(
    createChatRoomDto: CreateChatRoomDto,
  ): Promise<ChatRoom> {
    const chatRoom = this.chatRoomRepository.create({
      roomname: createChatRoomDto.roomname,
    });

    return this.chatRoomRepository.save(chatRoom);
  }

  async getAllRooms(): Promise<ChatRoom[]> {
    return this.chatRoomRepository.find();
  }

  async addChat(addChatDto: AddChatDto): Promise<Chat> {
    const newChat = this.chatRepository.create({
      message: addChatDto.message,
    });

    return this.chatRepository.save(newChat);
  }

  // async getChat(): Promise<Chat[]> {
  //   return await this.chatRepository.find({ order: { timestamp: 'DESC' } });
  // }

  // async addRoom(name: string, createdByUserId: number): Promise<ChatRoom> {
  //   const user = await this.userRepository.findOne({
  //     where: { usernumber: createdByUserId },
  //   });
  //   if (!user) {
  //     throw new Error('User not found');
  //   }
  //   const newRoom = this.chatRoomRepository.create({ roomname, createdBy: user });
  //   await this.chatRoomRepository.save(newRoom);
  //   return newRoom;
  // }

  // async getRooms(): Promise<ChatRoom[]> {
  //   return await this.chatRoomRepository.find({
  //     relations: ['createdBy'],
  //     order: { id: 'ASC' },
  //   });
  // }
}
