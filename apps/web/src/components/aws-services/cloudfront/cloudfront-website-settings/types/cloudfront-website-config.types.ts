import type {
  CloudFrontWebsiteSettingsConfig,
  CloudFrontWebsiteSettingsSectionKey,
} from '../constants'
import type { CloudFrontWebsiteFormData } from './cloudfront-website-form-data.types'

import type { AwsServiceSectionTypes } from '@/types/aws-services/aws-general-types'

/** @deprecated Use CloudFrontWebsiteSettingsSectionKey instead */
export type CloudFrontWebsiteConfigKeys = CloudFrontWebsiteSettingsSectionKey

type CloudFrontWebsiteSettingsTypes = AwsServiceSectionTypes<
  CloudFrontWebsiteFormData,
  CloudFrontWebsiteSettingsConfig
>

export type CloudFrontWebsiteSectionProps =
  CloudFrontWebsiteSettingsTypes['SectionProps']
export type CloudFrontWebsiteWithSetValueSectionProps =
  CloudFrontWebsiteSettingsTypes['WithSetValueProps']
