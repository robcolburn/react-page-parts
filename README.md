# react-page-parts

A way to extract other parts page, such as meta tags, from a React app.

When building a React app with data pumping through, you may discover that you want to extract other pieces of the page, such as: page title, description, meta open graph tags, etc…

## Integration

Wrapping around where you call React's render function, you'll reset the component list and then extract component trees.


```js

        PageParts.reset();
        var app = React.renderToString(React.createElement(App));
        var meta = React.renderToStaticMarkup(React.createElement('head', null, React.addons.createFragment(
          PageParts.get('meta')
        )));
```
