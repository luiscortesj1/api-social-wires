import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMessageDto, CreateReactionDto } from './dto/index';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UnauthorizedException } from '@nestjs/common';
import { convertEmojiToAscii } from './helpers/emojiToAscii';
import { Comment, Message, Reaction } from './entities/index';
import { CreateCommentDto } from './dto/create-comment.dto';
import { RequestContext } from 'nestjs-request-context/dist/request-context.model';
import { transformMessageResp } from './helpers/transformsResponse';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messagesRepository: Repository<Message>,
    @InjectRepository(Reaction)
    private readonly reactionRepository: Repository<Reaction>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}
  async create(createMessageDto: CreateMessageDto) {
    try {
      const userID = RequestContext.currentContext.req.user.id;
      const { title, content } = createMessageDto;
      const message = await this.messagesRepository.create({
        title,
        content,
        user_id: userID,
      });
      await this.messagesRepository.save(message);
      return message;
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    try {
      const messages = await this.messagesRepository.find({
        relations: ['reactions', 'comments'],
      });
      return messages;
    } catch (error) {
      console.log(error);
    }
  }

  async findAllMe() {
    try {
      const userID = RequestContext.currentContext.req.user.id;
      const messages = await this.messagesRepository.find({
        where: { user_id: userID, active: true },
        relations: ['reactions', 'comments'],
      });
      console.log(messages);

      return messages;
    } catch (error) {
      console.log(error);
    }
  }

  async findOneMe(id: number) {
    try {
      const userID = RequestContext.currentContext.req.user.id;
      const message = await this.messagesRepository.findOne({
        where: { user_id: userID, id: id, active: true },
        relations: ['reactions', 'comments'],
      });

      if (!message) {
        return {
          message: 'El mensaje no fue encontrado',
          status: HttpStatus.NOT_FOUND,
        };
      }
      return message;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Ha ocurrido un error en la búsqueda del mensaje',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    try {
      const userID = RequestContext.currentContext.req.user.id;
      const message = await this.messagesRepository.findOne({
        where: { user_id: userID, id: id, active: true },
        relations: ['reactions', 'comments'],
      });

      if (!message) {
        return {
          message: 'El mensaje no fue encontrado',
          status: HttpStatus.NOT_FOUND,
        };
      }
      await this.messagesRepository.update({ id }, { active: false });
      return {
        delete: true,
        status: 'OK',
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Ha ocurrido un error en la búsqueda del mensaje',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async crearReaction(id: number, createReactionDto: CreateReactionDto) {
    const { reaction } = createReactionDto;
    const userID = RequestContext.currentContext.req.user.id;
    const message = await this.messagesRepository.findOne({
      where: { id: id, active: true },
    });
    if (!message) {
      return {
        message: 'El mensaje no fue encontrado',
        status: HttpStatus.NOT_FOUND,
      };
    }
    if (message.user_id === userID) {
      throw new UnauthorizedException('No puedes reacionar ');
    }
    const asciiCode = convertEmojiToAscii(reaction);
    const rea = await this.reactionRepository.create({
      reaction: asciiCode,
      author_id: userID,
      mensaje_id: id,
    });
    const resp = await this.messagesRepository.findOne({
      where: { id: id, active: true },
      relations: ['reactions', 'comments'],
    });
    return transformMessageResp(resp);
  }
  async crearComment(id: number, createCommentDto: CreateCommentDto) {
    const { comment } = createCommentDto;
    const userID = RequestContext.currentContext.req.user.id;
    const message = await this.messagesRepository.findOne({
      where: { id: id, active: true },
    });
    if (!message) {
      return {
        message: 'El mensaje no fue encontrado',
        status: HttpStatus.NOT_FOUND,
      };
    }
    if (message.user_id === userID) {
      throw new UnauthorizedException('No puedes comentar ');
    }
    const com = await this.commentRepository.create({
      comment,
      author_id: userID,
      mensaje_id: id,
    });
    await this.commentRepository.save(com);
    const resp = await this.messagesRepository.findOne({
      where: { id: id, active: true },
      relations: ['reactions', 'comments'],
    });
    return transformMessageResp(resp);
  }
}
