import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty()
  @Column('text', { unique: true })
  username: string;
  @ApiProperty()
  @Column('text', { unique: true })
  email: string;
  @ApiProperty()
  @Exclude()
  @Column('text')
  password: string;
  @ApiProperty()
  @Column('text')
  fullname: string;
  @ApiProperty()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ApiProperty()
  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];
  @ApiProperty()
  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
  @ApiProperty()
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
