import React from 'react'
import {createFragmentContainer} from 'react-relay'
import graphql from 'babel-plugin-relay/macro'
import MeetingMemberTaskSummaryList from './MeetingMemberTaskSummaryList'
import {MeetingMembersWithTasks_meeting} from '../../../../../__generated__/MeetingMembersWithTasks_meeting.graphql'
import EmailBorderBottom from './EmailBorderBottom'

interface Props {
  meeting: MeetingMembersWithTasks_meeting
  member: any
}

const MeetingMembersWithTasks = (props: Props) => {
  const {meeting, member: sendingMember} = props
  const {meetingMembers} = meeting
  const meetingMembersWithTasks = meetingMembers.filter(
    ({doneTasks, tasks}) => (tasks ? tasks.length : 0) + (doneTasks ? doneTasks.length : 0) > 0
  )

  if (meetingMembersWithTasks.length === 0) return null

  if (sendingMember) {
    const {id: sendingMemberId} = sendingMember
    meetingMembersWithTasks.sort(function(x, y) {
      return x.id == sendingMemberId ? -1 : y.id == sendingMemberId ? 1 : 0
    })
  }
  return (
    <>
      {meetingMembersWithTasks.map((member) => {
        return <MeetingMemberTaskSummaryList meetingMember={member} key={member.id} />
      })}
      <EmailBorderBottom />
    </>
  )
}

export default createFragmentContainer(MeetingMembersWithTasks, {
  meeting: graphql`
    fragment MeetingMembersWithTasks_meeting on NewMeeting {
      meetingMembers {
        id
        ...MeetingMemberTaskSummaryList_meetingMember
        ... on ActionMeetingMember {
          doneTasks {
            id
          }
          tasks {
            id
          }
        }
        ... on RetrospectiveMeetingMember {
          tasks {
            id
          }
        }
      }
    }
  `
})
