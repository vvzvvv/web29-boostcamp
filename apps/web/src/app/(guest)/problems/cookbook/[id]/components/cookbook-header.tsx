import { ProblemTagBadge } from '../../../(list)/components/problem-tag-badge'
import { BookOpenIcon } from 'lucide-react'

interface CookbookProblemHeaderProps {
  title: string
  description: string
  tags: string[]
}

export function CookbookProblemHeader({
  title,
  description,
  tags,
}: CookbookProblemHeaderProps) {
  return (
    <div className="space-y-4 rounded-lg border p-6">
      <div className="flex flex-col gap-2 pl-1">
        <h1 className="flex items-center gap-2 text-2xl font-bold">
          <BookOpenIcon className="bg-primary text-primary-foreground h-7 w-7 rounded-full p-1.5" />
          {title}
        </h1>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <ProblemTagBadge key={tag} tag={tag} />
        ))}
      </div>
    </div>
  )
}
