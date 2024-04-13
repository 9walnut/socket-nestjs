import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { ChatService } from './chat.service';
import { ChatRoom } from './entities/chatroom.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, ChatRoom, User])],
  providers: [ChatService],
  exports: [ChatService],
})
export class ChatModule {}
