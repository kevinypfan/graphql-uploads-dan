// NODE_ENV default is development
const env = process.env.NODE_ENV || "development";

function parserConfig(config) {
  let envConfig = config[env];
  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key]
  })
}


if (env === "test") {
  const config = require('./config.test.json')
  parserConfig(config);
}


if (env === "development") {
  const config = require('./config.dev.json')
  parserConfig(config);
}

if (env === "product") {
  const config = require('./config.prod.json')
  parserConfig(config);
}