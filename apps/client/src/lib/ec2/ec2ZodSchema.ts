import { z } from 'zod'

const ec2Schema = z
  .object({
    instance: z.string().min(1, '인스턴스 타입을 선택해주세요'),
    ami: z.string(),
    vpc: z.string(),
    subnet: z.enum([
      'subnet-public-1a',
      'subnet-public-1b',
      'subnet-private-1a',
      'subnet-private-1b',
    ]),
    securityGroup: z.string(),
  })
  .superRefine((data, ctx) => {
    // ERROR: private 서브넷은 Internet Gateway 접근 불가
    if (data.subnet.includes('private')) {
      ctx.addIssue({
        code: 'custom',
        message:
          'Private 서브넷은 Internet Gateway에 직접 접근할 수 없습니다. Public 서브넷을 선택해주세요.',
        path: ['subnet'],
      })
    }
  })

type TFormValues = z.infer<typeof ec2Schema>

// Warning 검증을 위한 타입
export interface EC2Warning {
  field: keyof TFormValues
  message: string
}

// Warning 검증 함수
export const getEC2Warnings = (data: TFormValues): EC2Warning[] => {
  const warnings: EC2Warning[] = []

  // WARNING: AMI 미선택
  if (!data.ami || data.ami === '') {
    warnings.push({
      field: 'ami',
      message: 'AMI를 선택하는 것을 권장합니다.',
    })
  }

  // WARNING: 보안 그룹이 HTTP/HTTPS 허용 그룹이 아닐 때
  if (data.securityGroup !== 'sg-web' && data.securityGroup !== '') {
    warnings.push({
      field: 'securityGroup',
      message: 'HTTP/HTTPS 접근을 위해 sg-web 보안 그룹 사용을 권장합니다.',
    })
  }

  return warnings
}

export { ec2Schema, type TFormValues }
