import client from '../apollo';

// Queries and Mutations
import { GET_COMPANY_STORES_QUERY } from './queries';

import { CREATE_STORE_MUTATION, REMOVE_STORES_MUTATION, UPDATE_STORE_MUTATION } from './mutations';

// Action types and actions
import { GET_STORES, CREATE_STORE, UPDATE_STORE, REMOVE_STORES } from './types';
import { appLoading, loadingErrors, loadingSuccess } from './app';
import { setAlert } from './alert';
import { normalizeForStore } from '../utils';

export const getStores = companyId => async dispatch => {
  try {
    // Start the loading process by setting the loading state to true
    dispatch(appLoading());

    const { data } = await client.query({
      query: GET_COMPANY_STORES_QUERY,
      variables: {
        companyId: parseInt(companyId)
      }
    });

    // Prepare data for storage be removing __typename object
    const newData = normalizeForStore(data);

    dispatch({
      type: GET_STORES,
      payload: newData.Company[0].stores
    });

    // Successfull end of process, set loading to false
    dispatch(loadingSuccess());
  } catch (e) {
    console.error('Error loading stores: ' + e);
    dispatch(setAlert(e.message, 'error', 4000));

    // Unsuccessful end of process, set loading to false and add errors
    dispatch(loadingErrors());
  }
};

export const updateStore = (storeId, formData = {}, edit = false) => async dispatch => {
  const { store, location } = formData;

  storeId = storeId ? parseInt(storeId) : null;

  const mutation = edit ? UPDATE_STORE_MUTATION : CREATE_STORE_MUTATION;
  const variables = edit ? { storeId, store, location } : { ...formData };

  try {
    if (
      (store && !store.name) ||
      (location && !location.city) ||
      (location && !location.street) ||
      (location && !location.postcode) ||
      (location && !location.number) ||
      (location && !location.country) ||
      (location && !location.latitude) ||
      (location && !location.longitude) ||
      (formData.account && !formData.account.username) ||
      (formData.account && !formData.account.password)
    ) {
      dispatch(setAlert('All fields are required!, including location using the picker.', 'error', 4000));
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
            type: CREATE_STORE,
            payload: { ...newData.CreateStore }
          })
        : dispatch({
            type: UPDATE_STORE,
            payload: { ...newData.UpdateStore }
          });

      dispatch(setAlert(edit ? 'Store updated' : 'Store created', 'success', 3000));

      // Successfull end of process, set loading to false
      dispatch(loadingSuccess());
    }
  } catch (e) {
    console.error('Error updating stores: ' + e);

    dispatch(setAlert(e.message, 'error', 4000));

    // Unsuccessful end of process, set loading to false and add errors
    dispatch(loadingErrors());
  }
};

export const removeStores = (storeIds = []) => async dispatch => {
  try {
    if (storeIds.length === 0) {
      dispatch(setAlert('Select groups to be removed', 'info', 2000));
    } else {
      // Start the loading process by setting the loading state to true
      dispatch(appLoading());

      const res = await client.mutate({
        mutation: REMOVE_STORES_MUTATION,
        variables: {
          storeIds: storeIds
        }
      });

      const { data } = res;

      // @todo Action removes from database but not from store

      dispatch({
        type: REMOVE_STORES,
        payload: [...data.RemoveStores.map(elem => elem._id)]
      });

      dispatch(setAlert(`Removed a total of ${data.RemoveStores.length} groups.`, 'info', 3000));

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
