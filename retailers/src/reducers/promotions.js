import {
  CREATE_PROMO_GROUP,
  PROMOTIONS_LOADING,
  PROMO_GROUP_ERROR,
  GET_PROMO_GROUPS,
  REMOVE_PROMO_GROUP,
  UPDATE_PROMO_GROUP,
  SET_PROMO_GROUP_STATUS,
  LINK_PROMO_GROUP,
  UNLINK_PROMO_GROUP,
  REMOVE_PROMOTIONS,
  GENERATE_BUNDLE_PROMOTIONS,
  GENERATE_BOGOFF_PROMOTIONS,
  GENERATE_DISCOUNT_PROMOTIONS
} from '../actions/types'

const initState = {
  error: '',
  loading: false,
  promoGroups: {
    general: [],
    green: [],
    tailored: []
  }
}

export default (state = initState, action) => {
  const { type, payload } = action

  switch (type) {
    case SET_PROMO_GROUP_STATUS:
      state.promoGroups[payload.category] = state.promoGroups[
        payload.category
      ].map(elem =>
        elem._id === payload.promoGroup._id
          ? { ...elem, disabled: payload.promoGroup.disabled }
          : elem
      )
      return { ...state, loading: false, error: '' }

    case REMOVE_PROMO_GROUP:
      state.promoGroups[payload.category] = state.promoGroups[
        payload.category
      ].filter(elem => elem._id !== payload.promoGroup._id)
      return {
        ...state,
        loading: false,
        error: ''
      }

    case REMOVE_PROMOTIONS:
      state.promoGroups[payload.category] = state.promoGroups[
        payload.category
      ].map(group => {
        let promotions = group.promotions.filter(
          promo => !payload.removedPromotions.find(obj => obj._id === promo._id)
        )
        return { ...group, promotions }
      })
      return {
        ...state,
        loading: false,
        error: ''
      }

    case GENERATE_BOGOFF_PROMOTIONS:
    case GENERATE_BUNDLE_PROMOTIONS:
    case GENERATE_DISCOUNT_PROMOTIONS:
      state.promoGroups[payload.category] = state.promoGroups[
        payload.category
      ].map(promoGroup => {
        return parseInt(promoGroup._id) === payload.promoGroupId
          ? {
              ...promoGroup,
              promotions: [...promoGroup.promotions, ...payload.promotions]
            }
          : promoGroup
      })

      return {
        ...state,
        loading: false,
        error: ''
      }

    case CREATE_PROMO_GROUP:
      state.promoGroups[payload.category].unshift(payload.promoGroup)
      return { ...state, loading: false, error: '' }

    case LINK_PROMO_GROUP:
    case UNLINK_PROMO_GROUP:
    case UPDATE_PROMO_GROUP:
      state.promoGroups[payload.category] = state.promoGroups[
        payload.category
      ].map(elem =>
        elem._id === payload.promoGroup._id
          ? { ...elem, ...payload.promoGroup }
          : elem
      )
      return { ...state, loading: false, error: '' }

    case GET_PROMO_GROUPS:
      state.promoGroups[payload.category] = payload.promoGroups

      return {
        ...state,
        loading: false,
        error: ''
      }

    case PROMOTIONS_LOADING:
      return { ...state, loading: true, error: '' }

    case PROMO_GROUP_ERROR:
      return { ...state, loading: false, error: payload }

    default:
      return state
  }
}
