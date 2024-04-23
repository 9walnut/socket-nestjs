import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { ChatService } from './chat.service';
import { ChatRoom } from './entities/chatroom.entity';
import { User } from 'src/users/entities/user.entity';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { ChatController } from './chat.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, ChatRoom, User]), AuthModule],
  providers: [ChatService, JwtStrategy, AuthService, UsersService],
  controllers: [ChatController],
  exports: [ChatService],
})
export class ChatModule {}
