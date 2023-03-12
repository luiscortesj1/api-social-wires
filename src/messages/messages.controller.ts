import { ApiTags } from '@nestjs/swagger/dist';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
@ApiTags('Messages')
@Controller('messages')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  createMessage(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }
  // TODO: MESSAGES
  @Get()
  findAll() {
    return this.messagesService.findAll();
  }

  @Get('me')
  findAllMe() {
    return this.messagesService.findAllMe();
  }
  @Get('me/:id')
  findOneMe(@Param('id') id: string) {
    return this.messagesService.findOneMe(+id);
  }

  @Delete('me/:id')
  remove(@Param('id') id: string) {
    return this.messagesService.remove(+id);
  }

  // TODO: REACTION
  @Patch('reaction/:id')
  reaction(
    @Param('id') id: string,
    @Body() createReactionDto: CreateReactionDto,
  ) {
    return this.messagesService.crearReaction(+id, createReactionDto);
  }

  // TODO: COMMENT
  @Patch('comment/:id')
  comment(@Param('id') id: string, @Body() createCommentDto: CreateCommentDto) {
    return this.messagesService.crearComment(+id, createCommentDto);
  }
}
