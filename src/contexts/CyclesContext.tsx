import React, { createContext, useEffect, useReducer, useState } from 'react'

import { Cycle, cyclesReducer } from '../reducers/cycles/reducer.ts'
import {
  actionFinishCurrentCycle,
  actionStartNewCycle,
  actionStopCurrentCycle,
} from '../reducers/cycles/actions.ts'

interface CreateCycleFormData {
  task: string
  minutesAmount: number
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  updateSecondsPassed: (seconds: number) => void
  startNewCycle: (data: CreateCycleFormData) => void
  stopCurrentCycle: () => void
}

interface CycleProviderProps {
  children: React.ReactNode
}

export const CyclesContext = createContext({} as CyclesContextType)

export default function CyclesContextProvider(props: CycleProviderProps) {
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    (initialState) => {
      const storedState = localStorage.getItem('@ignite-timer:cyclesState')
      if (storedState) {
        return JSON.parse(storedState)
      }

      return initialState
    },
  )

  const { cycles, activeCycleId } = cyclesState

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  useEffect(() => {
    const state = JSON.stringify(cyclesState)
    localStorage.setItem('@ignite-timer:cyclesState', state)
  }, [cyclesState])

  function updateSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    dispatch(actionFinishCurrentCycle())
    document.title = 'Ignite Timer'
  }

  function startNewCycle(data: CreateCycleFormData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      startDate: new Date(),
      ...data,
    }

    dispatch(actionStartNewCycle(newCycle))
    setAmountSecondsPassed(0)
  }

  function stopCurrentCycle() {
    dispatch(actionStopCurrentCycle())
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        markCurrentCycleAsFinished,
        updateSecondsPassed,
        startNewCycle,
        stopCurrentCycle,
      }}
    >
      {props.children}
    </CyclesContext.Provider>
  )
}
