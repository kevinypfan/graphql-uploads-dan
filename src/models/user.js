import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const schema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  studentId: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    minlength: [6, 'Minimum 6 characters required!'],
  },
  scope: {
    type: String
  },
  tokens: [{
    token: {
      type: String
    },
    device: {
      type: String
    },
    requestIp: {
      type: String
    }
  }]
})

schema.methods.generateAuthToken = function (requestIp, device) {
  const user = this;
  const token = jwt.sign({ _id: user._id.toHexString(), requestIp, device }, process.env.JWT_SECRET).toString();
  user.tokens.push({ token, requestIp, device });
  return user.save().then((user) => {
    return { token, user }
  })
};

schema.methods.userAuthentication = function (password) {
  const user = this;
  return bcrypt.compare(password, user.password)
}


schema.statics.findByCredentials = function (studentId, password) {
  const User = this;

  return User.findOne({ studentId }).then((user) => {
    if (!user) {
      return Promise.reject("沒有這個會員");
    }
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password).then((res) => {
        if (res) {
          resolve(user);
        } else {
          reject("此密碼錯誤");
        }
      })
    })
  })
};

schema.statics.findByToken = function (token) {
  var User = this;
  var decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET)
  } catch (e) {
    return null
  }
  return User.findOne({
    _id: decoded._id,
    'tokens.token': token
  })
}

schema.pre('save', function (next) {
  var user = this;
  if (user.isModified('password')) {
    bcrypt.hash(user.password, 10).then(hash => {
      user.password = hash;
      next();
    })
  } else {
    next();
  }
})

export default mongoose.model('User', schema);