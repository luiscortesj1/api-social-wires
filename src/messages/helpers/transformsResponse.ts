/* eslint-disable prettier/prettier */
import { Message } from '../entities';

export function transformMessageResp(message: Message) {
  return {
    id: message.id.toString(),
    user: message.user_id.toString(),
    title: message.title,
    text: message.content,
    comments: message.comments.map((comment) => ({
      comment: comment.comment,
      author: comment.author_id.toString(),
    })),
    reactions: message.reactions.map((reaction) => ({
      reaction: reaction.reaction,
      author: reaction.author_id.toString(),
    })),
    createdAt: message.createdAt.toISOString(),
  };
}
