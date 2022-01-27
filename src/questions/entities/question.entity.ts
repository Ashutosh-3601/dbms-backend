import { INSTRUCTORS, QUESTIONS, QUES_TOPICS } from '@prisma/client';
import { Instructor } from 'src/instructors/entities/instructor.entity';

export class Question {
  id: string;
  code: string;
  module: number;
  qno: number;
  text: string;
  figure: string | null;
  type: number;
  author: Instructor | null;
  date: number;
  topics: string[];
  constructor(
    question: QUESTIONS & {
      INSTRUCTORS: INSTRUCTORS;
      QUES_TOPICS: QUES_TOPICS[];
    },
  ) {
    this.id = `${question.CODE}_${question.MODULE}_${question.QNO}`;
    this.code = question.CODE;
    this.module = question.MODULE;
    this.qno = question.QNO;
    this.text = question.TEXT;
    this.figure = question.FIGURE;
    this.type = question.TYPE;
    this.author = question.AUTHOR ? new Instructor(question.INSTRUCTORS) : null;
    this.date = new Date(question.DATE).getTime();
    this.topics = question.QUES_TOPICS.map((ques) => ques.TOPIC);
  }
}
