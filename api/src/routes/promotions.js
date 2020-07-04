import expresss from 'express'
import client from './apolloClient'

// Queries

const router = expresss.Router()

// @route   GET api/promotions
// @desc    Get Promotions and related info for the promotions page
// @access  Private
router.get('/', async (req, res) => {
  try {
    res.json({ msg: 'Promotoins page data' })
  } catch (e) {
    console.error(err.message)
    res.status(500).end('Server Error')
  }
})

export default router
