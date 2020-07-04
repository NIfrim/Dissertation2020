import { APP_LOADING, LOADING_SUCCESS, APP_ERRORS } from './types';

export const appLoading = () => async (dispatch) => {
  try {
    dispatch({
      type: APP_LOADING
    });
  } catch (err) {
    console.error(
      `Error encountered while application was loading: ${err.message}`
    );
  }
};

export const loadingSuccess = () => async (dispatch) => {
  try {
    dispatch({
      type: LOADING_SUCCESS
    });
  } catch (err) {
    console.error(`Error encountered after application loaded: ${err.message}`);
  }
};

export const loadingErrors = (errors) => async (dispatch) => {
  try {
    dispatch({
      type: APP_ERRORS,
      payload: errors
    });
  } catch (err) {
    console.error(`Requested action could not go through: ${err.message}`);
  }
};
