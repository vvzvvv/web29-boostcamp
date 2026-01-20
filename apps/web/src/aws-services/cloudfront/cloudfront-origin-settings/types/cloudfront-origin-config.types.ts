import type { CloudFrontOriginSettingsConfig } from '../constants'
import type { CloudFrontOriginFormData } from './cloudfront-origin-form-data.types'

import type { AwsServiceSectionTypes } from '@/aws-services/types/aws-general-types'

type CloudFrontOriginSettingsTypes = AwsServiceSectionTypes<
  CloudFrontOriginFormData,
  CloudFrontOriginSettingsConfig
>

export type CloudFrontOriginSectionProps =
  CloudFrontOriginSettingsTypes['SectionProps']
export type CloudFrontOriginWithSetValueSectionProps =
  CloudFrontOriginSettingsTypes['WithSetValueProps']
