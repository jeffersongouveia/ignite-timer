import { Cycle } from './reducer.ts'

export enum ActionTypes {
  START_NEW_CYCLE = 'START_NEW_CYCLE',
  STOP_CURRENT_CYCLE = 'STOP_CURRENT_CYCLE',
  FINISH_CURRENT_CYCLE = 'FINISH_CURRENT_CYCLE',
}

export function actionStartNewCycle(newCycle: Cycle) {
  return {
    type: ActionTypes.START_NEW_CYCLE,
    payload: newCycle,
  }
}

export function actionStopCurrentCycle() {
  return {
    type: ActionTypes.STOP_CURRENT_CYCLE,
  }
}

export function actionFinishCurrentCycle() {
  return {
    type: ActionTypes.FINISH_CURRENT_CYCLE,
  }
}
