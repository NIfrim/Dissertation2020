import gql from 'graphql-tag';

export const REGISTER_ACCOUNT_MUTATION = gql`
  mutation RegisterNewUser($userInput: userInput!, $deviceInfo: deviceInput!) {
    RegisterNewUser(userInput: $userInput, deviceInfo: $deviceInfo) {
      _id
      avatar
      mobile
      firstName
      lastName
      email
      password
    }
  }
`;

export const UPDATE_USER_DETAILS_MUTATION = gql`
  mutation UpdateUserDetails($userInput: userInput!) {
    UpdateUserDetails(userInput: $userInput) {
      _id
      firstName
      mobile
      lastName
      email
    }
  }
`;

export const UPDATE_USER_PASSWORD_MUTATION = gql`
  mutation UpdateUserPassword($newPassword: String!) {
    UpdateUserPassword(newPassword: $newPassword) {
      _id
      firstName
      lastName
      mobile
      email
    }
  }
`;

export const UPDATE_USER_ACCOUNT_MUTATION = gql`
  mutation UpdateUserAccount($accountDetails: userAccountInput!) {
    UpdateUserAccount(accountDetails: $accountDetails) {
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
    }
  }
`;

export const DELETE_USER_MUTATION = gql`
  mutation {
    DeleteUser {
      _id
    }
  }
`;

export const TOGGLE_ACCOUNT_DISABLED_MUTATION = gql`
  mutation ToggleAccountDisabled($accountDisabled: Boolean!) {
    ToggleAccountDisabled(accountDisabled: $accountDisabled) {
      account {
        accountDisabled
      }
    }
  }
`;

export const VIEWED_PROMOTION_MUTATION = gql`
  mutation UserViewedPromotion($promoId: Int!) {
    UserViewedPromotion(promoId: $promoId) {
      viewedPromotions {
        _id
      }
    }
  }
`;

export const SET_USED_PROMOTION_MUTATION = gql`
  mutation SetUsedPromotion($promoId: Int!) {
    SetUsedPromotion(promoId: $promoId) {
      usedPromotions {
        _id
      }
    }
  }
`;

export const REMOVE_USED_PROMOTION_MUTATION = gql`
  mutation RemoveUsedPromotion($promoId: Int!) {
    RemoveUsedPromotion(promoId: $promoId) {
      usedPromotions {
        _id
      }
    }
  }
`;
