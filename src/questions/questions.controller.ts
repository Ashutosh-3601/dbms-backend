import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './entities/question.entity';
import { Topics } from './entities/topics.entity';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createQuestionDto: CreateQuestionDto) {
    return await this.questionsService.create(createQuestionDto);
  }

  @Get(':code')
  async findAll(@Param('code') code: string) {
    const questions = await this.questionsService.findAll(code);
    return questions.map((ques) => new Question(ques));
  }

  @Get('topics/:code/:mod')
  async findTopics(@Param('code') code: string, @Param('mod') mod: number) {
    const topics = await this.questionsService.getTopics(code, Number(mod));
    return topics.map((topic) => new Topics(topic));
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionsService.update(id, updateQuestionDto);
  }
}
