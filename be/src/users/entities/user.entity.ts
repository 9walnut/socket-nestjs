import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Chat } from 'src/chat/entities/chat.entity';

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
}
