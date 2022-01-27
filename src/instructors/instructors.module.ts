import { Module } from '@nestjs/common';
import { InstructorsService } from './instructors.service';
import { InstructorsController } from './instructors.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [InstructorsController],
  providers: [InstructorsService],
  imports: [PrismaModule],
})
export class InstructorsModule {}
