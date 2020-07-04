// import { COMPANIES_LOADED } from '../actions/types'

// const initState = {
//   loading: true,
//   list: []
// }

// export default (state = initState, action) => {
//   const { type, payload } = action
//   switch (type) {
//     case COMPANIES_LOADED:
//       const companies = payload.Company.map(company => company)
//       console.log(companies)
//       return { ...state, list: companies, loading: false }

//     default:
//       return state
//   }
// }
