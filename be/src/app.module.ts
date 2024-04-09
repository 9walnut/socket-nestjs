import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from './chat/chat.gateway';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ChatController } from './chat/chat.controller';
import { ChatService } from './chat/chat.service';
import { DatabaseModule } from 'libs/database/database.module';

@Module({
  imports: [DatabaseModule, AuthModule, UsersModule],
  controllers: [AppController, ChatController],
  providers: [AppService, ChatGateway, ChatService],
})
export class AppModule {}
