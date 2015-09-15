var sortBy = require('lodash/collection/sortBy');
var indexBy = require('lodash/collection/indexBy');
var invoke = require('lodash/collection/invoke');
var filter = require('lodash/collection/filter');
var flatten = require('lodash/array/flatten');

// {Array<ReactComponent>} to extract data from.
var pageComponents = [];

// Flag to distinquish server-side.
var isClient = typeof window !== 'undefined';

/**
 * Reset pageComponents list.
 * - Do this before rendering component tree.
 */
exports.reset = function () {
  pageComponents = [];
};

/**
 * Declare that a component provides Page Parts.
 */
exports.push = function (component) {
  if (!isClient) {
    pageComponents.push(component);
  }
};

/**
 * Get a set of data from the list of pageComponents.
 * - Do this after rendering component tree.
 *
 * @param {string} methodName
 *   Name of to collect, this will directly correspond
 *   to a hook name in pageComponents that provide data.
 * @return {object<key:ReactElement>}
 *   React Elements ready to be rendered.
 */
exports.get = function (methodName) {
  var components = sortBy(pageComponents, '_mountDepth');
  var sets = filter(invoke(components, methodName));
  var elements = flatten(sets);
  return indexBy(elements, exports.getInferredKey);
};

/**
 * Gets a reference key to the ReactElement.
 *
 * @param {ReactElement} element
 *   The ReactElement to get a key for.
 * @return {string}
 *   The inferred unique key.
 */
exports.getInferredKey = function (element) {
  var key = element.key || element.type + (
    (element.type === 'meta' && (element.props.name || element.props.property || element.props.charSet || element.props.httpEquiv)) ||
    (element.type === 'link' && element.props.rel + element.props.href) ||
    (element.type === 'script' && element.props.src) ||
    ''
  );
  return key;
};

/**
 * Mixin for a ReactComponent to provide get methods
 *
 * For example:
 *  - `getMeta` method to declare meta tags for the page.
 *    @return {ReactComponents[]}
 */
exports.Mixin = {
  componentWillMount: function() {
    exports.push(this);
  }
};

exports.PageParts = exports.Mixin;
