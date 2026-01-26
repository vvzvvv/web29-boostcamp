'use client'

import { S3BucketCreateAdapter } from '@/components/aws-services/adapters'
import { createServiceKey } from '@/components/aws-services/registry/form-defaults-factory'
import {
  type IServiceMapper,
  serviceMapper,
} from '@/components/aws-services/utils/serviceMapper'
import type { S3BucketCreateConfig } from '@/types/aws-services/s3/bucket-create'

interface ProblemFormContentProps {
  problemData: IServiceMapper[]
}

// 어댑터가 존재하는 서비스/태스크 조합을 정의
const ADAPTER_ENABLED_SERVICES: Record<string, Record<string, boolean>> = {
  s3: {
    'bucket-create': true,
  },
}

// 어댑터 컴포넌트 매퍼
const getAdapterComponent = (
  serviceName: string,
  serviceTask: string,
  config: Record<string, boolean>,
) => {
  if (serviceName === 's3' && serviceTask === 'bucket-create') {
    return <S3BucketCreateAdapter config={config as S3BucketCreateConfig} />
  }
  return null
}

export function ProblemFormContent({ problemData }: ProblemFormContentProps) {
  return (
    <>
      {problemData.map((mapper, index) => {
        const { config } = serviceMapper(mapper)
        const formKey = createServiceKey(mapper.serviceName, mapper.serviceTask)

        // 어댑터가 활성화된 서비스인지 확인
        const adapterEnabled =
          ADAPTER_ENABLED_SERVICES[mapper.serviceName]?.[mapper.serviceTask]

        if (adapterEnabled) {
          // 어댑터 사용 (로컬 폼 관리, 리소스 목록 표시)
          return (
            <div key={`${formKey}-${index}`}>
              {getAdapterComponent(
                mapper.serviceName,
                mapper.serviceTask,
                config,
              )}
            </div>
          )
        }

        // 기존 방식 유지 (어댑터 미지원 서비스)
        // 향후 다른 서비스 어댑터 추가 시 확장 가능
        return null
      })}
    </>
  )
}
