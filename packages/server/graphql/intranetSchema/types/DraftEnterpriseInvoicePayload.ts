import {GraphQLObjectType} from 'graphql'
import StandardMutationError from '../../types/StandardMutationError'
import Organization from '../../types/Organization'
import {GQLContext} from '../../graphql'

const DraftEnterpriseInvoicePayload = new GraphQLObjectType({
  name: 'DraftEnterpriseInvoicePayload',
  fields: () => ({
    error: {
      type: StandardMutationError
    },
    organization: {
      type: Organization,
      description: 'The updated organization',
      resolve: ({orgId}, _args, {dataLoader}: GQLContext) => {
        return dataLoader.get('organizations').load(orgId)
      }
    }
  })
})

export default DraftEnterpriseInvoicePayload
