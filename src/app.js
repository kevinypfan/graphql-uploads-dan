import './config/config'
import mongoose from 'mongoose'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import fs from 'fs'
import https from 'https'
import http from 'http'
import schema from './schema'
import { authentication } from './utilts/authentication'
import db from './models/db'
import initApp from './utilts/initApp'
import pubsub from './utilts/pubsub'
import { processUpload } from './utilts/upload'
import { sync } from 'mkdirp'
import morgan from 'morgan'


const app = express();
app.use(morgan('dev'))
mongoose.connect('mongodb://localhost/danUpload', { useNewUrlParser: true }).then(() => {
  console.log("Connected to Database!")
  return initApp()
}).then(user => {
  if (user.message) {
    console.log(user.message)
  } else {
    console.log(user._id)
  }
}).catch((err) => {
  console.log("Not Connected to Database ERROR! ", err);
});
mongoose.set('useCreateIndex', true);

const context = async ({ req, res }) => {
  try {
    const { user, token } = await authentication(req)
    let ctx = { req, res, db, pubsub, processUpload, sync };
    if (user) {
      ctx = { ...ctx, user, token }
    }
    return ctx
  } catch (err) {
    console.log("context error: ", err)
  }
};

const apolloServer = new ApolloServer({ schema, context });
apolloServer.applyMiddleware({ app })

let server;

if (process.env.SSL == false) {
  server = https.createServer(
    {
      key: fs.readFileSync(`./ssl/server.key`),
      cert: fs.readFileSync(`./ssl/server.crt`)
    },
    app
  )
}
server = http.createServer(app)

// Add subscription support
apolloServer.installSubscriptionHandlers(server)


server.listen({ port: process.env.PORT }, () => {
  console.log(
    '🚀 Server ready at',
    `http${process.env.SSL ? 's' : ''}://${process.env.HOSTNAME}:${process.env.PORT}${apolloServer.graphqlPath}\n`,
    `🚀 Subscriptions ready at ws://${process.env.HOSTNAME}:${process.env.PORT}${apolloServer.subscriptionsPath}`
  )
}
)
