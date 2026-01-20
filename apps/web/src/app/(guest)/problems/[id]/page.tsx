import { getProblemData } from './get-problem-data'
import ProblemDetailClient from './problem-detail-client'

interface ProblemDetailPageProps {
  params: Promise<{
    id: string
  }>
  searchParams: Promise<{
    type?: string
  }>
}

export default async function ProblemDetailPage({
  params,
  searchParams,
}: ProblemDetailPageProps) {
  const { id } = await params
  const { type: _type } = await searchParams

  const problemData = await getProblemData(id)

  return <ProblemDetailClient problemData={problemData} />
}
