import { DiagramPanel } from './diagram-panel'
import { FeedbackPanel } from './feedback-panel'
import { SubmitButton } from './submit-button'

export const ProblemRightSection = () => {
  return (
    <section className="relative h-full">
      <div className="w-full overflow-y-auto">
        <SubmitButton />
        <DiagramPanel />
        <FeedbackPanel />
      </div>
    </section>
  )
}
