import {
  neo4jgraphql
} from 'neo4j-graphql-js'
import bcrypt from 'bcryptjs'
import csv2json from 'csvtojson'

// Utils
import {
  neo4jQuery
} from '../db'
import {
  getFirstLetters,
  getWords
} from '../../utils'
import {
  PROMOTION_GROUP_CREATED
} from './subscriptionTypes';


const Mutation = {
  // ACCOUNTS MUTATIONS
  async CreateCompanyAccount(parent, params, ctx, resolveInfo) {

    const {
      companyId
    } = ctx.user
    const {
      input
    } = params

    input.password = bcrypt.hashSync(input.password, 10)

    input.username.toLowerCase()
    params.companyId = companyId

    try {
      const account = await neo4jQuery(
        `MATCH (c:Company) WHERE ID(c) = ${companyId} MATCH (c)-[:COMPANY_ACCOUNT]->(ca:CompanyAccount{username: "${input.username}", groupName: "${input.groupName}"}) RETURN ca AS companyaccount`
      )

      if (account) {
        throw Error(`Account with username ${input.username} already exists.`)
      } else {
        return neo4jgraphql(parent, params, ctx, resolveInfo)
      }
    } catch (e) {
      throw Error(
        `Error encountered in Mutation.js when creating Account: ${e}`
      )
    }
  },

  async CreateStoreAccount(parent, params, ctx, resolveInfo) {
    const {
      companyId
    } = ctx.user
    const {
      storeId,
      input
    } = params

    input.password = bcrypt.hashSync(input.password, 10)

    input.username.toLowerCase()
    params.companyId = companyId

    try {
      const account = await neo4jQuery(
        `MATCH (s:Store) WHERE ID(s) = ${storeId} MATCH (s)-[:STORE_ACCOUNT]->(sa:CompanyAccount{username: "${input.username}", groupName: "${input.groupName}"}) RETURN sa AS storeaccount`
      )

      if (account) {
        throw Error(`Account with username ${input.username} already exists.`)
      } else {
        return neo4jgraphql(parent, params, ctx, resolveInfo)
      }
    } catch (e) {
      throw Error(
        `Error encountered in Mutation.js when creating Store Account: ${e}`
      )
    }
  },

  async UpdateCompanyAccount(parent, params, ctx, resolveInfo) {
    try {
      if (params.input.password && params.input.password !== '') {
        params.input.password = bcrypt.hashSync(params.input.password, 10);
      } else {
        params.input.password = null;
      }

      console.log(params);
  
      return neo4jgraphql(parent, params, ctx, resolveInfo)
    } catch (e) {
      throw Error(
        `Error encountered while updating access group: ${e}`
      )
    }
  },

  // COMPANY MUTATIONS
  async CreateCompany(parent, params, ctx, resolveInfo) {
    const {
      input
    } = params

    try {
      const company = await neo4jQuery(
        `MATCH (c:Company{name: "${input.name}", crn: "${input.crn}"}) RETURN c`
      )

      if (company) {
        throw Error(
          `Company with name '${input.name}' and crn '${input.crn}' already exists`
        )
      } else {
        // Get company params to generate username
        const account = {
          disabled: false,
          groupName: 'Super account',
          type: 'COMPANY_ACCOUNT',
          username: params.input.name.toLowerCase() + '_' + 'super',
          password: bcrypt.hashSync('admin', 10),
          role: 'COMPANY_SUPER',
          scopes: [
            'MANAGE_ACCESS_GROUPS',
            'MANAGE_STORES',
            'MANAGE_COMPANY_DETAILS'
          ]
        }

        return neo4jgraphql(
          parent, {
            ...params.input,
            ...account
          },
          ctx,
          resolveInfo
        )
      }
    } catch (e) {
      throw Error(
        `Error encountered in Mutation.js when creating Company: ${e}`
      )
    }
  },

  // STORE MUTATIONS

  // @params (account: {username, password}, storeInput, locationInput )
  // @params-generated (account: {disabled, groupName, type, role, scopes}, location: {keywords})
  async CreateStore(parent, params, ctx, resolveInfo) {
    const {
      companyId
    } = ctx.user
    const {
      store,
      account,
      location
    } = params

    try {
      const result = await neo4jQuery(
        `MATCH (c:Company)-[:OWNS_STORE]->(s:Store{name: "${store.name}"})-[:STORE_AT]->(:Location{latitude: ${location.latitude}, longitude: ${location.longitude}}) WHERE ID(c) = ${companyId} RETURN s`
      )
      if (result) {
        throw Error(`Store with name '${store.name}' already exists.`)
      } else {
        const wordsArr = []

        // Add company ID stored in token
        params.companyId = companyId

        // Encrypt password
        account.password = await bcrypt.hash(account.password, 10)

        // Generate username for account
        if (!account.username) {
          account.username =
            getFirstLetters(store.name + ' ' + location.city) + '_super'
        }

        // Generate keywords
        wordsArr.push(location.city, location.street)
        location.keywords = getWords(wordsArr)

        return neo4jgraphql(
          parent, {
            ...params
          },
          ctx,
          resolveInfo
        )
      }
    } catch (e) {
      throw Error(`Error encountered in Mutation.js when creating Store: ${e}`)
    }
  },

  // PRODUCT GROUPS MUTATIONS

  // @desc Action performed by a store to create a product group for storing products
  async CreateProductGroup(parent, params, ctx, resolveInfo) {
    const {
      storeId,
      productGroup,
      files
    } = params

    try {
      const result = await neo4jQuery(
        `MATCH (s:Store)-->(pg:ProductGroup{name: "${productGroup.name}"}) WHERE ID(s) = ${storeId} RETURN pg`
      )

      if (result) {
        throw Error(
          `Product Group with name '${productGroup.name}' already exists.`
        )
      } else {
        let products = []
        if (!!files[0]) {
          const {
            createReadStream
          } = await files[0]

          // Convert from csv to json object
          const obj = await csv2json().fromStream(createReadStream());

          // Return an array with each products and related categories
          products = obj.map(product => {
            const {
              name,
              brand,
              categories,
              price,
              stock,
              shortDescription,
              longDescription
            } = product

            const categoriesArr = categories.split('/')

            return {
              name,
              brand,
              categories: categoriesArr,
              price: parseFloat(price),
              stock: parseInt(stock),
              shortDescription,
              longDescription
            }
          })
        }

        // Structure the data object to store the storeId, productGroup information and related products
        const data = {
          storeId,
          productGroup,
          products
        }

        // Run the query with the passed data object and schema query, and return its response
        return neo4jgraphql(parent, data, ctx, resolveInfo)
      }
    } catch (e) {
      throw Error(`Error encountered when creating Product Group: ${e}`)
    }
  },

  // @desc Action performed by a store when editing a product group
  async UpdateProductGroup(parent, params, ctx, resolveInfo) {
    const {
      storeId,
      groupId,
      productGroup,
      files
    } = params

    try {
      const result = await neo4jQuery(
        `MATCH (s:Store)-->(pg:ProductGroup) WHERE ID(s) = ${storeId} AND ID(pg) = ${groupId} RETURN pg`
      )

      if (!result) {
        throw Error(`Product Group with name '${productGroup.name}' not found.`)
      } else {
        let products = []

        if (!!files[0]) {
          const {
            createReadStream
          } = await files[0]

         
          const stream = await createReadStream();

          console.log(stream);

          const obj = await csv2json().fromStream(stream)

          products = obj.map(product => {
            const {
              name,
              brand,
              categories,
              price,
              stock,
              shortDescription,
              longDescription
            } = product

            const categoriesArr = categories.split('/')
            return {
              name,
              brand,
              categories: categoriesArr,
              price: parseFloat(price),
              stock: parseInt(stock),
              shortDescription,
              longDescription
            }
          })
        }

        const data = {
          storeId,
          groupId,
          productGroup,
          products
        }

        return neo4jgraphql(parent, data, ctx, resolveInfo)
      }
    } catch (e) {
      throw Error(
        `Error encountered in Mutation.js when updating Product Group: ${e}`
      )
    }
  },


  // @desc Action performed by a store when editing a product group
  async UpdateProduct(parent, params, ctx, resolveInfo) {
    const storeId = ctx.user.storeId

    const {
      productId,
      productInput,
    } = params

    try {

      if (!productInput.name || !productInput.shortDescription || !productInput.longDescription || !productInput.brand || !productInput.price || !productInput.stock) {
        throw Error(`Missing product inputs, required inputs: name, shortDescription, longDescription, brand, price, stock. Received data: ${JSON.stringify(Object.keys(productInput))}.`)
      } else {

        const data = {
          storeId,
          productId,
          productInput
        }

        return neo4jgraphql(parent, data, ctx, resolveInfo)
      }
    } catch (e) {
      throw Error(
        `Error encountered in Mutation.js when updating Product: ${e}`
      )
    }
  },


  // @desc Action performed by a store to create a promotion group
  async CreatePromotionGroup(parent, params, ctx, resolveInfo) {
    const storeId = ctx.user.storeId
    const {
      input
    } = params

    try {
      const result = await neo4jQuery(
        `MATCH (s:Store)-->(pg:PromotionGroup{name: "${input.name}"}) WHERE ID(s) = ${storeId} RETURN pg`
      )

      if (result) {
        throw Error(`Promotion Group with name '${input.name}' already exists.`)
      } else {

        const data = {
          storeId,
          input
        }

        const result = await neo4jgraphql(parent, data, ctx, resolveInfo)

        return result
      }
    } catch (e) {
      throw Error(
        `Error encountered in Mutation.js when creating a new Promotion Group: ${e}`
      )
    }
  },

  // @desc Action performed by a store to update a promotion group
  async UpdatePromotionGroup(parent, params, ctx, resolveInfo) {
    const storeId = ctx.user.storeId
    const {
      groupId,
      input
    } = params

    try {
      const result = await neo4jQuery(
        `MATCH (s:Store)-->(pg:PromotionGroup) WHERE ID(s) = ${storeId} AND ID(pg) = ${groupId} RETURN pg`
      )

      if (!result) {
        throw Error(`Promotion Group with id '${groupId}' not found.`)
      } else {

        const data = {
          storeId,
          groupId,
          input
        }

        return neo4jgraphql(parent, data, ctx, resolveInfo)
      }
    } catch (e) {
      throw Error(
        `Error encountered in Mutation.js when updating Promotion Group: ${e}`
      )
    }
  },

  // @desc Action performed by a store to set promotion group status (enabled/disabled)
  async SetPromotionGroupStatus(parent, params, ctx, resolveInfo) {
    const storeId = ctx.user.storeId
    params.storeId = storeId

    return neo4jgraphql(parent, params, ctx, resolveInfo)
  },

  // @desc Action performed by store to remove a promotion group
  async RemovePromotionGroup(parent, params, ctx, resolveInfo) {
    try {
      const storeId = ctx.user.storeId
      params.storeId = storeId
      return neo4jgraphql(parent, params, ctx, resolveInfo)
    } catch (e) {
      console.error(`Error while removing promotion group: ${e}`)
    }
  },


  // @desc Action performed by store to remove one or more promotions
  async RemovePromotions(parent, params, ctx, resolveInfo) {
    try {
      const storeId = ctx.user.storeId
      params.storeId = storeId
      return neo4jgraphql(parent, params, ctx, resolveInfo)
    } catch (e) {
      console.error(`Error while removing promotions: ${e}`)
    }
  },


  // @desc Action performed by store to link a promotion group to one or more product groups
  async LinkPromotionGroupToProductGroups(parent, params, ctx, resolveInfo) {
    try {
      const storeId = ctx.user.storeId
      params.storeId = storeId
      return neo4jgraphql(parent, params, ctx, resolveInfo)
    } catch (e) {
      console.error(`Error while linking promotion group to product groups: ${e}`)
    }
  },

  /** @desc Action performed to unlink promotion group from all product groups */
  async UnlinkPromotionGroup(parent, params, ctx, resolveInfo) {
    try {
      const storeId = ctx.user.storeId
      params.storeId = storeId
      return neo4jgraphql(parent, params, ctx, resolveInfo)
    } catch (e) {
      console.error(`Error while unlinking promotion group: ${e}`)
    }
  },

  /** @desc Action performed on demand to generate promotions of bundle type */
  async GenerateBundlePromotions(parent, params, ctx, resolveInfo) {
    const storeId = ctx.user.storeId
    params.storeId = storeId

    return neo4jgraphql(parent, params, ctx, resolveInfo)
  },

  /** @desc Action performed on demand to generate promotions of bundle type */
  async GenerateDiscountPromotions(parent, params, ctx, resolveInfo) {
    const storeId = ctx.user.storeId
    params.storeId = storeId

    return neo4jgraphql(parent, params, ctx, resolveInfo)
  },

  /** @desc Action performed on demand to generate promotions of bundle type */
  async GenerateBogoffPromotions(parent, params, ctx, resolveInfo) {
    const storeId = ctx.user.storeId
    params.storeId = storeId

    return neo4jgraphql(parent, params, ctx, resolveInfo)
  },

  // User actions from mobile app ------------------------------------------------

  /** @desc Action performed by user to register a new account */
  async RegisterNewUser(parent, params, ctx, resolveInfo) {
    const {userInput} = params;
    userInput.password = bcrypt.hashSync(userInput.password, 10)

    return neo4jgraphql(parent, params, ctx, resolveInfo)
  },

  /** @desc Mutation performed when user account details are updated */
  async UpdateUserAccount(parent, params, ctx, resolveInfo) {

    params.userId = ctx.user._id;

    return neo4jgraphql(parent, params, ctx, resolveInfo)
  },

  /** @desc Mutation performed when user details are updated */
  async UpdateUserDetails(parent, params, ctx, resolveInfo) {

    params.userId = ctx.user._id;

    return neo4jgraphql(parent, params, ctx, resolveInfo)
  },

  /** @desc Mutation performed when user resets their password */
  async UpdateUserPassword(parent, params, ctx, resolveInfo) {

    params.userId = ctx.user._id;
    params.newPassword = bcrypt.hashSync(params.newPassword, 10);

    return neo4jgraphql(parent, params, ctx, resolveInfo)
  },

  /** @desc Mutation performed when user activates or deactivates their account */
  async DeleteUser(parent, params, ctx, resolveInfo) {

    params.userId = ctx.user._id;

    return neo4jgraphql(parent, params, ctx, resolveInfo)
  },

  /** @desc Mutation performed when user activates or deactivates their account */
  async ToggleAccountDisabled(parent, params, ctx, resolveInfo) {

    params.userId = ctx.user._id;

    return neo4jgraphql(parent, params, ctx, resolveInfo)
  },

  /** @desc Mutation performed when the user taps/clicks on a promotion */
  async UserViewedPromotion(parent, params, ctx, resolveInfo) {

    params.userId = ctx.user._id;

    return neo4jgraphql(parent, params, ctx, resolveInfo)
  },

  /** @desc Mutation used to toggle if a promotion has been used */
  async RemoveUsedPromotion(parent, params, ctx, resolveInfo) {

    params.userId = ctx.user._id;

    return neo4jgraphql(parent, params, ctx, resolveInfo)
  },

  /** @desc Mutation used to toggle if a promotion has been used */
  async SetUsedPromotion(parent, params, ctx, resolveInfo) {

    params.userId = ctx.user._id;

    return neo4jgraphql(parent, params, ctx, resolveInfo)
  }
}

export {
  Mutation as
  default
}