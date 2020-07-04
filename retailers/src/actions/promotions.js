import client from '../apollo';
import { normalizeForStore } from '../utils';
import {
  PROMOTIONS_LOADING,
  CREATE_PROMO_GROUP,
  UPDATE_PROMO_GROUP,
  GET_PROMO_GROUPS,
  PROMO_GROUP_ERROR,
  REMOVE_PROMO_GROUP,
  REMOVE_PROMOTIONS,
  SET_PROMO_GROUP_STATUS,
  LINK_PROMO_GROUP,
  UNLINK_PROMO_GROUP,
  GENERATE_BUNDLE_PROMOTIONS,
  GENERATE_BOGOFF_PROMOTIONS,
  GENERATE_DISCOUNT_PROMOTIONS,
  PROMOTIONS_ERROR
} from './types';
import {
  CREATE_PROMO_GROUP_MUTATION,
  UPDATE_PROMO_GROUP_MUTATION,
  REMOVE_PROMO_GROUP_MUTATION,
  REMOVE_PROMOTIONS_MUTATION,
  SET_PROMO_GROUPS_STATUS_MUTATION,
  UNLINK_PROMO_GROUP_MUTATION,
  LINK_PROMO_GROUP_MUTATION,
  GENERATE_BUNDLE_PROMOTIONS_MUTATION,
  GENERATE_DISCOUNT_PROMOTIONS_MUTATION,
  GENERATE_BOGOFF_PROMOTIONS_MUTATION
} from './mutations';
import { GET_PROMO_GROUPS_QUERY } from './queries';
import { setAlert } from './alert';

/** @desc Method used to set the loading stage of promotions
 *
 * @param {string} type
 */
const promotionsLoading = type => async dispatch => {
  dispatch({
    type: PROMOTIONS_LOADING
  });
};

export const updatePromoGroup = (input = {}, editing = false, groupId = -1) => async dispatch => {
  const { name, description, category } = input;

  const mutation = editing ? UPDATE_PROMO_GROUP_MUTATION : CREATE_PROMO_GROUP_MUTATION;
  const variables = editing ? { groupId, input } : { input };

  try {
    if (!name || !description || !category) {
      dispatch(setAlert('Missing required inputs', 'error', 2000));
      throw Error(`Missing required inputs`);
    }

    dispatch(promotionsLoading());

    const { data } = await client.mutate({
      mutation,
      variables
    });

    // Remove __typename so that it can be stored for later use
    const normalized = normalizeForStore(data);

    dispatch({
      type: editing ? UPDATE_PROMO_GROUP : CREATE_PROMO_GROUP,
      payload: {
        category,
        promoGroup: normalized[editing ? 'UpdatePromotionGroup' : 'CreatePromotionGroup']
      }
    });

    dispatch(setAlert('Promotion group updated/saved.', 'success', 4000));
  } catch (e) {
    console.error(`Error while updating promotion group: ${e}`);

    dispatch({
      type: PROMO_GROUP_ERROR,
      payload: e.message
    });
  }
};

export const setPromoGroupStatus = (category = '', groupId = -1, status = false) => async dispatch => {
  const mutation = SET_PROMO_GROUPS_STATUS_MUTATION;
  const variables = { groupId, status };

  try {
    if (groupId === -1) {
      dispatch(setAlert('Required inputs are either incorrect or missing', 'info', 4000));
      throw Error('Required inputs are either incorrect or missing');
    } else {
      dispatch(promotionsLoading());

      const { data } = await client.mutate({
        mutation,
        variables
      });

      dispatch({
        type: SET_PROMO_GROUP_STATUS,
        payload: { category, promoGroup: data.SetPromotionGroupStatus }
      });
    }
  } catch (e) {
    console.error(`Error encountered while setting promo group status: ${e}`);

    dispatch({
      type: PROMO_GROUP_ERROR,
      payload: e.message
    });
  }
};

