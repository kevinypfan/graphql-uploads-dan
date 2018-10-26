import './config/config'
import mongoose from 'mongoose'
import { ApolloServer } from 'apollo-server'
import schema from './schema'
import { authentication } from './utilts/authentication'
import db from './models/db'
import initApp from './utilts/initApp'


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
    let ctx;
    if (!user) {
      ctx = { req, res, db }
    } else {
      ctx = { req, res, user, token, db }
    }
    return ctx
  } catch (err) {
    console.log("context error: ", err)
  }
};

const server = new ApolloServer({ schema, context });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.

server.listen(process.env.PORT).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

