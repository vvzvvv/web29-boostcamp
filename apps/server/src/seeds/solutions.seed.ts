import { DataSource } from 'typeorm';
import { Solution } from '../entities/solution.entity';
import { Problem } from '../entities/problem.entity';

export async function seedSolutions(dataSource: DataSource): Promise<void> {
  const solutionRepository = dataSource.getRepository(Solution);
  const problemRepository = dataSource.getRepository(Problem);

  // 문제들을 title 순서로 가져오기
  const problems = await problemRepository.find({
    order: { id: 'ASC' },
  });

  if (problems.length < 5) {
    throw new Error('Not enough problems found. Please seed problems first.');
  }

  const solutions = [
    {
      problem: problems[0], // 충분히 넓은 VPC 네트워크 만들기
      answerConfig: {
        vpc: {
          cidrBlock: '10.0.0.0/16',
        },
      },
    },
    {
      problem: problems[1], // VPC 안에 포함되는 Subnet 생성하기
      answerConfig: {
        subnet: {
          vpcId: '@vpc',
          cidrBlock: '10.0.1.0/24',
        },
      },
    },
    {
      problem: problems[2], // 퍼블릭 서브넷 생성하기
      answerConfig: {
        subnet: {
          vpcId: '@vpc',
          cidrBlock: '10.0.2.0/24',
          mapPublicIpOnLaunch: true,
        },
      },
    },
    {
      problem: problems[3], // Internet Gateway 연결하기
      answerConfig: {
        internetGateway: {
          vpcId: '@vpc',
        },
      },
    },
    {
      problem: problems[4], // 라우팅 테이블 설정하기
      answerConfig: {
        routeTable: {
          vpcId: '@vpc',
        },
        route: {
          destinationCidrBlock: '0.0.0.0/0',
          gatewayId: '@internetGateway',
        },
        routeTableAssociation: {
          subnetId: '@subnet',
          routeTableId: '@routeTable',
        },
      },
    },
  ];

  for (const solutionData of solutions) {
    await solutionRepository.save(solutionData);
  }

  console.log('Solutions seeded successfully');
}
