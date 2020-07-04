import client from '../apollo';
import {
  CHANGE_THEME,
  DELETE_USER,
  LOGOUT_ACCOUNT,
  SEND_SUPPORT_MESSAGE,
  SET_DEVICE_INFO,
  SUBMIT_BUG_REPORT,
  TOGGLE_ACCOUNT_DISABLED,
  UPDATE_ACCOUNT_SETTINGS,
  UPDATE_USER_DETAILS,
  UPDATE_USER_PASSWORD,
  USER_UNUSED_PROMOTION,
  USER_USED_PROMOTION,
  USER_VIEWED_PROMOTION
} from './types';
import { setAlert } from './alert';
import { appLoading, loadingErrors, loadingSuccess } from './app';
import {
  DELETE_USER_MUTATION,
  REMOVE_USED_PROMOTION_MUTATION,
  SET_USED_PROMOTION_MUTATION,
  TOGGLE_ACCOUNT_DISABLED_MUTATION,
  UPDATE_USER_ACCOUNT_MUTATION,
  UPDATE_USER_DETAILS_MUTATION,
  UPDATE_USER_PASSWORD_MUTATION,
  VIEWED_PROMOTION_MUTATION
} from './mutations';
import { databaseUpdated, databaseUpdating } from './database';
import { normalizeForStore } from '../utils';

/** Action to update account details
 *
 * @param {object} input
 */
export const updateAccountSettings = (input) => async (dispatch) => {
  const {
    appMode,
    shareLocation,
    smsNotifications,
    emailNotifications,
    twoFactorAuth,
    theme,
    fontScale,
    accountDisabled
  } = input;

  try {
    if (
      !appMode ||
      shareLocation === null ||
      smsNotifications === null ||
      emailNotifications === null ||
      twoFactorAuth === null ||
      accountDisabled === null ||
      !theme ||
      !fontScale
    ) {
      throw new Error(`Missing data required for updating account settings.`);
    } else {
      // Update the theme in the database
      const { data, loading } = await client.mutate({
        mutation: UPDATE_USER_ACCOUNT_MUTATION,
        variables: { accountDetails: { ...input } }
      });

      if (loading) {
        dispatch(databaseUpdating());
        appLoading();
      } else if (data.UpdateUserAccount) {
        dispatch(databaseUpdated());

        const withoutTypename = normalizeForStore(data);

        // Change the theme for the app
        dispatch({
          type: UPDATE_ACCOUNT_SETTINGS,
          payload: withoutTypename.UpdateUserAccount.account
        });

        dispatch(loadingSuccess());
        dispatch(setAlert(`Account settings updated.`, 'success'));
      }
    }
  } catch (err) {
    dispatch(setAlert(`Error while updating account settings.`, 'error', 3000));
    console.error(err);
    dispatch(loadingErrors([err]));
  }
};

/** Action to switch between the available themes
 *
 * @param {object} accountDetails
 */
export const changeTheme = (accountDetails) => async (dispatch) => {
  try {
    if (!accountDetails) {
      throw new Error(`Missing data required for updating account theme.`);
    } else {
      // Update the theme in the database
      const { data, loading } = await client.mutate({
        mutation: UPDATE_USER_ACCOUNT_MUTATION,
        variables: { accountDetails }
      });

      if (loading) {
        dispatch(databaseUpdating());
      } else if (data.UpdateUserAccount) {
        dispatch(databaseUpdated());
      }

      // Change the theme for the app
      dispatch({
        type: CHANGE_THEME,
        payload: accountDetails
      });

      setAlert(
        `Theme successfully changed to ${accountDetails.theme} theme.`,
        'success',
        4000
      );
    }
  } catch (e) {
    setAlert(
      `Error while changing theme to ${accountDetails.theme} theme.`,
      'error',
      4000
    );
    console.error(e);
    loadingErrors([e]);
  }
};

/** @desc Action used to update user details
 * @param {object} userInput
 * */
