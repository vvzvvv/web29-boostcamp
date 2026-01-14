'use client'

import {
  AdvancedSettings,
  BlockPublicAccess,
  BucketVersioning,
  DefaultEncryption,
  GeneralConfiguration,
  ObjectOwnership,
  Tags,
} from './sections'
import type { S3WithSetValuesSectionProps } from './types'

import React from 'react'

import { Separator } from '@/components/ui/separator'

export default function S3BucketCreate({
  control,
  config,
  setValue,
}: S3WithSetValuesSectionProps) {
  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      {/* Header Section */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold">버킷 생성</h2>
        <p className="text-muted-foreground">S3 버킷 설정을 구성하세요</p>
      </div>

      {/* Section 1: General Configuration */}
      {config.general.visible && (
        <>
          <GeneralConfiguration control={control} config={config} />
          <Separator />
        </>
      )}

      {/* Section 2: Object Ownership */}
      {config.ownership.visible && (
        <>
          <ObjectOwnership control={control} config={config} />
          <Separator />
        </>
      )}

      {/* Section 3: Block Public Access */}
      {config.blockPublicAccess.visible && (
        <>
          <BlockPublicAccess
            control={control}
            config={config}
            setValue={setValue}
          />
          <Separator />
        </>
      )}

      {/* Section 4: Bucket Versioning */}
      {config.versioning.visible && (
        <>
          <BucketVersioning control={control} config={config} />
          <Separator />
        </>
      )}

      {/* Section 5: Tags (Optional) */}
      {config.tags.visible && (
        <>
          <Tags control={control} config={config} />
          <Separator />
        </>
      )}

      {/* Section 6: Default Encryption */}
      {config.encryption.visible && (
        <>
          <DefaultEncryption control={control} config={config} />
          <Separator />
        </>
      )}

      {/* Section 7: Advanced Settings */}
      {config.advancedSettings.visible && (
        <AdvancedSettings control={control} config={config} />
      )}
    </div>
  )
}
