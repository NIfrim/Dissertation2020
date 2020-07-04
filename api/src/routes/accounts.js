import expresss from 'express'
import client from './apolloClient'
import auth from '../middleware/auth'

// Queries
import { GET_STORE_ACCOUNT, GET_COMPANY_ACCOUNT } from './queries'

const router = expresss.Router()

// @route   GET api/accounts
// @desc    Get user account
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { company, store, account } = req

    const result = await client.query({
      query: GET_ACCOUNT,
      variables: {
        companyId:
          typeof company.id === 'string' ? parseInt(company.id) : company.id,
        username: account.username
      }
    })

    const { data } = result

    if (!data) {
      return res.status(400).json({ errors: [{ msg: 'Account not found' }] })
    }

    res.status(200).json(data.Company[0])
  } catch (e) {
    console.error(e.message)
    res.status(500).end('Server Error')
  }
})

export default router
