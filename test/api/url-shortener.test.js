const path = require('path');
require('dotenv').config({path: path.resolve(process.cwd(), '.env.test')});

const server = require('../../src/server');

describe('url shortener', () => {
  beforeAll(async () => {
    await server.events.once('start');
  });

  describe('generate hash from url', () => {
    test('Throws 400 error if an invalid url is passed', async () => {
      const resp = await server.inject({
        method: 'POST',
        url: '/v1/links',
        payload: {
          url: 'this is not a url'
        }
      });
      expect(resp.statusCode).toBe(400);
    });

    test('Returns a hash if a valid url is passed', async () => {
      const resp = await server.inject({
        method: 'POST',
        url: '/v1/links',
        payload: {
          url: 'https://www.blogfoster.com/'
        }
      });
      expect(resp.statusCode).toBe(200);
      expect(typeof resp.result.hash).toBe('string');
    });
  });

  describe('redirect to the original url', () => {
    const url = 'https://www.blogfoster.com/';
    let hash;

    beforeAll(async () => {
      const resp = await server.inject({
        method: 'POST',
        url: '/v1/links',
        payload: {
          url
        }
      });
      hash = resp.result.hash;
    });

    test('get request to to the shortened url redirects to the original url', async () => {
      const resp = await server.inject({
        method: 'GET',
        url: '/v1/' + hash
      });
      expect(resp.statusCode).toBe(302);
      expect(resp.headers.location).toBe(url);
    })
  })
});
