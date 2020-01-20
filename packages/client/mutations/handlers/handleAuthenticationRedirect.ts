import {OnNextHandler, OnNextHistoryContext} from '../../types/relayMutations'
import getValidRedirectParam from '../../utils/getValidRedirectParam'
import SendClientSegmentEventMutation from '../SendClientSegmentEventMutation'
import {SegmentClientEventEnum} from '../../types/graphql'

const handleAuthenticationRedirect: OnNextHandler<any, OnNextHistoryContext> = (
  payload: any,
  {history, atmosphere}
) => {
  SendClientSegmentEventMutation(atmosphere, SegmentClientEventEnum.UserLogin)
  const {team} = payload
  // redirect directly into meeting
  console.log('teamLogin', team)
  if (team) {
    const {activeMeetings, id: teamId, name: teamName} = team
    const [firstActiveMeeting] = activeMeetings
    if (firstActiveMeeting) {
      const {id: meetingId} = firstActiveMeeting
      history.push(`/meet/${meetingId}`)
    } else {
      history.push(`/team/${teamId}/${teamName}`)
    }
  } else {
    const nextUrl = getValidRedirectParam() || '/me'
    history.push(nextUrl)
  }
}

export default handleAuthenticationRedirect
