// import axios from 'axios'

// import { COULD_NOT_LOAD_COMPANIES, COMPANIES_LOADED } from './types'

// export const loadCompanies = () => async dispatch => {
//   try {
//     const res = await axios.get('/api/companies')
//     dispatch({
//       type: COMPANIES_LOADED,
//       payload: res.data
//     })
//   } catch (err) {
//     dispatch({
//       type: COULD_NOT_LOAD_COMPANIES
//     })
//   }
// }
