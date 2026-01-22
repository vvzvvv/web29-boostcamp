'use client'

import type { FeedbackDetail } from '../components/feedback-detail-card'
import { DiagramPanel, ProblemFormContent } from './components'

import { useMemo } from 'react'

import { mergeServiceDefaultValues } from '@/components/aws-services/registry/form-defaults-factory'
import type { IServiceMapper } from '@/components/aws-services/utils/serviceMapper'
import { ProblemFormProvider } from '@/contexts/problem-form-context'
import type { DiagramData } from '@/types/diagram'

interface ProblemDetailClientProps {
  problemId: string
  problemData: IServiceMapper[]
  diagramData: DiagramData
  initialFeedback: FeedbackDetail[]
}

export default function ProblemDetailClient({
  problemId,
  problemData,
  diagramData,
  initialFeedback,
}: ProblemDetailClientProps) {
  const defaultValues = useMemo(
    () => mergeServiceDefaultValues(problemData),
    [problemData],
  )

  return (
    <ProblemFormProvider
      defaultValues={defaultValues}
      problemId={problemId}
      initialFeedback={initialFeedback}
    >
      <ProblemFormContent problemData={problemData} />
      <DiagramPanel diagramData={diagramData} />
    </ProblemFormProvider>
  )
}
