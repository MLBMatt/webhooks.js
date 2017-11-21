module.exports = createWebhooksApi

const createEventHandler = require('./event-handler')
const middleware = require('./middleware/middleware')

const sign = require('./sign')
const verify = require('./verify')

function createWebhooksApi (options) {
  if (!options) {
    options = {}
  }

  const state = {
    eventHandler: createEventHandler(options),
    path: options.path || '/'
  }

  const webhooksMiddleware = middleware.bind(null, state)

  return {
    sign: sign.bind(null, options.secret),
    verify: verify.bind(null, options.secret),
    on: state.eventHandler.on,
    removeListener: state.eventHandler.removeListener,
    receive: state.eventHandler.receive,
    middleware: webhooksMiddleware
  }
}