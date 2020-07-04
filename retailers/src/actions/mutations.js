import gql from 'graphql-tag';

// ACCESS GROUPS MUTATIONS
export const CREATE_ACCESS_GROUP_MUTATION = gql`
  mutation NewGroup($input: companyAccountInput!) {
    CreateCompanyAccount(input: $input) {
      _id
      disabled
      username
      groupName
      type
      scopes
      role
    }
  }
`;

export const CREATE_STORE_ACCESS_GROUP_MUTATION = gql`
  mutation NewStoreAccessGroup($storeId: Int!, $input: companyAccountInput!) {
    CreateStoreAccount(storeId: $storeId, input: $input) {
      _id
      disabled
      username
      groupName
      type
      scopes
      role
    }
  }
`;

export const REMOVE_ACCESS_GROUPS_MUTATION = gql`
  mutation RemoveGroups($accountIds: [Int!]!) {
    RemoveCompanyAccounts(accountIds: $accountIds) {
      _id
    }
  }
`;

export const UPDATE_ACCESS_GROUP_MUTATION = gql`
  mutation UpdateAccount($accountId: Int!, $input: companyAccountInput!) {
    UpdateCompanyAccount(accountId: $accountId, input: $input) {
      _id
      disabled
      type
      username
      groupName
      role
      scopes
    }
  }
`;

// STORES MUTATIONS
export const CREATE_STORE_MUTATION = gql`
  mutation CreateStore($store: storeInput!, $account: companyAccountInput!, $location: locationInput!) {
    CreateStore(store: $store, account: $account, location: $location) {
      _id
      disabled
      name
      location {
        _id
        country
        city
        street
        number
        latitude
        longitude
      }
    }
  }
`;

export const UPDATE_STORE_MUTATION = gql`
  mutation UpdateStore($storeId: Int!, $store: storeInput!, $location: locationInput!) {
    UpdateStore(storeId: $storeId, store: $store, location: $location) {
      _id
      disabled
      name
      location {
        _id
        country
        city
        street
        number
        latitude
        longitude
      }
    }
  }
`;

export const REMOVE_STORES_MUTATION = gql`
  mutation RemoveStores($storeIds: [Int!]!) {
    RemoveStores(storeIds: $storeIds) {
      _id
    }
  }
`;

// Products Mutations
export const CREATE_PRODUCT_GROUP_MUTATION = gql`
  mutation CreateProductGroup($storeId: Int!, $productGroup: productGroupInput!, $files: [Upload!]) {
    CreateProductGroup(storeId: $storeId, productGroup: $productGroup, files: $files) {
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
`;

export const REMOVE_PRODUCT_GROUPS_MUTATION = gql`
  mutation RemoveProductGroups($storeId: Int!, $groupIds: [Int!]!) {
    RemoveProductGroups(storeId: $storeId, groupIds: $groupIds) {
      _id
    }
  }
`;

export const REMOVE_PRODUCTS_MUTATION = gql`
  mutation RemoveProducts($groupId: Int!, $prodIds: [Int!]!) {
    RemoveProducts(groupId: $groupId, prodIds: $prodIds) {
      _id
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
`;

export const UPDATE_PRODUCT_MUTATION = gql`
  mutation UpdateProduct($productId: Int!, $productInput: productInput!) {
    UpdateProduct(productId: $productId, productInput: $productInput) {
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
`;

export const UPDATE_PRODUCT_GROUP_MUTATION = gql`
  mutation UpdateProductGroup($storeId: Int!, $groupId: Int!, $productGroup: productGroupInput!, $files: [Upload!]) {
    UpdateProductGroup(storeId: $storeId, groupId: $groupId, productGroup: $productGroup, files: $files) {
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
`;

// This mutation does not include the id of the promotion group
export const CREATE_PROMO_GROUP_MUTATION = gql`
  mutation CreatePromotionGroup($input: promotionGroupInput!) {
    CreatePromotionGroup(input: $input) {
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
`;

// This mutation includes the id of the promotion group
export const UPDATE_PROMO_GROUP_MUTATION = gql`
  mutation UpdatePromotionGroup($groupId: Int!, $input: promotionGroupInput!) {
    UpdatePromotionGroup(groupId: $groupId, input: $input) {
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
`;

export const SET_PROMO_GROUPS_STATUS_MUTATION = gql`
  mutation SetPromoGroupStatus($groupId: Int!, $status: Boolean!) {
    SetPromotionGroupStatus(groupId: $groupId, status: $status) {
      _id
      disabled
    }
  }
`;

export const REMOVE_PROMO_GROUP_MUTATION = gql`
  mutation RemovePromotionGroup($groupId: Int!) {
    RemovePromotionGroup(groupId: $groupId) {
      _id
    }
  }
`;

export const REMOVE_PROMOTIONS_MUTATION = gql`
  mutation RemovePromotions($promotionsIds: [Int!]!) {
    RemovePromotions(promotionsIds: $promotionsIds) {
      _id
    }
  }
`;

export const LINK_PROMO_GROUP_MUTATION = gql`
  mutation LinkPromotionGroupToProducts($promoGroupId: Int!, $productGroups: [Int!]!) {
    LinkPromotionGroupToProductGroups(promoGroupId: $promoGroupId, productGroups: $productGroups) {
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
`;

export const UNLINK_PROMO_GROUP_MUTATION = gql`
  mutation UnlinkPromotionGroup($promoGroupId: Int!) {
    UnlinkPromotionGroup(promoGroupId: $promoGroupId) {
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
`;

export const GENERATE_BUNDLE_PROMOTIONS_MUTATION = gql`
  mutation GenerateBundlePromotions($maxProducts: Int!, $promoGroupId: Int!, $groupData: promotionInput!) {
    GenerateBundlePromotions(maxProducts: $maxProducts, promoGroupId: $promoGroupId, groupData: $groupData) {
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
  }
`;

export const GENERATE_DISCOUNT_PROMOTIONS_MUTATION = gql`
  mutation GenerateDiscountPromotions($promoGroupId: Int!, $groupData: promotionInput!) {
    GenerateDiscountPromotions(promoGroupId: $promoGroupId, groupData: $groupData) {
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
  }
`;

export const GENERATE_BOGOFF_PROMOTIONS_MUTATION = gql`
  mutation GenerateBogoffPromotions($promoGroupId: Int!, $groupData: promotionInput!) {
    GenerateBogoffPromotions(promoGroupId: $promoGroupId, groupData: $groupData) {
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
  }
`;
