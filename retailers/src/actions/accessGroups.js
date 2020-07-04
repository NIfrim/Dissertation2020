import client from '../apollo';

// Utils
import { normalizeForStore } from '../utils';

// Queries
import { GET_COMPANY_ACCOUNTS_QUERY, GET_STORE_ACCOUNTS_QUERY } from './queries';

import {
  CREATE_ACCESS_GROUP_MUTATION,
  REMOVE_ACCESS_GROUPS_MUTATION,
  UPDATE_ACCESS_GROUP_MUTATION,
  CREATE_STORE_ACCESS_GROUP_MUTATION
} from './mutations';

// Action types
import { CREATE_ACCESS_GROUP, REMOVE_ACCESS_GROUPS, GET_ACCESS_GROUPS, UPDATE_ACCESS_GROUP } from './types';

// Other actions
import { setAlert } from '../actions/alert';
import { appLoading, loadingSuccess, loadingErrors } from '../actions/app';

// Load access groups
export const getAccessGroups = (type, companyId, storeId) => async dispatch => {
  try {
    // Start the loading process by setting the loading state to true
    dispatch(appLoading());

    console.log(type, companyId, storeId);

    const query = type === 'COMPANY_ACCOUNT' ? GET_COMPANY_ACCOUNTS_QUERY : GET_STORE_ACCOUNTS_QUERY;
    const variables =
      type === 'COMPANY_ACCOUNT'
        ? {
            companyId: typeof companyId === 'string' ? parseInt(companyId) : companyId
          }
        : { storeId: typeof storeId === 'string' ? parseInt(storeId) : storeId };

    const { data } = await client.query({
      query,
      variables
    });

    // Prepare data for storage be removing __typename object
    const newData = normalizeForStore(data);

    dispatch({
      type: GET_ACCESS_GROUPS,
      payload: type === 'COMPANY_ACCOUNT' ? newData.Company[0].accounts : newData.Store[0].accounts
    });

    // Successfull end of process, set loading to false
    dispatch(loadingSuccess());
  } catch (e) {
    console.error('Error loading accounts: ' + e);
    dispatch(setAlert(e.message, 'error', 4000));

    // Unsuccessful end of process, set loading to false and add errors
    dispatch(loadingErrors());
  }
};

// Create or update access group
export const updateAccessGroup = (accountId = null, formData = {}, edit = false, storeId = null) => async dispatch => {
  const { disabled, groupName, type, username, password, role, scopes } = formData;

  const mutation = edit
    ? UPDATE_ACCESS_GROUP_MUTATION
    : type === 'COMPANY_ACCOUNT'
    ? CREATE_ACCESS_GROUP_MUTATION
    : CREATE_STORE_ACCESS_GROUP_MUTATION;

  const variables = edit
    ? { accountId, input: { ...formData } }
    : type === 'COMPANY_ACCOUNT'
    ? { input: { ...formData } }
    : { storeId, input: { ...formData } };

  try {
    if (disabled === null || !groupName || !type || !username || (!edit && !password) || !role || scopes.length === 0) {
      dispatch(setAlert('All fields are required!', 'error', 3000));
    } else {
      // Start the loading process by setting the loading state to true
      dispatch(appLoading());

      const { data } = await client.mutate({
        mutation,
        variables
      });

      // Prepare data for storage be removing __typename object
      const newData = normalizeForStore(data);

      !edit
        ? dispatch({
            type: CREATE_ACCESS_GROUP,
            payload: {
              ...newData[type === 'COMPANY_ACCOUNT' ? 'CreateCompanyAccount' : 'CreateStoreAccount']
            }
          })
        : dispatch({
            type: UPDATE_ACCESS_GROUP,
            payload: { ...newData.UpdateCompanyAccount }
          });

      dispatch(setAlert(edit ? 'Access group updated' : 'New group created', 'success', 3000));

      // Successfull end of process, set loading to false
      dispatch(loadingSuccess());
    }
  } catch (e) {
    console.error('Error updating accounts: ' + e);

    dispatch(setAlert(e.message, 'error', 4000));

    // Unsuccessful end of process, set loading to false and add errors
    dispatch(loadingErrors());
  }
};

// Remove access groups
export const removeAccessGroups = (groupIds = []) => async dispatch => {
  try {
    if (groupIds.length === 0) {
      dispatch(setAlert('Select groups to be removed', 'info', 2000));
    } else {
      // Start the loading process by setting the loading state to true
      dispatch(appLoading());

      const res = await client.mutate({
        mutation: REMOVE_ACCESS_GROUPS_MUTATION,
        variables: {
          accountIds: groupIds
        }
      });

      const { data } = res;

      dispatch({
        type: REMOVE_ACCESS_GROUPS,
        payload: [...data.RemoveCompanyAccounts.map(elem => elem._id)]
      });

      dispatch(setAlert(`Removed a total of ${data.RemoveCompanyAccounts.length} groups.`, 'info', 3000));

      // Successfull end of process, set loading to false
      dispatch(loadingSuccess());
    }
  } catch (e) {
    console.error('Error encountered removing access groups: ' + e);
    dispatch(setAlert(e.message, 'error', 3000));

    // Unsuccessful end of process, set loading to false and add errors
    dispatch(loadingErrors());
  }
};
