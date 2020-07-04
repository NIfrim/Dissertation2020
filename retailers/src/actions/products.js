import client from '../apollo';
import { normalizeForStore } from '../utils';

// Action types
import {
  GET_PRODUCT_GROUPS,
  PRODUCT_GROUP_ERROR,
  REMOVE_PRODUCT_GROUPS,
  UPDATE_PRODUCT_GROUP,
  CREATE_PRODUCT_GROUP,
  REMOVE_PRODUCTS,
  PRODUCT_GROUPS_LOADING,
  PRODUCT_ERROR,
  PRODUCTS_LOADING,
  UPDATE_PRODUCT
} from './types';

// Queries
import { GET_PRODUCT_GROUPS_QUERY } from './queries';
import { setAlert } from './alert';
import {
  REMOVE_PRODUCT_GROUPS_MUTATION,
  UPDATE_PRODUCT_GROUP_MUTATION,
  CREATE_PRODUCT_GROUP_MUTATION,
  REMOVE_PRODUCTS_MUTATION,
  UPDATE_PRODUCT_MUTATION
} from './mutations';

const productGroupsLoading = () => async dispatch => {
  dispatch({
    type: PRODUCT_GROUPS_LOADING
  });
};

const productsLoading = () => async dispatch => {
  dispatch({
    type: PRODUCTS_LOADING
  });
};

export const getProductGroups = () => async dispatch => {
  try {
    dispatch(productGroupsLoading());

    const { data } = await client.query({
      query: GET_PRODUCT_GROUPS_QUERY
    });

    // Prepare data for storage be removing __typename object
    const newData = normalizeForStore(data);

    dispatch({
      type: GET_PRODUCT_GROUPS,
      payload: newData.GetProductGroups
    });
  } catch (e) {
    console.error(`Error while getting product groups: ${e}`);
    dispatch({
      type: PRODUCT_GROUP_ERROR,
      payload: e.message
    });
  }
};

export const removeProductGroups = (storeId, groupIds = []) => async dispatch => {
  const mutation = REMOVE_PRODUCT_GROUPS_MUTATION;
  const variables = { storeId, groupIds };

  try {
    if (groupIds.length === 0) {
      dispatch(setAlert('Select groups to be removed', 'info', 2000));
    } else {
      dispatch(productGroupsLoading());

      const { data } = await client.mutate({ mutation, variables });

      // Prepare data for storage be removing __typename object
      const newData = normalizeForStore(data);

      dispatch({
        type: REMOVE_PRODUCT_GROUPS,
        payload: newData.RemoveProductGroups
      });

      dispatch(setAlert(`Removed a total of ${newData.RemoveProductGroups.length} groups.`, 'info', 3000));
    }
  } catch (e) {
    console.error(`Error while removing product groups: ${e}`);

    dispatch({
      type: PRODUCT_GROUP_ERROR,
      payload: e.message
    });

    dispatch(setAlert('Errors encountered, see console for more', 'error', 4000));
  }
};

export const updateProductGroup = (
  storeId = null,
  groupId = null,
  productGroup = null,
  files = [],
  edit = false
) => async dispatch => {
  try {
    if (!!!storeId || !!!productGroup.name) {
      dispatch(setAlert('Missing required inputs', 'info', 2000));
    } else {
      dispatch(productGroupsLoading());

      const mutation = edit ? UPDATE_PRODUCT_GROUP_MUTATION : CREATE_PRODUCT_GROUP_MUTATION;

      const variables = edit ? { storeId, groupId, productGroup, files } : { storeId, productGroup, files };

      const { data } = await client.mutate({
        mutation: mutation,
        variables: variables
      });

      // Prepare data for storage be removing __typename object
      const newData = normalizeForStore(data);

      dispatch({
        type: edit ? UPDATE_PRODUCT_GROUP : CREATE_PRODUCT_GROUP,
        payload: newData[edit ? 'UpdateProductGroup' : 'CreateProductGroup']
      });

      dispatch(
        setAlert(
          `${edit ? 'Updated' : 'Created'} product group named: ${
            newData[edit ? 'UpdateProductGroup' : 'CreateProductGroup'].name
          }`,
          'success',
          4000
        )
      );
    }
  } catch (e) {
    console.error(`Error while updating product group: ${e}`);

    dispatch({
      type: PRODUCT_GROUP_ERROR,
      payload: e.message
    });

    dispatch(setAlert('Errors ecountered, see console for more', 'error', 4000));
  }
};

export const removeProducts = (groupId = null, prodIds = []) => async dispatch => {
  const mutation = REMOVE_PRODUCTS_MUTATION;
  const variables = { groupId, prodIds };

  try {
    if (!groupId || prodIds.length === 0) {
      throw Error('Missing parameters (groupId:Int or product Ids:Array[Int])');
    } else {
      dispatch(productGroupsLoading());

      const { data } = await client.mutate({ mutation, variables });

      dispatch({
        type: REMOVE_PRODUCTS,
        payload: data.RemoveProducts
      });

      console.log(data.RemoveProducts.products);

      dispatch(
        setAlert(`Removed one product, remaining ${data.RemoveProducts.products.length} products.`, 'info', 3000)
      );
    }
  } catch (e) {
    console.error(`Errors while trying to remove products: ${e}`);

    dispatch({
      type: PRODUCT_GROUP_ERROR,
      payload: e.message
    });

    dispatch(setAlert('Error while trying to remove products, see console for more', 'error', 4000));
  }
};

/**@desc Action to update a product details
 * @param {number} groupId
 * @param {number} productId
 * @param {object} productInput
 */
export const updateProduct = (groupId, productId, productInput) => async dispatch => {
  try {
    dispatch(productsLoading());

    const mutation = UPDATE_PRODUCT_MUTATION;

    const variables = { productId, productInput };

    const { data } = await client.mutate({
      mutation: mutation,
      variables: variables
    });

    // Prepare data for storage be removing __typename object
    const newData = normalizeForStore(data);

    dispatch({
      type: UPDATE_PRODUCT,
      payload: { ...newData.UpdateProduct, groupId }
    });

    dispatch(setAlert(`Updated product with id: ${newData.UpdateProduct._id}`, 'success', 4000));
  } catch (error) {
    console.error(`Error while updating product details: ${error}`);

    dispatch({
      type: PRODUCT_ERROR,
      payload: error.message
    });

    dispatch(setAlert('Errors ecountered while updating product, see console for more', 'error', 4000));
  }
};
