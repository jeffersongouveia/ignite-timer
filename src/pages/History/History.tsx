import { useContext } from 'react'
import { formatDistanceToNow } from 'date-fns'

import { CyclesContext } from '../../contexts/CyclesContext.tsx'

import { HistoryContainer, HistoryList, Status } from './styles.ts'

export default function History() {
  const { cycles } = useContext(CyclesContext)

  function getMinutesText(minutes: number) {
    if (minutes === 1) {
      return '1 minute'
    }

    return `${minutes} minutes`
  }

  return (
    <HistoryContainer>
      <h1>My history</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Duration</th>
              <th>Start</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {cycles.map((cycle) => (
              <tr key={cycle.id}>
                <td>{cycle.task}</td>
                <td>{getMinutesText(cycle.minutesAmount)}</td>
                <td>
                  {formatDistanceToNow(cycle.startDate, {
                    addSuffix: true,
                  })}
                </td>
                <td>
                  {cycle.finishedDate && (
                    <Status statusColor="success">Finished</Status>
                  )}
                  {cycle.stoppedDate && (
                    <Status statusColor="stopped">Interrupted</Status>
                  )}
                  {!cycle.finishedDate && !cycle.stoppedDate && (
                    <Status statusColor="running">In progress</Status>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
