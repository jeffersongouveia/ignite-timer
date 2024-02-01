import { produce } from 'immer'
import { ActionTypes } from './actions.ts'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  stoppedDate?: Date
  finishedDate?: Date
}

interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export function cyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case ActionTypes.START_NEW_CYCLE:
      return produce(state, (draft) => {
        draft.cycles.push(action.payload)
        draft.activeCycleId = action.payload.id
      })
    case ActionTypes.STOP_CURRENT_CYCLE: {
      // debugger

      const activeCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId,
      )

      console.debug('activeCycleIndex', activeCycleIndex)

      if (activeCycleIndex === -1) {
        return state
      }

      return produce(state, (draft) => {
        draft.cycles[activeCycleIndex].stoppedDate = new Date()
        draft.activeCycleId = null
      })
    }
    case ActionTypes.FINISH_CURRENT_CYCLE: {
      const activeCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId,
      )

      if (!activeCycleIndex) {
        return state
      }

      return produce(state, (draft) => {
        draft.cycles[activeCycleIndex].finishedDate = new Date()
        draft.activeCycleId = null
      })
    }
    default:
      return state
  }
}
