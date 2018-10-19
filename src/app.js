import './config/config'
import mongoose from 'mongoose'
import { ApolloServer } from 'apollo-server'
import schema from './schema'
import { authentication } from './utilts/authentication'
import User from './models/user'


mongoose.connect('mongodb://localhost/danUpload', { useNewUrlParser: true }).then(() => {
  console.log("Connected to Database!")
}).catch((err) => {
  console.log("Not Connected to Database ERROR! ", err);
});
mongoose.set('useCreateIndex', true);

const context = async ({ req, res }) => {
  try {
    const { user, token } = await authentication(req)
    if (!user) return { req, res, db: { User } }
    return { req, res, user, token, db: { User } }
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

