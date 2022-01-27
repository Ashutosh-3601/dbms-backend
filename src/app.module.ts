import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionsModule } from './questions/questions.module';
import { PrismaModule } from './prisma/prisma.module';
import { InstructorsModule } from './instructors/instructors.module';

@Module({
  imports: [QuestionsModule, PrismaModule, InstructorsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
