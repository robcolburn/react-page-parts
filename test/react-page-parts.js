var React = require('react/addons');
var Router = require('react-router');
var PageParts = require('..');
var template = require('./fixtures/index.ejs');

function tests(CoffeeShop) {
  it('Render a React app w/ Page Parts', function () {
    return getRouteHandler(CoffeeShop.routes, '/')
      .then(function(Handler) {
        PageParts.reset();
        var app = render(Handler);
        var tags = PageParts.get('meta');
        var meta = renderParts('head', null, tags);
        Object.keys(tags).should.have.length(7);
        meta.should.contain('<title>Coffee Shop</title>');
        meta.should.contain('<meta name="description" content="coffeeish">');
      });
  });
  it('Render a static route in an EJS template', function () {
    return getRouteHandler(CoffeeShop.routes, '/')
      .then(function(Handler) {
        PageParts.reset();
        return render(Handler);
      })
      .then(function(appHtml) {
        return {
          app: appHtml,
          meta: renderParts('head', null, PageParts.get('meta')),
          scripts: renderParts('div', null, PageParts.get('scripts'))
        };
      })
      .then(template)
      .then(function (html) {
        html.should.contain('<title>Coffee Shop</title>');
        html.should.contain('<meta name="description" content="coffeeish">');
        html.should.contain('src="//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"');
      });
  });
  it('Render a dynamic route in an EJS template', function () {
    return getRouteHandler(CoffeeShop.routes, '/mocha')
      .then(function(Handler) {
        PageParts.reset();
        return render(Handler);
      })
      .then(function(appHtml) {
        return {
          app: appHtml,
          meta: renderParts('head', null, PageParts.get('meta')),
          scripts: renderParts('div', null, PageParts.get('scripts'))
        };
      })
      .then(template)
      .then(function (html) {
        html.should.contain('<title>mocha: Coffee Shop</title>');
        html.should.contain('<meta name="description" content="yum">');
        html.should.contain('src="//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"');
      });
  });
}

/**
 * Get a Router Handler
 * @param {Route} routes
 *   Your route config.
 * @param {string} url
 *   The URL to route to.
 * @return {Promise<ReactComponent>}
 *   Yields ReactComponent w/ the current match all wrapped up inside it,
 *   ready for you to render.
 */
function getRouteHandler (routes, url) {
  return new Promise(function(resolve) {
    Router.run(routes, url, resolve);
  });
}

/**
 * Render associated tags for page.
 *
 * @param see React.createElement
 *
 * @return {string}
 *   Result output HTML string.
 */
function render (element, params, children) {
  return React.renderToString(React.createElement(element, params, children));
}

/**
 * Render associated tags for page.
 *
 * @param {string} wrapperTag
 *   Namae of a ReactElement to wrap element set with.
 * @param {string} methodName
 *   Name of to collect, this will directly correspond
 *   to a hook name in components that provide data.
 *
 * @return {string}
 *   Result output HTML string.
 */
function renderParts (element, params, children) {
  return React.renderToStaticMarkup(React.createElement(element, params, React.addons.createFragment(children)));
}

describe('Page Parts', function() {
  describe('Mixin', function() {
    tests(require('../example-app/CoffeeShop'));
  });
  describe('Direct', function() {
    tests(require('../example-app/CoffeeShopSansMixin'));
  });
});
