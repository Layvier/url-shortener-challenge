const hapi = require('hapi');
require('./database');

const server = new hapi.server({
  port: parseInt(process.env.PORT, 10) || 8888,
  routes: {
    cors: true
  }
});

/**
 * We call an async IIFE in order to use *await* outside of a function
 * */
(async () => {
  try {
    await server.register(require('./api/url-shortener'));

    await server.start();

    console.log('Server started on port ' + server.settings.port);
  } catch (err) {
    console.log(err);
  }
})();

module.exports = server;
