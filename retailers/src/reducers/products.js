// Action types
import {} from '../actions/products';
import {
  CREATE_PRODUCT_GROUP,
  UPDATE_PRODUCT_GROUP,
  REMOVE_PRODUCT_GROUPS,
  GET_PRODUCT_GROUPS,
  REMOVE_PRODUCTS,
  PRODUCT_GROUP_ERROR,
  PRODUCT_GROUPS_LOADING,
  PRODUCT_ERROR,
  PRODUCTS_LOADING,
  UPDATE_PRODUCT
} from '../actions/types';

const initState = {
  error: '',
  loading: false,
  productGroups: []
};

export default (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case PRODUCT_GROUPS_LOADING:
    case PRODUCTS_LOADING:
      return { ...state, loading: true, error: '' };

    case GET_PRODUCT_GROUPS:
      return { ...state, productGroups: payload, loading: false, error: '' };

    case CREATE_PRODUCT_GROUP:
      state.productGroups.unshift(payload);
      return { ...state, loading: false, error: '' };

    case UPDATE_PRODUCT_GROUP:
      state.productGroups = state.productGroups.map((elem) => {
        if (elem._id === payload._id) elem = payload;
        return elem;
      });

      return { ...state, loading: false, error: '' };

    case REMOVE_PRODUCT_GROUPS:
      state.productGroups = state.productGroups.filter(
        (elem) => !payload.find((obj) => obj._id === elem._id)
      );
      return { ...state, loading: false, error: '' };

    case REMOVE_PRODUCTS:
      state.productGroups = state.productGroups.map((elem) =>
        elem._id === payload._id
          ? { ...elem, products: payload.products }
          : elem
      );
      return { ...state, loading: false, error: '' };

    case UPDATE_PRODUCT:
      state.productGroups = state.productGroups.map((elem) => {
        if (parseInt(elem._id) === payload.groupId) {
          // Find the index of the updated product
          const prodIndex = elem.products
            .map((obj) => obj._id)
            .indexOf(payload._id);
          // Replace the product object with the edited one
          const { groupId, ...rest } = payload;
          elem.products[prodIndex] = rest;
        }

        return elem;
      });
      return { ...state, loading: false, error: '' };

    case PRODUCT_ERROR:
    case PRODUCT_GROUP_ERROR:
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
};
