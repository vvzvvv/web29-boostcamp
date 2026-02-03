import {
  CoreFeaturesSection,
  HeroSection,
  ValuePropositionSection,
} from './components/sections'
import { ASection } from './components/sections/a.section'

export default function LandingPage() {
  return (
    <main className="flex w-full flex-col gap-24">
      <HeroSection />
      <CoreFeaturesSection />
      <ASection />
    </main>
  )
}
