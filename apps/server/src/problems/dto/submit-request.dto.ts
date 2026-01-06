export type ConfigDto = {
  configType: string;
  configInfo: Record<string, any>;
};

export class SubmitRequestDto {
  submit_config: ConfigDto[];
}
