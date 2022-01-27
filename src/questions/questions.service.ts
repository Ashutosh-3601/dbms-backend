import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionsService {
  constructor(private prisma: PrismaService) {}

  async create(createQuestionDto: CreateQuestionDto) {
    const lastQuestion = await this.prisma.qUESTIONS.findMany({
      where: {
        MODULE: Number(createQuestionDto.MODULE),
      },
      take: -1,
      select: {
        QNO: true,
      },
    });
    const topics = createQuestionDto.TOPIC;
    delete createQuestionDto.TOPIC;
    if ('ID' in createQuestionDto) delete createQuestionDto.ID;
    delete createQuestionDto.TOPIC;
    const lastQuestionNumber = lastQuestion.length ? ++lastQuestion[0].QNO : 1;
    const newQuestionData = {
      ...createQuestionDto,
      QNO: lastQuestionNumber,
      TOPICS: `${createQuestionDto.CODE}_${createQuestionDto.MODULE}_${lastQuestionNumber}`,
    };
    await this.prisma.qUESTIONS.create({
      data: newQuestionData,
    });
    for (const topic of topics) {
      await this.prisma.qUES_TOPICS.create({
        data: {
          ID: newQuestionData.TOPICS,
          CODE: newQuestionData.CODE,
          MODULE: newQuestionData.MODULE,
          QNO: newQuestionData.QNO,
          TOPIC: topic,
        },
      });
    }
  }

  findAll(code: string) {
    return this.prisma.qUESTIONS.findMany({
      where: {
        CODE: code,
      },
      include: {
        INSTRUCTORS: true,
        QUES_TOPICS: true,
      },
    });
  }

  getTopics(code: string, mod: number) {
    return this.prisma.tOPICS.findMany({
      where: {
        SUB: code,
        MODULE: mod,
      },
    });
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto) {
    const qno = Number(id.split('_').pop()); //QNO is in last
    const topics = updateQuestionDto.TOPIC;
    delete updateQuestionDto.TOPIC;
    if ('ID' in updateQuestionDto) delete updateQuestionDto.ID;
    console.log(updateQuestionDto);
    const UpdateQuestionData = {
      ...updateQuestionDto,
      QNO: qno,
      TOPICS: `${updateQuestionDto.CODE}_${updateQuestionDto.MODULE}_${qno}`,
    };
    await this.deleteTopics(
      updateQuestionDto.CODE,
      updateQuestionDto.MODULE,
      qno,
    );
    await this.prisma.qUESTIONS.updateMany({
      where: {
        CODE: updateQuestionDto.CODE,
        MODULE: Number(updateQuestionDto.MODULE),
        QNO: Number(qno),
      },
      data: updateQuestionDto,
    });
    for (const topic of topics) {
      await this.prisma.qUES_TOPICS.create({
        data: {
          ID: UpdateQuestionData.TOPICS,
          CODE: UpdateQuestionData.CODE,
          MODULE: UpdateQuestionData.MODULE,
          QNO: UpdateQuestionData.QNO,
          TOPIC: topic,
        },
      });
    }
  }

  async deleteTopics(code: string, mod: number, qno: number) {
    const topics = await this.prisma.qUES_TOPICS.findMany({
      where: {
        CODE: code,
        MODULE: mod,
        QNO: qno,
      },
    });
    for (const topic of topics) {
      await this.prisma.qUES_TOPICS.deleteMany({
        where: {
          CODE: topic.CODE,
          MODULE: topic.MODULE,
          QNO: topic.QNO,
        },
      });
    }
  }
}
