const ShortUrl = require('../../models/short_url.model');
const boom = require('boom');

exports.generateUrlHash = async (request) => {
  const urlShortened = new ShortUrl({original_url: request.payload.url});
  await urlShortened.save();
  return {
    hash: urlShortened._id
  };
};

exports.redirectToOriginalUrl = async (request, h) => {
  const shortUrl = await ShortUrl.findById(request.params.hash);

  if (!shortUrl) {
    throw boom.notFound();
  }

  return h.redirect(shortUrl.original_url);
};
