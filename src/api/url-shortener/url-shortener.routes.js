const joi = require('joi');
const handlers = require('./url-shortener.handlers');

module.exports = [
  {
    method: 'POST',
    path: '/v1/links',
    options: {
      description: 'Stores an url and returns the generated shortid (hash)',
      handler: handlers.generateUrlHash,
      validate: {
        payload: {
          url: joi.string().uri({
            scheme: ['http', 'https']
          }).required()
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/v1/{hash}',
    options: {
      description: 'Redirects to stored url corresponding to the passed hash',
      handler: handlers.redirectToOriginalUrl
    }
  }];
