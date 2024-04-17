import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as path from 'path';
import { User } from 'src/users/entities/user.entity';
import { Chat } from 'src/chat/entities/chat.entity';
import { ChatRoom } from 'src/chat/entities/chatroom.entity';
import { createDataSource } from 'data-source';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        console.log({
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_DATABASE'),
          entity: path.join(__dirname, '/../**/*.entity{.ts,.js}'),
          jwt: configService.get<string>('JWT_SECRET'),
        });
        return {
          type: 'mysql',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_DATABASE'),
          entities: [User, Chat, ChatRoom],
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: 'DATABASE_CONNECTION', // 데이터베이스 연결을 식별하는 고유한 토큰
      useFactory: async () => await createDataSource(), // createDataSource 함수를 사용하여 데이터베이스 연결을 생성합니다.
    },
  ],
  exports: [TypeOrmModule, 'DATABASE_CONNECTION'],
})
export class DatabaseModule {}
