import type { CloudFrontCacheBehaviorConfig } from '../constants'
import type { CloudFrontCacheFormData } from './cloudfront-cache-form-data.types'

import type { AwsServiceSectionTypes } from '@/aws-services/types/aws-general-types'

type CloudFrontCacheBehaviorTypes = AwsServiceSectionTypes<
  CloudFrontCacheFormData,
  CloudFrontCacheBehaviorConfig
>

export type CloudFrontCacheSectionProps =
  CloudFrontCacheBehaviorTypes['SectionProps']
export type CloudFrontCacheWithSetValueSectionProps =
  CloudFrontCacheBehaviorTypes['WithSetValueProps']
