import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
