import {GraphQLObjectType} from 'graphql'
import {resolveNewMeeting} from '../resolvers'
import StandardMutationError from './StandardMutationError'
import NewMeeting from './NewMeeting'

const UpdateNewCheckInQuestionPayload = new GraphQLObjectType({
  name: 'UpdateNewCheckInQuestionPayload',
  fields: () => ({
    error: {
      type: StandardMutationError
    },
    meeting: {
      type: NewMeeting,
      resolve: resolveNewMeeting
    }
  })
})

export default UpdateNewCheckInQuestionPayload
