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
import { ChatService } from './chat.service';
import { CreateChatRoomDto } from './dto/create-chat-room.dto';
import { ChatRoom } from './entities/chatroom.entity';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private jwtService: JwtService,
    private chatService: ChatService,
  ) {}

  private logger = new Logger('ChatGateway');

  @SubscribeMessage('createRoom')
  async handleCreateRoom(
    @ConnectedSocket() socket: Socket,
    @MessageBody() createChatRoomDto: CreateChatRoomDto,
  ): Promise<{ room: ChatRoom }> {
    const room = await this.chatService.createChatRoom(createChatRoomDto);
    this.logger.log(
      `New chat room created: ${room.roomname} with ID: ${room.roomId}`,
    );
    return { room };
  }

  @SubscribeMessage('requestRooms')
  async handleRequestRooms(@ConnectedSocket() socket: Socket): Promise<void> {
    const rooms = await this.chatService.getAllRooms();
    socket.emit('listRooms', rooms);
  }

  @SubscribeMessage('setNickname')
  handleSetNickname(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: { nickname: string },
  ): void {
    socket.data.user.nickname = data.nickname;
    this.logger.log(`Nickname set for ${socket.id}: ${data.nickname}`);
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: { room: string; nickname: string },
  ) {
    if (!data.nickname) {
      socket.emit('error', 'Nickname is required');
      return;
    }
    socket.data.user.nickname = data.nickname;
    socket.join(data.room);
    this.logger.log(`${data.nickname} joined room: ${data.room}`);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(
    @ConnectedSocket() socket: Socket,
    @MessageBody() room: string,
  ) {
    socket.leave(room);
    this.logger.log(`${socket.data.user.sub} left room: ${room}`);
  }

  @SubscribeMessage('chat')
  async handleMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody() payload: AddChatDto,
  ): Promise<void> {
    const message = await this.chatService.addChat(payload);
    this.server.to(payload.roomId.toString()).emit('chat', message);
    this.logger.log(`Message in room ${payload.roomId}:  - ${payload.message}`);
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
