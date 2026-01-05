import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <main className="mx-auto max-w-[1200px] bg-neutral-400">
      <section className="grid place-items-center">
        <div className="h-[80px] w-[80px] bg-blue-900"></div>
        <p className="mt-8">AWS를 실전처럼 학습하세요</p>
        <p className="mt-6">
          실제 AWS 환경을 시뮬레이션하여 클라우드 인프라를 직접 구축하고
          설정해보세요. 안전한 샌드박스 환경에서 실습하며 배우는 가장 효과적인
          클라우드 학습 플랫폼입니다.
        </p>

        <div className="mt-6 flex gap-2">
          <Button>문제 풀기 시작하기</Button>
          <Button>플랫폼 둘러보기</Button>
        </div>
      </section>
    </main>
  )
}
