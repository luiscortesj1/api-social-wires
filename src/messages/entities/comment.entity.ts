/* eslint-disable prettier/prettier */
import { User } from 'src/auth/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Message } from './message.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  comment: string;
  @Column()
  author_id: number;
  @Column('number')
  mensaje_id: number;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'author_id' })
  user: User;

  @ManyToOne(() => Message, (message) => message.comments)
  @JoinColumn({ name: 'mensaje_id' })
  message: Message;
}
