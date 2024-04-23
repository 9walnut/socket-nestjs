import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from 'src/users/entities/user.entity';
import { Chat } from 'src/chat/entities/chat.entity';
import { ChatRoom } from 'src/chat/entities/chatroom.entity';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ChatModule } from './chat/chat.module';
import { UsersService } from './users/users.service';
import { ChatService } from './chat/chat.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV || 'local'}`, '.env.local'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [User, Chat, ChatRoom],
        logging: true,
        synchronize: configService.get<boolean>('DATABASE_SYNCHRONIZE', false),
        migrationsRun: false,
        migrations: [__dirname + '/**/migrations/*.js}'],
        migrationsTableName: 'migrations',
      }),
    }),
    AuthModule,
    UsersModule,
    ChatModule,
  ],
  providers: [AuthService],
  exports: [TypeOrmModule],
})
export class AppModule {}
