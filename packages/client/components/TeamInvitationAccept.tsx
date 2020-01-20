import {useEffect} from 'react'
import AcceptTeamInvitationMutation from '../mutations/AcceptTeamInvitationMutation'
import useRouter from '../hooks/useRouter'
import useAtmosphere from '../hooks/useAtmosphere'

interface Props {
  invitationToken: string
  teamId: string
  teamName: string
}

const TeamInvitationAccept = (props: Props) => {
  const {invitationToken, teamId, teamName} = props
  const {history} = useRouter()
  const onCompleted = () => {
    history.replace(`/team/${teamId}/${teamName}`)
  }
  const atmosphere = useAtmosphere()
  useEffect(() => {
    AcceptTeamInvitationMutation(atmosphere, {invitationToken}, {history, onCompleted})
  })
  return null
}

export default TeamInvitationAccept
