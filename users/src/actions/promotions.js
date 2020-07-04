import client from '../apollo';
import { FILTER_PROMOTIONS, LOAD_USER_PROMOTIONS } from './types';
import { setAlert } from './alert';
import { appLoading, loadingErrors, loadingSuccess } from './app';
import { LOAD_USER_PROMOTIONS_QUERY } from './queries';
import { normalizeForStore } from '../utils';

/** Action used to load available promotions
 */
export const loadPromotions = () => async (dispatch) => {
  try {
    // Get the promotions from the database
    const { data, loading } = await client.query({
      query: LOAD_USER_PROMOTIONS_QUERY
    });

    if (loading) {
      dispatch(appLoading());
    } else {
      const withoutTypename = normalizeForStore(data);

      dispatch({
        type: LOAD_USER_PROMOTIONS,
        payload: withoutTypename.Store
      });

      dispatch(loadingSuccess());
    }
  } catch (e) {
    setAlert(`Error while loading promotions.`, 'error', 4000);
    console.error(e);
    loadingErrors([e]);
  }
};

/** @desc Action used to set promotions filters which are then used to filter what is shown to the user
 *  @param {obj} filter
 * */
export const filterPromotions = (filter) => async (dispatch) => {
  try {
    dispatch(appLoading());

    dispatch({
      type: FILTER_PROMOTIONS,
      payload: filter
    });

    dispatch(loadingSuccess());
  } catch (err) {
    dispatch(
      setAlert(
        'Erro: Could not apply filter. Report if it happens again',
        'error',
        3000
      )
    );
    dispatch(loadingErrors());
  }
};
