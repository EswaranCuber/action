import styled from '@emotion/styled'
import {Gutters, Layout} from '../../types/constEnums'

const DashSectionHeader = styled('div')({
  alignItems: 'flex-end',
  display: 'flex',
  margin: '0 auto',
  maxWidth: Layout.TASK_COLUMNS_MAX_WIDTH,
  padding: `16px ${Gutters.DASH_GUTTER}`,
  position: 'relative',
  width: '100%'
})

export default DashSectionHeader
