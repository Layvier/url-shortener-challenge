exports.plugin = {
  name: 'url-shortener',
  async register(server) {
    server.route(require('./url-shortener.routes'));
  }
};
