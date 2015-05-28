# react-page-parts

[![npm package](https://img.shields.io/npm/v/react-page-parts.svg?style=flat-square)](https://www.npmjs.org/package/react-page-parts)
[![build status](https://img.shields.io/travis/robcolburn/react-page-parts/master.svg?style=flat-square)](https://travis-ci.org/robcolburn/react-page-parts)
[![dependency status](https://img.shields.io/david/robcolburn/react-page-parts.svg?style=flat-square)](https://david-dm.org/robcolburn/react-page-parts)

A way to extract other parts page, such as meta tags, from a React app.

When building a React app with data pumping through, you may discover that you want to extract other pieces of the page, such as: page title, description, meta open graph tags, etc…

## Integration

Wrapping around where you call React's render function, you'll reset the component list and then extract component trees.


```js
var PageParts = require('react-page-parts');
PageParts.reset();
var app = React.renderToString(React.createElement(App));
var meta = React.renderToStaticMarkup(React.createElement('head', null, React.addons.createFragment(
  PageParts.get('meta')
)));
```

In your component:

```jsx
var React = require('react');

var CoffeeShop = React.createClass({
  mixins: [require('react-page-parts').PageParts],
  meta: function () {
    return [
      <title>Coffee Shop</title>,
      <meta name="description" content="Coffe is delish">
    ];
  }
});
```