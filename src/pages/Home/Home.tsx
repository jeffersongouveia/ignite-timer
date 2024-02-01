import { useContext } from 'react'
import { HandPalm, Play } from 'phosphor-react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import { CyclesContext } from '../../contexts/CyclesContext.tsx'
import Countdown from './components/Countdown/Countdown.tsx'

import NewCycleForm from './components/NewCycleForm/NewCycleForm.tsx'

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles.ts'

const formValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(1).max(60),
})

type TypeFormInput = zod.infer<typeof formValidationSchema>

export default function Home() {
  const { activeCycle, startNewCycle, stopCurrentCycle } =
    useContext(CyclesContext)

  const newCycleForm = useForm<TypeFormInput>({
    resolver: zodResolver(formValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 5,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm
  const hasTask = !!watch('task')

  function handleStartNewCycle(data: TypeFormInput) {
    startNewCycle(data)
    reset()
  }

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleStartNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

        <Countdown />

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={stopCurrentCycle}>
            <HandPalm size={24} />
            Stop
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={!hasTask} type="submit">
            <Play size={24} />
            Start
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
