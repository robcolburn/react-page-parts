var React = require('react');
var Router = require('react-router');
var PageParts = require('..');
var DOM = React.DOM;

var CoffeeShop = React.createClass({
  mixins: [PageParts.Mixin],
  contextTypes: {
    router: React.PropTypes.func
  },
  getDefaultProps: function () {
    return {
      coffees: [
        {name: 'drip', desc: 'drop'},
        {name: 'expresso', desc: 'energizing'},
        {name: 'mocha', desc: 'yum'},
        {name: 'chai', desc: 'punchy'}
      ]
    };
  },
  getCurrent: function () {
    var name = this.context.router.getCurrentParams().name;
    return this.props.coffees.filter(function (coffee) {
      return coffee.name === name;
    })[0];
  },
  meta: function () {
    var current = this.getCurrent();
    return [
      DOM.meta({charSet: 'utf-8'}),
      DOM.meta({httpEquiv: 'X-UA-Compatible', content: 'IE=edge'}),
      DOM.title(null, (current ? current.name + ': ' : '') + 'Coffee Shop'),
      DOM.meta({name: 'description', content: (current ? current.desc : 'coffeeish')}),
      DOM.link({rel: 'canonical', href: 'https://github.com/robcolburn/react-page-parts'}),
      DOM.meta({property: 'og:type', content: 'object'}),
      DOM.meta({property: 'og:title', content: (current ? current.name : '')})
    ];
  },
  scripts: function () {
    return [
      DOM.script({src: "//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"})
    ];
  },
  detail: function () {
    return {
      hasCats: true,
      name: 'coffee-shop'
    };
  },
  render: function () {
    var current = this.getCurrent();
    var kids = [];
    if (current) {
      kids.push(
        DOM.div({key: 'current'},
          current.name + ' is ' + current.desc
        )
      );
    }
    kids.push(
      DOM.ul({key: 'list'},
        this.props.coffees.map(function (coffee, i) {
          return DOM.li({key: i},
            DOM.a({href: '/'}, coffee.name) 
          );
        })
      )
    );
    return DOM.div({className: 'wrap'}, kids);
  }
});
exports.CoffeeShop = CoffeeShop;

var routes = Route({path:"/", handler: CoffeeShop},
  Route({path:"/:name", handler: CoffeeShop})
);
function Route (params, children) {
  return React.createElement(Router.Route, params, children);
}
exports.routes = routes;
