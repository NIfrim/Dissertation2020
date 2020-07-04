import client from '../apollo'

// Queries
import {
  LOGIN_QUERY,
  LOAD_ACCOUNT_QUERY,
  GET_ALL_COMPANIES_QUERY
} from './queries'

// Action types
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_ACCOUNT,
  AUTH_ERROR,
  LOAD_ACCOUNT,
  GET_ALL_COMPANIES
} from './types'

// Other Actions
import { setAlert } from './alert'
import { appLoading, loadingErrors, loadingSuccess } from './app'

// Get all companies
export const getAllCompanies = () => async dispatch => {
  try {
    dispatch(appLoading())

    const { data } = await client.query({
      query: GET_ALL_COMPANIES_QUERY
    })

    dispatch({
      type: GET_ALL_COMPANIES,
      payload: data.Company
    })

    dispatch(loadingSuccess())
  } catch (e) {
    console.error(`Error while loading companies: ${e}`)
    dispatch(loadingErrors())
  }
}

// Load Account with related data
export const loadAccount = () => async dispatch => {
  try {
    // Start the loading process by setting the loading state to true
    dispatch(appLoading())
    const { data } = await client.query({
      query: LOAD_ACCOUNT_QUERY
    })

    dispatch({
      type: LOAD_ACCOUNT,
      payload: data.LoadAccount
    })

    // Successfull end of process, set loading to false
    dispatch(loadingSuccess())
  } catch (e) {
    console.error('Account load error: ' + e)
    dispatch({
      type: AUTH_ERROR
    })
    // Unsuccessful end of process, set loading to false and add errors
    dispatch(loadingErrors())
  }
}

// Login Account
export const loginAccount = ({
  companyId,
  username,
  password
}) => async dispatch => {
  try {
    if (!companyId || !username || !password) {
      dispatch(setAlert('All fields required!', 'error', 4000))
      dispatch({
        type: LOGIN_FAIL
      })
    } else {
      // Start the loading process by setting the loading state to true
      dispatch(appLoading('login'))

      const res = await client.query({
        query: LOGIN_QUERY,
        variables: {
          companyId: parseInt(companyId),
          username,
          password
        }
      })

      const { LoginAccount } = res.data

      dispatch({
        type: LOGIN_SUCCESS,
        payload: { token: LoginAccount, companyId, username }
      })

      dispatch(loadAccount())
      // Successfull end of process, set loading to false
      dispatch(loadingSuccess('login'))
    }
  } catch (e) {
    dispatch(setAlert(e.message, 'error', 4000))
    dispatch({
      type: LOGIN_FAIL
    })

    // Unsuccessful end of process, set loading to false and add errors
    dispatch(loadingErrors())
  }
}

// LogOut current account by removing token
export const logoutAccount = () => dispatch => {
  dispatch({
    type: LOGOUT_ACCOUNT
  })
}
