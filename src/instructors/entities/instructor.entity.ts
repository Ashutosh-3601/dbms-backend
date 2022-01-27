import { INSTRUCTORS } from '@prisma/client';

export class Instructor {
  id: string;
  fname: string;
  lname: string | null;
  email: string;
  password: string;
  sub1: string;
  sub2: string | null;
  constructor(partial: Partial<INSTRUCTORS>) {
    this.id = partial.ID;
    this.fname = partial.FNAME;
    this.lname = partial.LNAME;
    this.email = partial.EMAIL;
    this.password = partial.PASS;
    this.sub1 = partial.SUB1;
    this.sub2 = partial.SUB2;
  }
}
