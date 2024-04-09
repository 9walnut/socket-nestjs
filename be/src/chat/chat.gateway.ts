import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { AddChatDto } from './dto/add-chat.dto';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private jwtService: JwtService) {}

  private logger = new Logger('ChatGateway');

  @SubscribeMessage('chat')
  handleMessage(@MessageBody() payload: AddChatDto): void {
    this.logger.log(`Message received: ${payload.author} - ${payload.body}`);
    this.server.emit('chat', payload);
  }

  handleConnection(@ConnectedSocket() socket: Socket) {
    try {
      const token =
        (socket.handshake.query.token as string) ||
        socket.handshake.headers.authorization;
      if (!token) {
        throw new Error('No token provided');
      }
      const decoded = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      this.logger.log(`Connected: ${socket.id} with user ID: ${decoded.sub}`);
      socket.data.user = decoded;
    } catch (error) {
      this.logger.error(
        `Connection failed: ${socket.id}, reason: ${error.message}`,
      );
      socket.disconnect();
    }
  }

  handleDisconnect(socket: Socket) {
    this.logger.log(`Socket disconnected: ${socket.id}`);
  }
}
