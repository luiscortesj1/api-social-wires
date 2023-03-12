/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';
export class CreateReactionDto {
  @IsNotEmpty()
  reaction: string;
}
