/* eslint-disable prettier/prettier */
import { IsString, MinLength } from 'class-validator';
export class CreateCommentDto {
  @IsString()
  @MinLength(1)
  comment: string;
}
