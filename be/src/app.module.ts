import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from './chat/chat.gateway';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ChatController } from './chat/chat.controller';
import { DatabaseModule } from 'libs/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV || 'local'}`, '.env.local'],
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    ChatModule,
  ],
  controllers: [AppController, ChatController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