export const removePromoGroups = (category, groupId = -1) => async dispatch => {
  const mutation = REMOVE_PROMO_GROUP_MUTATION;
  const variables = { groupId };

  try {
    if (groupId === -1) {
      dispatch(setAlert('Missing some required inputs (category or groupId)', 'info', 4000));
      throw Error('Missing some required inputs to remove promo groups');
    } else {
      dispatch(promotionsLoading());

      const { data } = await client.mutate({
        mutation,
        variables
      });

      dispatch({
        type: REMOVE_PROMO_GROUP,
        payload: { category, promoGroup: data.RemovePromotionGroup }
      });

      dispatch(setAlert('Promotion group with id: ' + groupId + ' has been removed', 'success', 4000));
    }
  } catch (e) {
    console.error(`Error encountered while removing promotion group: ${e}`);
    dispatch(setAlert('Errors while removing promotion group, see console for more', 'error', 4000));
    dispatch({
      type: PROMO_GROUP_ERROR,
      payload: e.message
    });
  }
};

/** Action used to remove one or more promotions from the store
 *
 * @param {array} promotionsIds
 */
export const removePromotions = (category, promotionsIds) => async dispatch => {
  const mutation = REMOVE_PROMOTIONS_MUTATION;
  const variables = { promotionsIds };

  try {
    if (promotionsIds.length < 1) {
      dispatch(setAlert('No promotions have been selected.', 'info', 4000));
      throw Error('No promotions have been selected to be removed.');
    } else {
      dispatch(promotionsLoading());

      const { data } = await client.mutate({
        mutation,
        variables
      });

      dispatch({
        type: REMOVE_PROMOTIONS,
        payload: { category, removedPromotions: data.RemovePromotions }
      });

      dispatch(setAlert(`${data.RemovePromotions.length} Promotions have been removed`, 'success', 4000));
    }
  } catch (e) {
    console.error(`Error encountered while removing promotions: ${e}`);
    dispatch(setAlert('Errors while removing promotions, see console for more', 'error', 4000));
    dispatch({
      type: PROMOTIONS_ERROR,
      payload: e.message
    });
  }
};

export const getPromoGroups = (category = '') => async dispatch => {
  const query = GET_PROMO_GROUPS_QUERY;
  const variables = { category };

  try {
    dispatch(promotionsLoading());

    const { data } = await client.query({
      query,
      variables
    });

    // Remove __typename so that it can be stored for later use
    const normalized = normalizeForStore(data);

    dispatch({
      type: GET_PROMO_GROUPS,
      payload: { category, promoGroups: normalized.GetPromotionGroups }
    });
  } catch (e) {
    console.error(`Error while getting promotion groups: ${e}`);

    dispatch({
      type: PROMO_GROUP_ERROR,
      payload: e.message
    });
  }
};

export const linkPromoToProducts = (category, promoGroupId = -1, productGroups = []) => async dispatch => {
  const mutation = LINK_PROMO_GROUP_MUTATION;
  const variables = { promoGroupId, productGroups };

  try {
    if (promoGroupId === -1 || productGroups.length === 0) {
      dispatch(setAlert('Missing some required inputs (promoGroupId or productGroups)', 'info', 4000));
      throw Error('Missing some required inputs to link the promotion group.');
    } else {
      dispatch(promotionsLoading());

      const { data } = await client.mutate({
        mutation,
        variables
      });

      // Remove __typename so that it can be stored for later use
      const normalized = normalizeForStore(data);

      dispatch({
        type: LINK_PROMO_GROUP,
        payload: {
          category,
          promoGroup: normalized.LinkPromotionGroupToProductGroups
        }
      });

      dispatch(setAlert(productGroups.length + ' Product groups linked to promotion group', 'success', 4000));
    }
  } catch (e) {
    console.error(`Error while linking promotion group to product groups: ${e}`);

    dispatch({
      type: PROMO_GROUP_ERROR,
      payload: e.message
    });
  }
};

