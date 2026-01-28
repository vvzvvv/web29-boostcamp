'use client'

import { ProblemLeftSection } from '../../components/left-section'
import { ProblemRightSection } from '../../components/right-section'
import { CookbookProblemHeader } from './components/cookbook-header'

import { useMemo } from 'react'

import { mergeServiceDefaultValues } from '@/components/aws-services/registry/form-defaults-factory'
import type { IServiceMapper } from '@/components/aws-services/utils/serviceMapper'
import { ProblemFormProvider } from '@/contexts/problem-form-context'
import { FeedbackDetail } from '@/types/feedback.type'
import { GlobalSubmitConfig } from '@/types/submitConfig.types'

interface CookbookProblemClientProps {
  unitId: string
  cookbookId: string
  title: string
  description: string
  tags: string[]
  problemData: IServiceMapper[]
  initialFeedback: FeedbackDetail[]
  defaultConfigs: GlobalSubmitConfig
}

export default function CookbookProblemClient({
  unitId,
  cookbookId,
  title,
  description,
  tags,
  problemData,
  initialFeedback,
  defaultConfigs,
}: CookbookProblemClientProps) {
  const defaultValues = useMemo(
    () => mergeServiceDefaultValues(problemData),
    [problemData],
  )

  return (
    <ProblemFormProvider
      defaultValues={defaultValues}
      unitId={unitId}
      cookbookId={cookbookId}
      initialFeedback={initialFeedback}
      defaultConfigs={defaultConfigs}
    >
      <ProblemLeftSection problemData={problemData}>
        <CookbookProblemHeader
          title={title}
          description={description}
          tags={tags}
        />
      </ProblemLeftSection>

      <ProblemRightSection />
    </ProblemFormProvider>
  )
}
