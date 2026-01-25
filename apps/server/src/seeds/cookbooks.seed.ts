import { DataSource } from 'typeorm';
import { Cookbook } from '../entities/cookbook.entity';
import { CookbookProblem } from '../entities/cookbook-problem.entity';
import { Problem } from '../entities/problem.entity';
import { Tag } from '../entities/tag.entity';

export async function seedCookbooks(dataSource: DataSource): Promise<void> {
  const cookbookRepository = dataSource.getRepository(Cookbook);
  const cookbookProblemRepository = dataSource.getRepository(CookbookProblem);
  const problemRepository = dataSource.getRepository(Problem);
  const tagRepository = dataSource.getRepository(Tag);

  // 태그 찾기 또는 생성
  const tagNames = ['AWS', 'VPC', 'Networking', 'Beginner', '네트워크 기초'];
  const tags: Tag[] = [];
  for (const name of tagNames) {
    let tag = await tagRepository.findOne({ where: { name } });
    if (!tag) {
      tag = await tagRepository.save({ name });
    }
    tags.push(tag);
  }

  // Cookbook 생성
  const cookbook = await cookbookRepository.save({
    title: 'AWS VPC 네트워킹 기초',
    description:
      'AWS에서 VPC를 생성하고 퍼블릭 서브넷을 구성하는 방법을 단계별로 안내합니다',
    descDetail:
      'AWS에서 VPC를 생성하고 퍼블릭 서브넷을 구성하여 인터넷과 통신할 수 있는 네트워크 환경을 만드는 과정을 학습합니다. VPC 생성부터 라우팅 테이블 설정까지 단계별로 진행하며, 각 구성 요소의 역할과 관계를 이해합니다.',
    tags: tags,
  });

  // 문제들을 순서대로 가져오기
  const problems = await problemRepository.find({
    order: { id: 'ASC' },
  });

  if (problems.length < 5) {
    throw new Error('Not enough problems found. Please seed problems first.');
  }

  // Cookbook-Problem 연결
  const cookbookProblems = [
    {
      cookbookId: cookbook.id,
      problemId: problems[0].id,
      orderNumber: 1,
      cookbook: cookbook,
      problem: problems[0],
    },
    {
      cookbookId: cookbook.id,
      problemId: problems[1].id,
      orderNumber: 2,
      cookbook: cookbook,
      problem: problems[1],
    },
    {
      cookbookId: cookbook.id,
      problemId: problems[2].id,
      orderNumber: 3,
      cookbook: cookbook,
      problem: problems[2],
    },
    {
      cookbookId: cookbook.id,
      problemId: problems[3].id,
      orderNumber: 4,
      cookbook: cookbook,
      problem: problems[3],
    },
    {
      cookbookId: cookbook.id,
      problemId: problems[4].id,
      orderNumber: 5,
      cookbook: cookbook,
      problem: problems[4],
    },
  ];

  for (const cookbookProblem of cookbookProblems) {
    await cookbookProblemRepository.save(cookbookProblem);
  }

  console.log('Cookbook and CookbookProblems seeded successfully');
}
