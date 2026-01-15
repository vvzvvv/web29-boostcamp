export const enum ProblemType {
  UNIT = 'unit',
  COOKBOOK = 'cookbook',
  SCENARIO = 'scenario',
}

export type Unit = {
  id: number
  title: string
  description: string
  tags?: string[]
}
