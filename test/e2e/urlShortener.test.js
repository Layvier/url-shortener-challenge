const path = require('path');
require('dotenv').config({path: path.resolve(process.cwd(), '.env.test')});
require('../../src/server');
const {Selector} = require('testcafe');

fixture `Url Shortener`
  .page `http://localhost:8889/`;

test('If a wrong url is supplied, the button should be deactivated', async t => {
  await t.typeText(Selector('textarea[name=original_url]'), 'wrong url')
    .expect(Selector('#shorten_url_button').hasClass('disabled')).ok({ timeout: 5000 });
});

test('If a valid url is supplied, clicking on the button should display a shortened link', async t => {
  await t.typeText(Selector('textarea[name=original_url]'), 'https://www.blogfoster.com/')
    .expect(Selector('#shorten_url_button').hasClass('disabled')).notOk({ timeout: 5000 })
    .click('#shorten_url_button')
    .expect(Selector('#short_url_viewer').exists).ok({ timeout: 5000 });
});
