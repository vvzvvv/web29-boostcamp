import type { CloudFrontDistributionListConfig } from '../constants'
import type { CloudFrontListFormData } from './cloudfront-list-form-data.types'

import type { AwsServiceSectionTypes } from '@/aws-services/types/aws-general-types'

type CloudFrontDistributionListTypes = AwsServiceSectionTypes<
  CloudFrontListFormData,
  CloudFrontDistributionListConfig
>

export type CloudFrontListSectionProps =
  CloudFrontDistributionListTypes['SectionProps']
export type CloudFrontListWithSetValueSectionProps =
  CloudFrontDistributionListTypes['WithSetValueProps']
