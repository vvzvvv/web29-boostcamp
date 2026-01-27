export class BaseProblemItemDto {
  id: number;
  title: string;
  description: string;
  tags?: string[];
}

export class UnitProblemItemResponseDto extends BaseProblemItemDto {}

export class CookbookProblemItemResponseDto extends BaseProblemItemDto {
  problems: BaseProblemItemDto[];
}
