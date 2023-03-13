import { Exclude } from 'class-transformer';
import { Comment } from 'src/messages/entities/Comment.entity';
import { Message } from 'src/messages/entities/message.entity';
import { Reaction } from 'src/messages/entities/Reaction.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

@Entity('users')
export class User {
  
  @PrimaryGeneratedColumn()
  id: number;
  @Column('text', { unique: true })
  username: string;
  @Column('text', { unique: true })
  email: string;
  @Exclude()
  @Column('text')
  password: string;
  @Column('text')
  fullname: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
  
  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];
  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
  
  @OneToMany(() => Reaction, (reaction) => reaction.user)
  reactions: Reaction[];

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLocaleLowerCase().trim();
    this.username = this.username.toLocaleLowerCase().trim();
  }
  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}
