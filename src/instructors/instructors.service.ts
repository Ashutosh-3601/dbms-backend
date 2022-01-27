import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateInstructorDto } from './dto/create-instructor.dto';
import { LoginInstructorDTO } from './dto/login-instructor.dto';

@Injectable()
export class InstructorsService {
  constructor(private prisma: PrismaService) {}

  create(createInstructorDto: CreateInstructorDto) {
    const id = this.genID();
    const newInstructorData = { ...createInstructorDto, ID: id };
    return this.prisma.iNSTRUCTORS.create({
      data: newInstructorData,
    });
  }

  findAll() {
    return this.prisma.iNSTRUCTORS.findMany();
  }

  findOne(email: string) {
    return this.prisma.iNSTRUCTORS.findUnique({
      where: {
        EMAIL: email,
      },
    });
  }

  login(loginInstructorDto: LoginInstructorDTO) {
    return this.prisma.iNSTRUCTORS.findUnique({
      where: {
        EMAIL: loginInstructorDto.EMAIL,
      },
    });
  }

  async generateStats(id: string) {
    const instructor = await this.prisma.iNSTRUCTORS.findUnique({
      where: { ID: id },
    });
    const lastAdditions: number[] = [];
    const totalQuestions: number[] = [];
    lastAdditions.push(await this.getLastAddition(instructor.SUB1));
    totalQuestions.push(await this.getQuestionCount(instructor.SUB1));
    if (instructor.SUB2) {
      lastAdditions.push(await this.getLastAddition(instructor.SUB2));
      totalQuestions.push(await this.getQuestionCount(instructor.SUB2));
    }
    return { lastAdditions: lastAdditions, totalQuestions: totalQuestions };
  }

  async getLastAddition(subcode: string) {
    const lastAddedQuestion = await this.prisma.qUESTIONS.findFirst({
      where: {
        CODE: subcode,
      },
      select: {
        DATE: true,
      },
      take: -1,
    });
    if (!lastAddedQuestion) return null;
    return new Date(lastAddedQuestion.DATE).getTime();
  }

  getQuestionCount(subcode: string) {
    return this.prisma.qUESTIONS.count({
      where: {
        CODE: subcode,
      },
    });
  }

  genID(len = 6) {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < len; i++) {
      id += chars[Math.floor(Math.random() * chars.length)];
    }
    return id;
  }
}
