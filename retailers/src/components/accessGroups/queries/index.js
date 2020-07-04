import gql from 'graphql-tag'

export const GET_COMPANY_ACCOUNTS = gql`
  query CompanyAccounts($companyId: ID!) {
    Company(_id: $companyId) {
      accounts {
        _id
        groupName
        username
        type
        role
        scopes
      }
    }
  }
`

export const GET_STORE_ACCOUNTS = gql`
  query StoreAccounts($storeId: ID!) {
    Store(_id: $storeId) {
      accounts {
        _id
        groupName
        username
        type
        role
        scopes
      }
    }
  }
`
