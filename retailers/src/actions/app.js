import { LOADING, SUCCESS, ERRORS } from './types'

// export const toggleSideNav = sideNavOpen => dispatch => {
//   dispatch({
//     type: TOGGLE_SIDE_NAV,
//     payload: {
//       sideNavOpen
//     }
//   })
// }

export const appLoading = () => async dispatch => {
  dispatch({
    type: LOADING
  })
}

export const loadingSuccess = () => dispatch => {
  dispatch({
    type: SUCCESS
  })
}

export const loadingErrors = () => dispatch => {
  dispatch({
    type: ERRORS
  })
}

// export const setActivePage = pageName => dispatch => {
//   dispatch({
//     type: SET_ACTIVE_PAGE,
//     payload: {
//       activePage: pageName
//     }
//   })
// }
