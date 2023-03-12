import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Reaction } from './entities/reaction.entity';
import { Comment } from './entities/Comment.entity';
import { RequestContextModule } from 'nestjs-request-context';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService],
  imports: [
    TypeOrmModule.forFeature([Message, Reaction, Comment]),
    RequestContextModule,
  ],
  exports: [TypeOrmModule],
})
export class MessagesModule {}
