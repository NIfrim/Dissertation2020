import gql from 'graphql-tag';

export const TEST_CONNECTION_QUERY = gql`
  query {
    TestConnection
  }
`;

export const LOGIN_USER_QUERY = gql`
  query LoginUser($email: String!, $password: String!) {
    LoginUser(input: { email: $email, password: $password })
  }
`;

export const LOAD_USER_QUERY = gql`
  query {
    LoadUser {
      _id
      avatar
      firstName
      lastName
      mobile
      email
      device {
        _id
        platform
        loggedIn
      }
      account {
        _id
        backupEmail
        appMode
        shareLocation
        smsNotifications
        emailNotifications
        twoFactorAuth
        theme
        fontScale
        accountDisabled
      }
      usedPromotions {
        _id
      }
      viewedPromotions {
        _id
      }
    }
  }
`;

export const LOAD_USER_BY_EMAIL_QUERY = gql`
  query User($email: String!) {
    User(email: $email) {
      _id
      firstName
      lastName
      mobile
      email
    }
  }
`;

export const LOAD_USER_PROMOTIONS_QUERY = gql`
  query {
    Store {
      _id
      name
      promotionGroups {
        _id
        category
        promotions {
          _id
          discount
          priceInflation
          expires
          type
          products {
            _id
            name
            brand
            shortDescription
            longDescription
            keywords {
              _id
              name
            }
            price
            stock
          }
        }
      }
    }
  }
`;
