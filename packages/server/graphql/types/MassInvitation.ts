import {GraphQLID, GraphQLNonNull, GraphQLObjectType} from 'graphql'
import {GQLContext} from '../graphql'
import GraphQLISO8601Type from './GraphQLISO8601Type'

const MassInvitation = new GraphQLObjectType<any, GQLContext>({
  name: 'MassInvitation',
  description: 'An invitation and expiration',
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLID),
      description: 'the invitation token'
    },
    expiration: {
      type: GraphQLNonNull(GraphQLISO8601Type),
      description: 'the expiration for the token'
    }
  })
})

export default MassInvitation
