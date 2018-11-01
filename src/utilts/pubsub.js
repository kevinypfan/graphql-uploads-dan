const { PubSub } = require('apollo-server-express');

const pubsub = new PubSub()

export { pubsub as default }