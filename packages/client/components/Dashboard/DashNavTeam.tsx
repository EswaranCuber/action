import {createFragmentContainer} from 'react-relay'
import graphql from 'babel-plugin-relay/macro'
import DashNavItem from './DashNavItem'
import React from 'react'
import {PALETTE} from '../../styles/paletteV2'
import styled from '@emotion/styled'
import Icon from '../Icon'
import {ICON_SIZE} from '../../styles/typographyV2'
import {DashNavTeam_team} from '../../__generated__/DashNavTeam_team.graphql'

const WarningIcon = styled(Icon)({
  color: PALETTE.TEXT_LIGHT,
  fontSize: ICON_SIZE.MD18,
  position: 'absolute',
  left: '.625rem'
})

const IconAndLink = styled('div')({
  alignItems: 'center',
  display: 'flex',
  position: 'relative'
})

interface Props {
  team: DashNavTeam_team
  onClick: () => void
}

const DashNavTeam = (props: Props) => {
  const {onClick, team} = props
  return (
    <IconAndLink>
      {!team.isPaid && <WarningIcon title='Team is disabled for nonpayment'>warning</WarningIcon>}
      <DashNavItem
        href={`/team/${team.id}/${team.name}`}
        label={team.name}
        icon={'group'}
        onClick={onClick}
      />
    </IconAndLink>
  )
}

export default createFragmentContainer(DashNavTeam, {
  team: graphql`
    fragment DashNavTeam_team on Team {
      id
      isPaid
      name
    }
  `
})
