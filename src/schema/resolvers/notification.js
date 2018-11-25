import pubsub from '../../utilts/pubsub'

export default {
    Subscription: {
        addedNotify: {
            subscribe: () => pubsub.asyncIterator('addedNotify'),
        }
    }

}