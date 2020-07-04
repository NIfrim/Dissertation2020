import client from '../apollo';

// Mutations
import { REGISTER_ACCOUNT_MUTATION } from './mutations';

// Queries
import {
  LOGIN_USER_QUERY,
  LOAD_USER_BY_EMAIL_QUERY,
  LOAD_USER_QUERY
} from './queries';

// Action types
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_ACCOUNT,
  LOAD_USER_ACCOUNT,
  REGISTER_FAIL,
  AUTH_ERROR,
  REGISTER_SUCCESS
} from './types';

// Avatars
import Avatars from '@dicebear/avatars';
import sprites from '@dicebear/avatars-human-sprites';

// Other Actions
import { setAlert } from './alert';
import { appLoading, loadingErrors, loadingSuccess } from './app';
import { normalizeForStore } from '../utils';

/** Action used to load the user account using the stored token
 */
export const loadUser = () => async (dispatch) => {
  try {
    // Start the loading process by setting the loading state to true
    dispatch(appLoading());

    const { data } = await client.query({
      query: LOAD_USER_QUERY
    });

    const withoutTypename = normalizeForStore(data);

    dispatch({
      type: LOAD_USER_ACCOUNT,
      payload: withoutTypename.LoadUser
    });

    // Successfull end of process, set loading to false
    dispatch(loadingSuccess());
  } catch (e) {
    dispatch({
      type: AUTH_ERROR
    });
    dispatch(loadingErrors([e.message]));
  }
};

/** Action to register a new user account.
 *
 * @param {object} formInput
 */
export const registerUser = (formInput, deviceInfo) => async (dispatch) => {
  const { email, firstName, lastName, password } = formInput;
  const { platform, loggedIn } = deviceInfo;

  try {
    if (!email || !password || !firstName || !lastName) {
      throw new Error('One or more inputs are missing!');
    } else if (!platform || loggedIn === null || loggedIn === undefined) {
      throw new Error('Device info missing!');
    } else {
      // Check if user already has account, using email
      const { data, loading } = await client.query({
        query: LOAD_USER_BY_EMAIL_QUERY,
        variables: { email }
      });

      if (loading) {
        dispatch(appLoading());
      } else if (data.User && data.User.length > 0) {
        throw new Error(`User with email "${email}" already exists.`);
      } else {
        // Create avatar svg
        const options = {
          width: 300,
          height: 300,
          base64: true,
          mood: ['happy', 'surprised']
        };
        const avatars = new Avatars(sprites, options);
        const avatar = await avatars.create([firstName, lastName].join('-'));

        const userInput = { ...formInput, avatar };

        // Register new account
        const mutation = REGISTER_ACCOUNT_MUTATION;
        const variables = { userInput: userInput, deviceInfo };

        const { data, loading } = await client.mutate({ mutation, variables });

        if (loading) {
          // Start the loading process by setting the loading state to true
          dispatch(appLoading());
        } else if (data.RegisterNewUser) {
          dispatch({
            type: REGISTER_SUCCESS
          });

          // Login the newly registered user
          dispatch(loginUser(email, password));
        }
      }
    }
  } catch (e) {
    dispatch(setAlert(e.message, 'error', 4000));

    dispatch({
      type: REGISTER_FAIL
    });

    // Unsuccessful end of process, set loading to false and add errors
    dispatch(loadingErrors({ errors: e.message }));
  }
};

/** Action used to login used using email and password
 *
 * @param {string} email
 * @param {string} password
 */
export const loginUser = (email, password) => async (dispatch) => {
  try {
    if (!email || !password) {
      dispatch(setAlert('All fields required!', 'error', 4000));
      dispatch({
        type: LOGIN_FAIL
      });
    } else {
      const { data, loading } = await client.query({
        query: LOGIN_USER_QUERY,
        variables: {
          email,
          password
        }
      });

      if (loading) {
        // Start the loading process by setting the loading state to true
        dispatch(appLoading());
      } else if (data) {
        const { LoginUser } = data;

        dispatch({
          type: LOGIN_SUCCESS,
          payload: { token: LoginUser }
        });

        // Successfull end of process, set loading to false
        dispatch(setAlert('Welcome to Discounter!', 'success', 3000));
        dispatch(loadingSuccess());
      }
    }
  } catch (e) {
    dispatch(setAlert(e.message, 'error', 4000));
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// LogOut current account by removing token
export const logoutUser = () => async (dispatch) => {
  try {
    dispatch(appLoading());

    // Logout the user
    dispatch({
      type: LOGOUT_ACCOUNT
    });

    dispatch(loadingSuccess());
    dispatch(
      setAlert('Successfully logged out. See you soon!', 'success', 4000)
    );
  } catch (err) {
    console.error(
      `Error encountered while user was logging out: ${err.message}`
    );
    dispatch(loadingErrors([err.message]));
  }
};
