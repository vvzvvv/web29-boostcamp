import { Controller, Post, Param } from '@nestjs/common';

@Controller('problems')
export class ProblemsController {
  @Post(':problemId/submit')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  submit(@Param('problemId') problemId: string) {
    return {
      result: 'PASS',
      feedback: [],
    };
  }
}
