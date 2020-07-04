import { gql } from 'apollo-boost'

export const GET_ALL_COMPANIES = gql`
  {
    Company {
      _id
      name
    }
  }
`

export const GET_COMPANY_ACCOUNT = gql`
  query GetCompanyAccount($companyId: ID!, $username: String!) {
    Company(_id: $companyId) {
      _id
      name
      accounts(filter: { username: $username }) {
        _id
        username
        type
        password
        groupName
        role
        scopes
      }
    }
  }
`

export const GET_STORE_ACCOUNT = gql`
  query GetStoreAccount($storeId: ID!, $username: String!) {
    Store(_id: $storeId) {
      _id
      name
      accounts(filter: { username: $username }) {
        _id
        username
        type
        role
        groupName
        password
        scopes
      }
    }
  }
`
