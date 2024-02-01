import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'

import { CyclesContext } from '../../../../contexts/CyclesContext.tsx'

import { FormContainer, MinutesAmountInput, TaskInput } from './styles.ts'

export default function NewCycleForm() {
  const { activeCycleId } = useContext(CyclesContext)
  const { register } = useFormContext()

  const hasActiveCycle = !!activeCycleId

  return (
    <FormContainer>
      <label htmlFor="task">I will work on</label>
      <TaskInput
        type="task"
        list="task-sugestions"
        placeholder="project name"
        disabled={hasActiveCycle}
        {...register('task')}
      />

      <label htmlFor="minutesAmount">for</label>
      <MinutesAmountInput
        id="minutesAmount"
        type="number"
        placeholder="00"
        disabled={hasActiveCycle}
        step={1}
        min={1}
        max={60}
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <span>minutes.</span>
    </FormContainer>
  )
}
