import { User } from 'src/auth/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Comment } from './Comment.entity';
import { Reaction } from './Reaction.entity';


@Entity()
export class Message {
  
  @PrimaryGeneratedColumn()
  id: number;
  @Column('text')
  title: string;
  @Column('text')
  content: string;
  @Column('number')
  user_id: number;
  @Column({ type: 'boolean', default: true })
  active: boolean;

  @ManyToOne(() => User, (user) => user.messages, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.message)
  comments: Comment;

  @OneToMany(() => Reaction, (reaction) => reaction.message)
  reactions: Reaction;

  @Column({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
