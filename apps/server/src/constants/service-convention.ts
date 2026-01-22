import z from 'zod';

export const serviceConfigMapSchema = z.object({
  service: z.enum(['S3', 'CloudFront', 'EC2', 'VPC']),
  serviceTask: z.string(),
  serviceSections: z.array(z.string()),
  fixedOptions: z.record(z.string(), z.string()),
});

export type TServiceConfigMap = z.infer<typeof serviceConfigMapSchema>;