export const updateUserDetails = (userInput) => async (dispatch) => {
  const { firstName, lastName, email, mobile } = userInput;
  try {
    if (!firstName || !lastName || !email || !mobile) {
      throw new Error(`Missing inputs required for updating user.`);
    } else {
      const { data, loading } = await client.mutate({
        mutation: UPDATE_USER_DETAILS_MUTATION,
        variables: { userInput }
      });

      if (loading) {
        dispatch(databaseUpdating());
        dispatch(appLoading());
      } else if (data.UpdateUserDetails) {
        dispatch(databaseUpdated());

        dispatch({
          type: UPDATE_USER_DETAILS,
          payload: data.UpdateUserDetails
        });

        dispatch(loadingSuccess());
        dispatch(setAlert('User details successfully updated', 'success'));
      }
    }
  } catch (err) {
    setAlert(`Error while updating user details.`, 'error', 4000);
    console.error(err);
    loadingErrors([err]);
  }
};

/** @desc Action used to update the user password
 * @param {string} code
 * @param {string} password
 * */
export const updateUserPassword = (code, newPassword) => async (dispatch) => {
  try {
    if (!code || !newPassword) {
      throw new Error(`Missing inputs required for updating the password.`);
    } else if (code !== '123456') {
      console.log(code);
      throw new Error(`Code does not match the one sent to your email.`);
    } else {
      const { data, loading } = await client.mutate({
        mutation: UPDATE_USER_PASSWORD_MUTATION,
        variables: { newPassword }
      });

      if (loading) {
        dispatch(databaseUpdating());
        dispatch(appLoading());
      } else if (data.UpdateUserPassword) {
        dispatch(databaseUpdated());

        dispatch({
          type: UPDATE_USER_PASSWORD,
          payload: data.UpdateUserPassword
        });

        dispatch(loadingSuccess());
        dispatch(
          setAlert(
            'Password reset successfully, application will now log out. Please use new password to log back in.',
            'success',
            4000
          )
        );

        // Log the user our after 5 seconds
        setTimeout(() => {
          // Logout the user
          dispatch({
            type: LOGOUT_ACCOUNT
          });
        }, 4500);
      }
    }
  } catch (err) {
    dispatch(
      setAlert(`Error while resetting password: ${err.message}`, 'error', 4000)
    );
    dispatch(loadingErrors([err]));
  }
};

/** @desc Action used to add the current device info
 * @param {object} deviceInfo
 * */
export const setDeviceInfo = (deviceInfo) => async (dispatch) => {
  try {
    dispatch(appLoading());

    dispatch({
      type: SET_DEVICE_INFO,
      payload: deviceInfo
    });

    dispatch(loadingSuccess());
  } catch (err) {
    loadingErrors([err]);
  }
};

/** @desc Action used by user to delete their account
 * */
export const deleteUser = () => async (dispatch) => {
  try {
    const { data, loading } = await client.mutate({
      mutation: DELETE_USER_MUTATION
    });

    if (loading) {
      dispatch(databaseUpdating());
      dispatch(appLoading());
    } else {
      dispatch(databaseUpdated());

      dispatch({
        type: DELETE_USER,
        payload: data
      });

      dispatch(loadingSuccess());

      dispatch(
        setAlert(
          'Account deleted, we are always here if you change you mind. Application will now log out.',
          'success',
          4000
        )
      );

      // Log the user our after 5 seconds
      setTimeout(() => {
        // Logout the user
        dispatch({
          type: LOGOUT_ACCOUNT
        });
      }, 4500);
    }
  } catch (err) {
    dispatch(
      setAlert(
        'An error occurred while trying to delete account.',
        'error',
        3000
      )
    );

    dispatch(loadingErrors([err]));
  }
};

/** @desc Action used by user to delete their account
 * */
