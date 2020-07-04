import expresss from 'express'
import client from './apolloClient'

// Queries

const router = expresss.Router()

// @route   GET api/stores
// @desc    Get Stores and related info for the stores page
// @access  Private
router.get('/', async (req, res) => {
  try {
    res.json({ msg: 'Stores page data' })
  } catch (e) {
    console.error(err.message)
    res.status(500).end('Server Error')
  }
})

export default router
