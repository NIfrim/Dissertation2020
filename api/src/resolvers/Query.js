import {
  neo4jgraphql
} from 'neo4j-graphql-js'
import bcrypt from 'bcryptjs'
const jwt = require('jsonwebtoken')

// Utils
import {
  neo4jQuery
} from '../db'

const Query = {
  async TestConnection(parent, params, ctx, resolveInfo) {
    return neo4jgraphql(parent, params, ctx, resolveInfo)
  },


  async LoadAccount(parent, params, ctx, resolveInfo) {
    const user = ctx.user

    try {
      params.accountId = user.accountId

      return neo4jgraphql(parent, params, ctx, resolveInfo)
    } catch (e) {
      throw Error(`Account loading error: ${e}`)
    }
  },

  async LoginAccount(parent, params) {
    const {
      input
    } = params
    try {
      const result = await neo4jQuery(`
      MATCH (c:Company)\n
      WHERE ID(c) = ${input.companyId}
      MATCH (c)-[:COMPANY_ACCOUNT]-(ca:CompanyAccount{username: "${input.username}"})\n
      OPTIONAL MATCH (s:Store)-[:STORE_ACCOUNT]->(ca)
      WITH c, ca, s, ID(s) AS storeID, ID(ca) AS accountID
      RETURN {
        company: {
          _id: ${input.companyId}
        },
        store: {
          _id: storeID
        },
        _id: accountID,
        username: ca.username,
        password: ca.password,
        role: ca.role,
        groupName: ca.groupName,
        scopes: ca.scopes
      } AS CompanyAccount
      `)
      if (!result) {
        throw Error(`Account not found.`)
      } else {
        const isMatch = await bcrypt.compare(input.password, result.password)
        if (!isMatch) throw AuthenticationError({
          msg: 'Invalid Credentials'
        })
        const payload = {
          companyId: result.company._id.low,
          accountId: result._id.low,
          storeId: !!result.store._id ? result.store._id.low : '',
          username: result.username,
          role: result.role,
          scopes: result.scopes
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET)

        return `${token}`
      }
    } catch (e) {
      throw Error(`Login error: ${e}`)
    }
  },



  async LoginUser(parent, params) {
    const {
      input
    } = params

    try {
      const user = await neo4jQuery(`
      MATCH (u:User{email: "${input.email}"})
      RETURN u AS user
      `)
      if (!user) {
        throw Error(`Account not found.`)
      } else {
        const isMatch = await bcrypt.compare(input.password, user.properties.password)
        if (!isMatch) throw AuthenticationError({
          msg: 'Invalid Credentials'
        })
        
        const payload = {
          _id: user.identity.low,
          firstName: user.properties.firstName,
          lastName: user.properties.lastName,
          email: user.properties.email,
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET)

        return token
      }
    } catch (e) {
      throw Error(`Login error: ${e}`)
    }
  },

  async LoadUser(parent, params, ctx, resolveInfo) {
    const user = ctx.user

    try {
      params.email = user.email

      return neo4jgraphql(parent, params, ctx, resolveInfo)
    } catch (e) {
      throw Error(`Account loading error: ${e}`)
    }
  },

  // @ Action performed by store to get all the product groups
  async GetProductGroups(parent, params, ctx, resolveInfo) {
    const storeId = ctx.user.storeId
    params.storeId = storeId
    return neo4jgraphql(parent, params, ctx, resolveInfo)
  },

  async GetPromotionGroups(parent, params, ctx, resolveInfo) {
    const storeId = ctx.user.storeId

    params.storeId = storeId

    return neo4jgraphql(parent, params, ctx, resolveInfo)
  }
}

export {
  Query as
  default
}