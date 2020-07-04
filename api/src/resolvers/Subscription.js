import {
    PROMOTION_GROUP_CREATED
} from './subscriptionTypes'


const Subscription = {
    newPromotionGroup: {
        subscribe: (_, __, {
            pubSub
        }) => pubSub.asyncIterator(PROMOTION_GROUP_CREATED)
    }
}

export {
    Subscription as
    default
}