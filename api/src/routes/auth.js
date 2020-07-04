import expresss from 'express'
import client from './apolloClient'
import { check, validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import auth from '../middleware/auth'

// Queries
import {
  GET_ALL_COMPANIES,
  GET_COMPANY_ACCOUNT,
  GET_STORE_ACCOUNT
} from './queries'

const router = expresss.Router()

// @route   POST api/auth
// @desc    Authenticate Company/Store
// @access  Public
router.post(
  '/',
  [
    check('companyId', 'Company is required').notEmpty(),
    check('username', 'Username is required').notEmpty(),
    check(
      'password',
      'Password is required with 5 or more characters'
    ).notEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() })
    }

    const { companyId, storeId, username, password } = req.body

    console.log(companyId, storeId, username)

    try {
      result = await client.query({
        query: GET_COMPANY_ACCOUNT,
        variables: {
          companyId: companyId,
          username: username
        }
      })

      const { data } = result

      if (!data) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] })
      }

      const { Company } = data
      const { accounts } = Company[0]

      const isMatch = await bcrypt.compare(password, accounts[0].password)

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] })
      }

      const payload = {
        company: {
          id: Company[0]._id,
          name: Company[0].name
        },
        account: {
          id: accounts[0]._id,
          username: accounts[0].username,
          role: accounts[0].role,
          scopes: accounts[0].scopes
        }
      }

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '100d' },
        (err, token) => {
          if (err) throw err
          return res.status(200).json({ token })
        }
      )
    } catch (e) {
      console.error(e)
      res.status(500).end('Server Error')
    }
  }
)

export default router
