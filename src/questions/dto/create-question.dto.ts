import { IsString, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
export class CreateQuestionDto {
  //CODE, MODULE, QNO, TEXT, TYPE
  ID: string | null;
  /**
   * The Subject Code
   */
  @IsString()
  CODE: string;
  /**
   * Module Number
   */
  @Type(() => Number)
  @IsInt()
  MODULE: number;
  /**
   * Question Number
   */
  //QNO: number;
  /**
   * Text as actual question
   */
  @IsString()
  TEXT: string;
  /**
   * Location of figure stored on frontend machine
   */
  FIGURE: string | null;
  /**
   * Type of Question
   */
  @Type(() => Number)
  @IsInt()
  TYPE: number;
  /**
   * Name of question author id
   */
  AUTHOR?: string;

  TOPIC: string[];
}
