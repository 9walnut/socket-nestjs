import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Chat } from 'src/chat/entities/chat.entity';
import { ChatRoom } from 'src/chat/entities/chatroom.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  usernumber: number;

  @Column({ unique: true })
  userid: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Chat, (chat) => chat.user)
  chats: Chat[];

  @OneToMany(() => ChatRoom, (chatRoom) => chatRoom.createdBy)
  chatRooms: ChatRoom[];
}
