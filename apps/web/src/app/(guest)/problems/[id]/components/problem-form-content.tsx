'use client'

import {
  type IServiceMapper,
  serviceMapper,
} from '@/components/aws-services/utils/serviceMapper'
import { useProblemForm } from '@/contexts/problem-form-context'
import type { S3BucketFormData } from '@/types/aws-services/s3/bucket-create'

interface ProblemFormContentProps {
  problemData: IServiceMapper[]
}

export function ProblemFormContent({ problemData }: ProblemFormContentProps) {
  const { control, setValue } = useProblemForm<S3BucketFormData>()

  return (
    <>
      {problemData.map((mapper, index) => {
        const { Component, config } = serviceMapper(mapper)
        return (
          <Component
            key={index}
            control={control}
            config={config}
            setValue={setValue}
          />
        )
      })}
    </>
  )
}
