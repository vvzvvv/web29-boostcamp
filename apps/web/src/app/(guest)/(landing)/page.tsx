import {
  HeroSection,
  HowItWorksSection,
  ValuePropositionSection,
} from './components/sections'

export default function LandingPage() {
  return (
    <main className="bg-background mx-auto max-w-[1440px] px-4">
      <HeroSection />
      <ValuePropositionSection />
      <HowItWorksSection />
    </main>
  )
}
