export class Stats {
  sub1LastAddition: number;
  sub2LastAddition: number | null;
  sub1TotalQuestion: number;
  sub2TotalQuestion: number | null;
  constructor(args: GeneratedStats) {
    this.sub1LastAddition = args.lastAdditions[0];
    this.sub2LastAddition = args.lastAdditions[1];
    this.sub1TotalQuestion = args.totalQuestions[0];
    this.sub2TotalQuestion = args.totalQuestions[1];
  }
}

export interface GeneratedStats {
  lastAdditions: number[];
  totalQuestions: number[];
}
