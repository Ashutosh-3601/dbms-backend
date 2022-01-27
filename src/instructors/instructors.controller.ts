import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InstructorsService } from './instructors.service';
import { CreateInstructorDto } from './dto/create-instructor.dto';
import { Instructor } from './entities/instructor.entity';
import { LoginInstructorDTO } from './dto/login-instructor.dto';
import { Stats } from './entities/stats.entity';

@Controller('instructors')
export class InstructorsController {
  constructor(private readonly instructorsService: InstructorsService) {}

  @Post()
  async create(@Body() createInstructorDto: CreateInstructorDto) {
    try {
      return new Instructor(
        await this.instructorsService.create(createInstructorDto),
      );
    } catch {
      throw new HttpException('Already existing email', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll() {
    const instructors = await this.instructorsService.findAll();
    return instructors.map((ins) => new Instructor(ins));
  }

  @Post('login')
  async findOne(@Body() loginInstructorDto: LoginInstructorDTO) {
    const instructor = await this.instructorsService.login(loginInstructorDto);
    if (!instructor)
      throw new HttpException("User doesn't exist", HttpStatus.UNAUTHORIZED);
    else return new Instructor(instructor);
  }

  @Get('stats/:id')
  async getStats(@Param('id') id: string) {
    return new Stats(await this.instructorsService.generateStats(id));
  }
}
