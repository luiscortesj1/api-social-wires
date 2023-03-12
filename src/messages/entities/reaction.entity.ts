/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { User } from '../../auth/entities/user.entity';
import { Message } from './message.entity';

@Entity()
export class Reaction {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('text')
  reaction: string;
  @Column('number')
  author_id: number;
  @Column('number')
  mensaje_id: number;

  @ManyToOne(() => User, (user) => user.reactions)
  @JoinColumn({ name: 'author_id' })
  user: User;

  @ManyToOne(() => Message, (message) => message.reactions)
  @JoinColumn({ name: 'mensaje_id' })
  message: Message;
}
