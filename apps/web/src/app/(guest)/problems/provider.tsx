'use client'

import { createContext, useContext } from 'react'

import { useSearchParams } from 'next/navigation'

interface ProblemContextProps {
  currentType: string | null
}

const ProblemContext = createContext<ProblemContextProps | undefined>(undefined)

interface ProblemProviderProps {
  children: React.ReactNode
}

export const ProblemProvider = ({ children }: ProblemProviderProps) => {
  const searchParams = useSearchParams()
  const currentType = searchParams.get('type') as string

  return (
    <ProblemContext.Provider
      value={{
        currentType,
      }}
    >
      {children}
    </ProblemContext.Provider>
  )
}

export const useProblem = () => {
  const context = useContext(ProblemContext)

  if (!context)
    throw new Error('useProblem must be used within a ProblemProvider')

  return context
}
