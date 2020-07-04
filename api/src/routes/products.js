import expresss from 'express'
import client from './apolloClient'

// Queries

const router = expresss.Router()

// @route   GET api/products
// @desc    Get Products and related info
// @access  Private
router.get('/', async (req, res) => {
  try {
    res.json({ msg: 'Products page data' })
  } catch (e) {
    console.error(err.message)
    res.status(500).end('Server Error')
  }
})

export default router
