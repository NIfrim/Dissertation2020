import expresss from 'express'
import client from './apolloClient'

// Queries
import { GET_ALL_COMPANIES } from './queries'

const router = expresss.Router()

// @route   GET api/auth
// @desc    Get companies to display on login page
// @access  Public
router.get('/', async (req, res) => {
  try {
    const companies = await client.query({
      query: GET_ALL_COMPANIES
    })

    if (!companies.data) {
      return res.status(404).json({ errors: [{ msg: 'No companies found' }] })
    }

    return res.status(200).json(companies.data)
  } catch (e) {
    console.error(e.message)
    res.status(500).end('Server Error')
  }
})

export default router
