import type {
  CloudFrontOriginSettingsConfig,
  CloudFrontOriginSettingsSectionKey,
} from '../constants'
import type { CloudFrontOriginFormData } from './cloudfront-origin-form-data.types'

import type { AwsServiceSectionTypes } from '@/types/aws-services/aws-general-types'

/** @deprecated Use CloudFrontOriginSettingsSectionKey instead */
export type CloudFrontOriginConfigKeys = CloudFrontOriginSettingsSectionKey

type CloudFrontOriginSettingsTypes = AwsServiceSectionTypes<
  CloudFrontOriginFormData,
  CloudFrontOriginSettingsConfig
>

export type CloudFrontOriginSectionProps =
  CloudFrontOriginSettingsTypes['SectionProps']
export type CloudFrontOriginWithSetValueSectionProps =
  CloudFrontOriginSettingsTypes['WithSetValueProps']
