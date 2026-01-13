import { IsObject, ValidateNested, IsOptional, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import * as ServiceConfigType from '../types/service-config-type.enum';

// 서비스별 키-설정 값
export class SubmitConfig {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ServiceConfigType.VPCConfig)
  vpc?: ServiceConfigType.VPCConfig[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ServiceConfigType.EC2Config)
  ec2?: ServiceConfigType.EC2Config[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ServiceConfigType.SubnetConfig)
  subnet?: ServiceConfigType.SubnetConfig[];
}

export class UnitSubmitRequestDto {
  @IsObject()
  @ValidateNested()
  @Type(() => SubmitConfig)
  submitConfig: SubmitConfig;
}

// TODO: NetworkTask 구체화하기
export class NetworkTask {
  source: unknown;
  destination: unknown;
  protocol: unknown;
}

export class ScenarioSubmitRequestDto {
  @IsObject()
  @ValidateNested()
  @Type(() => SubmitConfig)
  submitConfig: SubmitConfig;

  @IsObject()
  @ValidateNested()
  @Type(() => NetworkTask)
  networkTask: NetworkTask;
}
