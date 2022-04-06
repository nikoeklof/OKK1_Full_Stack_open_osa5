require('dotenv').config()


let PORT = process.env.PORT
let TEST_PORT = process.env.PORT_TEST
let MONGODB_URI = process.env.NODE_ENV === 'test' ? process.env.TEST_MONGODB_URI: process.env.MONGODB_URI


if (process.env.NODE_ENV === 'test') {
  PORT = TEST_PORT
  MONGODB_URI = process.env.TEST_MONGODB_URI
}

module.exports = {
  MONGODB_URI,
  PORT
}