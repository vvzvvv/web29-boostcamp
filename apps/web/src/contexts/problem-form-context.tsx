'use client'

import {
  type PropsWithChildren,
  createContext,
  useContext,
  useMemo,
} from 'react'
import {
  type Control,
  type DefaultValues,
  type FieldValues,
  type FormState,
  type UseFormGetValues,
  type UseFormSetValue,
  type UseFormWatch,
  useForm,
} from 'react-hook-form'

interface ProblemFormContextValue<T extends FieldValues = FieldValues> {
  control: Control<T>
  setValue: UseFormSetValue<T>
  watch: UseFormWatch<T>
  getValues: UseFormGetValues<T>
  formState: FormState<T>
}

const ProblemFormContext = createContext<ProblemFormContextValue | null>(null)

interface ProblemFormProviderProps<
  T extends FieldValues,
> extends PropsWithChildren {
  defaultValues: DefaultValues<T>
}

export function ProblemFormProvider<T extends FieldValues>({
  children,
  defaultValues,
}: ProblemFormProviderProps<T>) {
  const methods = useForm<T>({ defaultValues })

  const contextValue = useMemo(
    () => ({
      control: methods.control,
      setValue: methods.setValue,
      watch: methods.watch,
      getValues: methods.getValues,
      formState: methods.formState,
    }),
    [
      methods.control,
      methods.setValue,
      methods.watch,
      methods.getValues,
      methods.formState,
    ],
  )

  return (
    <ProblemFormContext.Provider
      value={contextValue as ProblemFormContextValue}
    >
      {children}
    </ProblemFormContext.Provider>
  )
}

export function useProblemForm<T extends FieldValues = FieldValues>() {
  const context = useContext(ProblemFormContext)
  if (!context) {
    throw new Error('useProblemForm must be used within ProblemFormProvider')
  }
  return context as ProblemFormContextValue<T>
}