export const toggleAccountDisabled = (accountDisabled) => async (dispatch) => {
  try {
    dispatch(appLoading());

    const { data, loading } = await client.mutate({
      mutation: TOGGLE_ACCOUNT_DISABLED_MUTATION,
      variables: { accountDisabled }
    });

    if (loading) {
      dispatch(databaseUpdating());
      dispatch(appLoading());
    } else if (data.ToggleAccountDisabled) {
      dispatch(databaseUpdated());

      dispatch({
        type: TOGGLE_ACCOUNT_DISABLED,
        payload: data.ToggleAccountDisabled.account.accountDisabled
      });

      dispatch(loadingSuccess());

      dispatch(
        setAlert(
          `Account ${accountDisabled ? 'disabled' : 'enabled'}, ${
            accountDisabled
              ? ' you will no longer receive promotions'
              : ' you can receive promotions once again'
          }.`,
          'success',
          4000
        )
      );
    }
  } catch (err) {
    dispatch(
      setAlert(
        'An error occurred while trying to toggle account disabled.',
        'error',
        3000
      )
    );

    dispatch(loadingErrors([err]));
  }
};

/** @desc Action used by user to send a message to the support staff
 * */
export const sendSupportMessage = () => async (dispatch) => {
  try {
    dispatch(appLoading());

    dispatch({
      type: SEND_SUPPORT_MESSAGE
    });

    dispatch(loadingSuccess());

    dispatch(
      setAlert(
        'We have received your message, and will get in touch with you within the next 48 hours.',
        'success',
        4000
      )
    );
  } catch (err) {
    dispatch(
      setAlert(
        'An error occurred while sending a support message.',
        'error',
        3000
      )
    );

    dispatch(loadingErrors([err]));
  }
};

/** @desc Action used by user to submit a bug report
 * */
export const sendBugReport = () => async (dispatch) => {
  try {
    dispatch(appLoading());

    dispatch({
      type: SUBMIT_BUG_REPORT
    });

    dispatch(loadingSuccess());

    dispatch(
      setAlert(
        'We have received your report, thank you for caring.',
        'success',
        4000
      )
    );
  } catch (err) {
    dispatch(
      setAlert('An error occurred while submitting bug report.', 'error', 3000)
    );

    dispatch(loadingErrors([err]));
  }
};

/** @desc Action used by user to toggle if they used a promotion or not
 * @param {number} promoId
 * @param {boolean} used
 * */
export const toggleUsedPromotion = (promoId, used) => async (dispatch) => {
  console.log(used);
  try {
    const { data, loading } = await client.mutate({
      mutation: used
        ? REMOVE_USED_PROMOTION_MUTATION
        : SET_USED_PROMOTION_MUTATION,
      variables: { promoId: parseInt(promoId) }
    });

    if (loading) {
      dispatch(appLoading());
      dispatch(databaseUpdating());
    } else {
      dispatch(loadingSuccess());
      dispatch(databaseUpdated());
      dispatch({
        type: used ? USER_UNUSED_PROMOTION : USER_USED_PROMOTION,
        payload: used ? data.RemoveUsedPromotion : data.SetUsedPromotion
      });
    }
  } catch (err) {
    console.error(`Error encountered while toggling used promotion: ${err}`);
    dispatch(loadingErrors([err]));
  }
};

/** @desc Action used by user to toggle if they used a promotion or not
 * @param {number} promoId
 * */
export const viewedPromotion = (promoId) => async (dispatch) => {
  try {
    const { data, loading } = await client.mutate({
      mutation: VIEWED_PROMOTION_MUTATION,
      variables: { promoId: parseInt(promoId) }
    });

    if (loading) {
      dispatch(appLoading());
      dispatch(databaseUpdating());
    } else if (data.UserViewedPromotion) {
      dispatch(loadingSuccess());
      dispatch(databaseUpdated());
      dispatch({
        type: USER_VIEWED_PROMOTION,
        payload: data.UserViewedPromotion
      });
    }
  } catch (err) {
    console.error(`Error encountered while opening promotion: ${err}`);
    dispatch(loadingErrors([err]));
  }
};