export const unlinkPromoGroup = (category, promoGroupId = -1) => async dispatch => {
  const mutation = UNLINK_PROMO_GROUP_MUTATION;
  const variables = { promoGroupId };

  try {
    if (promoGroupId === -1) {
      dispatch(setAlert('Missing some required data', 'info', 4000));
      throw Error('Missing some required inputs to unlink promotion group.');
    } else {
      dispatch(promotionsLoading());

      const { data } = await client.mutate({
        mutation,
        variables
      });

      // Remove __typename so that it can be stored for later use
      const normalized = normalizeForStore(data);

      dispatch({
        type: UNLINK_PROMO_GROUP,
        payload: { category, promoGroup: normalized.UnlinkPromotionGroup }
      });

      dispatch(setAlert('Product groups unlinked from promotion group', 'success', 4000));
    }
  } catch (e) {
    console.error(`Error while unlinking promotion group: ${e}`);

    dispatch({
      type: PROMO_GROUP_ERROR,
      payload: e.message
    });
  }
};

/** Action used to generate bundle | discount | bogoff promotions
 * @param {string} category
 * @param {string} maxProducts
 * @param {number} promoGroupId
 * @param {json} groupData
 */
export const generatePromotions = (category, maxProducts, promoGroupId, groupData) => async dispatch => {
  let mutation = GENERATE_BUNDLE_PROMOTIONS_MUTATION;

  switch (groupData.type) {
    case 'DISCOUNT':
      mutation = GENERATE_DISCOUNT_PROMOTIONS_MUTATION;
      break;

    case 'BOGOFF':
      mutation = GENERATE_BOGOFF_PROMOTIONS_MUTATION;
      break;

    default:
      break;
  }

  const variables =
    groupData.type === 'BUNDLE' ? { maxProducts, promoGroupId, groupData } : { promoGroupId, groupData };

  try {
    // Validate request by checking for the required parameters
    if (
      (groupData.type === 'BUNDLE' && !maxProducts) ||
      (['BUNDLE', 'DISCOUNT'].includes(groupData.type) && !groupData.discount) ||
      (groupData.type === 'BOGOFF' && !groupData.priceInflation) ||
      !groupData.type ||
      !groupData.expires
    ) {
      console.log(groupData);
      dispatch(
        setAlert(
          'Generating promotions requires products to be linked, as well as rules, limits, and expiry date',
          'error',
          4000
        )
      );
    } else {
      dispatch(promotionsLoading());

      const { data } = await client.mutate({ mutation, variables });

      // normalize for storage
      const normalized = normalizeForStore(data);

      switch (groupData.type) {
        case 'BUNDLE':
          dispatch({
            type: GENERATE_BUNDLE_PROMOTIONS,
            payload: {
              category,
              promoGroupId,
              promotions: normalized.GenerateBundlePromotions
            }
          });
          break;

        case 'DISCOUNT':
          dispatch({
            type: GENERATE_DISCOUNT_PROMOTIONS,
            payload: {
              category,
              promoGroupId,
              promotions: normalized.GenerateDiscountPromotions
            }
          });
          break;

        case 'BOGOFF':
          dispatch({
            type: GENERATE_BOGOFF_PROMOTIONS,
            payload: {
              category,
              promoGroupId,
              promotions: normalized.GenerateBogoffPromotions
            }
          });
          break;

        default:
          break;
      }

      dispatch(
        setAlert(
          `Generated and added ${data[Object.keys(data)[0]].length} new ${groupData.type} promotions.`,
          'success',
          4000
        )
      );
    }
  } catch (e) {
    console.error(`Error encountered while generating ${groupData.type} promotions, see console for more: ${e}`);

    dispatch({
      type: PROMO_GROUP_ERROR,
      payload: e.message
    });

    dispatch(
      setAlert(`Error encountered while generating ${groupData.type} promotions, see console for more`, 'error', 4000)
    );
  }
};
