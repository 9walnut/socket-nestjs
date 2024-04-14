import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Chat } from './chat.entity';

@Entity()
export class ChatRoom {
  @PrimaryGeneratedColumn()
  roomid: number;

  @Column()
  roomname: string;

  @ManyToOne(() => User, (user) => user.chats)
  createdBy: User;

  @OneToMany(() => Chat, (chat) => chat.room)
  chats: Chat[];
}
