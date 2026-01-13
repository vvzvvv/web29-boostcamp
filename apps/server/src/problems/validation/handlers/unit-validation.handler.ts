import { ValidationHandler } from './validation.handler';
import { SubmitResponseDto } from 'src/problems/dto/submit-response.dto';
import { ConfigDto } from 'src/problems/dto/submit-request.dto';
import { ProblemType } from 'src/problems/types/problem-type.enum';

export class UnitValidationHandler implements ValidationHandler {
  support(problemType: ProblemType): boolean {
    return problemType === ProblemType.UNIT;
  }

  validate(submitConfig: ConfigDto, problemData: any): SubmitResponseDto {
    // test 용 검증 로직: 제출한 풀이가 problemData.answer와 일치하는지 확인
    const answer = (submitConfig.configInfo?.answer ?? '') as string;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const expectedAnswer = problemData.answer as string;

    if (answer === expectedAnswer) {
      return { result: 'PASS', feedback: [] };
    }

    return {
      result: 'FAIL',
      feedback: [
        {
          field: 'answer',
          code: 'WRONG_ANSWER',
          message: '틀렸습니다.',
        },
      ],
    };
  }

  // 같은 것 제외하고 남은 차이점만 골라내기
  // onlyInAnswer: 제출 답안에만 있는 설정들. 정답에 없는 필요 없는 설정들
  // onlyInSolution: 정답에만 있는 설정들. 제출 답안에 없는 필수 설정들
  private checkDifference(
    answerConfigs: unknown[],
    solutionConfigs: unknown[],
  ): { onlyInAnswer: unknown[]; onlyInSolution: unknown[] } {
    const answer = [...answerConfigs];
    const solution = [...solutionConfigs];

    const matchedAnswerIndices = new Set<number>();
    const matchedSolutionIndices = new Set<number>();

    for (let i = 0; i < answer.length; i++) {
      if (matchedAnswerIndices.has(i)) continue;

      for (let j = 0; j < solution.length; j++) {
        if (matchedSolutionIndices.has(j)) continue;

        if (this.isDeepEqual(answer[i], solution[j])) {
          matchedAnswerIndices.add(i);
          matchedSolutionIndices.add(j);
          break;
        }
      }
    }

    const onlyInAnswer = answer.filter((_, i) => !matchedAnswerIndices.has(i));
    const onlyInSolution = solution.filter(
      (_, i) => !matchedSolutionIndices.has(i),
    );

    return {
      onlyInAnswer,
      onlyInSolution,
    };
  }

  private isDeepEqual(obj1: unknown, obj2: unknown): boolean {
    // 1. 참조가 같으면 true
    if (obj1 === obj2) return true;

    // 2. null 체크 및 타입 불일치 체크
    if (obj1 === null || obj2 === null || typeof obj1 !== typeof obj2) {
      return false;
    }

    // 3. 원시 타입(Primitive) 비교
    if (typeof obj1 !== 'object') {
      return obj1 === obj2;
    }

    // 4. Date 객체 처리
    if (obj1 instanceof Date && obj2 instanceof Date) {
      return obj1.getTime() === obj2.getTime();
    }

    // 5. 배열 처리
    if (Array.isArray(obj1) && Array.isArray(obj2)) {
      if (obj1.length !== obj2.length) return false;
      return obj1.every((item, index) => this.isDeepEqual(item, obj2[index]));
    }

    // 한쪽만 배열인 경우
    if (Array.isArray(obj1) || Array.isArray(obj2)) {
      return false;
    }

    // 6. 일반 객체 비교
    const o1 = obj1 as Record<string, unknown>;
    const o2 = obj2 as Record<string, unknown>;

    const keys1 = Object.keys(o1);
    const keys2 = Object.keys(o2);

    if (keys1.length !== keys2.length) return false;

    return keys1.every((key) => {
      if (!Object.prototype.hasOwnProperty.call(o2, key)) return false;

      // 재귀 호출
      return this.isDeepEqual(o1[key], o2[key]);
    });
  }
}
