import React from 'react'
import FloatingActionButton from './FloatingActionButton'
import styled from '@emotion/styled'
import Icon from './Icon'
import {ICON_SIZE} from '../styles/typographyV2'
import {PALETTE} from '../styles/paletteV2'
import {Breakpoint, ZIndex} from '../types/constEnums'
import useBreakpoint from '../hooks/useBreakpoint'
import PlainButton from './PlainButton/PlainButton'
import useRouter from '../hooks/useRouter'

const BackButtonMobile = styled(PlainButton)({
  background: '#fff',
  height: ICON_SIZE.MD24,
  justifySelf: 'start',
  width: ICON_SIZE.MD24,
  alignSelf: 'center',
  margin: 16,
  zIndex: ZIndex.FAB
})

const BackButtonDesktop = styled(FloatingActionButton)({
  alignSelf: 'center',
  background: PALETTE.BACKGROUND_MAIN,
  height: ICON_SIZE.MD40,
  justifySelf: 'center',
  padding: 0,
  width: ICON_SIZE.MD40,
  zIndex: ZIndex.FAB
})

const BackIcon = styled(Icon)({})

interface Props {
  sendToMe: boolean
  teamId: string
  teamName: string
}
const NewMeetingBackButton = (props: Props) => {
  const {sendToMe, teamId, teamName} = props
  const isDesktop = useBreakpoint(Breakpoint.NEW_MEETING_GRID)
  const BackButton = isDesktop ? BackButtonDesktop : BackButtonMobile
  const {history} = useRouter()
  const onClick = () => {
    const nextRoute = sendToMe ? '/me' : `/team/${teamId}/${teamName}`
    history.push(nextRoute)
  }
  return (
    <BackButton onClick={onClick}>
      <BackIcon>arrow_back</BackIcon>
    </BackButton>
  )
}

export default NewMeetingBackButton
