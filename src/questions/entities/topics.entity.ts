import { TOPICS } from '@prisma/client';

export class Topics {
  topic: string;
  constructor(questopic: TOPICS) {
    this.topic = questopic.TOPIC;
  }
}
