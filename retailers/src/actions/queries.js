import gql from 'graphql-tag'

export const LOGIN_QUERY = gql`
  query CompanyLogin($companyId: Int!, $username: String!, $password: String!) {
    LoginAccount(input: { companyId: $companyId, username: $username, password: $password })
  }
`
export const LOAD_ACCOUNT_QUERY = gql`
  query {
    LoadAccount {
      company {
        _id
      }
      store {
        _id
      }
      _id
      username
      groupName
      type
      role
      scopes
    }
  }
`

export const GET_ALL_COMPANIES_QUERY = gql`
  query GetAllCompanies {
    Company {
      _id
      name
    }
  }
`

export const GET_COMPANY_ACCOUNTS_QUERY = gql`
  query CompanyAccounts($companyId: ID!) {
    Company(_id: $companyId) {
      _id
      accounts {
        _id
        disabled
        groupName
        username
        type
        role
        scopes
      }
    }
  }
`

export const GET_STORE_ACCOUNTS_QUERY = gql`
  query StoreAccounts($storeId: ID!) {
    Store(_id: $storeId) {
      accounts {
        _id
        disabled
        groupName
        username
        type
        role
        scopes
      }
    }
  }
`

export const GET_COMPANY_STORES_QUERY = gql`
  query Stores($companyId: ID!) {
    Company(_id: $companyId) {
      stores {
        _id
        disabled
        name
        location {
          _id
          country
          city
          street
          number
          postcode
          latitude
          longitude
        }
      }
    }
  }
`

// export const GET_PRODUCT_GROUPS_QUERY = gql`
//   query getProductGroups($storeId: ID!) {
//     Store(_id: $storeId) {
//       _id
//       productGroups {
//         _id
//         name
//         description
//         disabled
//         products {
//           _id
//           name
//           brand
//           price
//           stock
//           keywords {
//             _id
//             name
//           }
//           shortDescription
//           longDescription
//         }
//       }
//     }
//   }
// `

export const GET_PRODUCT_GROUPS_QUERY = gql`
  query getProductGroups {
    GetProductGroups {
      _id
      name
      description
      disabled
      products {
        _id
        name
        brand
        price
        stock
        keywords {
          _id
          name
        }
        shortDescription
        longDescription
      }
    }
  }
`

export const GET_PROMO_GROUPS_QUERY = gql`
  query getPromoGroups($category: String!) {
    GetPromotionGroups(category: $category) {
      _id
      name
      description
      category
      disabled
      rules
      maxDiscount
      maxProducts
      priceInflation
      expiryDate
      promotions {
        _id
        type
        discount
        priceInflation
        expires
        products {
          _id
          name
          brand
          price
          stock
          shortDescription
          longDescription
        }
      }
      linkedProductGroups {
        _id
        name
        description
        disabled
        products {
          _id
          name
          brand
          price
          stock
          shortDescription
          longDescription
        }
      }
    }
  }
`

// export const UPDATE_ACCESS_GROUP = gql`
//   mutation NewGroup($input: companyAccountInput!){
//     CreateCompanyAccount(input: $input){
//       _id
//       username
//       groupName
//       type
//       scopes
//       role
//     }
//   }
// `
