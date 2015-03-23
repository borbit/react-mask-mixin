# react-mask-mixin

![gif](http://g.recordit.co/nKufU2TKCj.gif)

Input mask for text input.

[Example](http://borbit.github.io/react-mask-mixin/)

### Install with npm
```
npm install react-mask-mixin
```

## Usage
The goal I wanted to reach in the very beginning was to make basic `<input/>` element understand custom property `mask` which would define strict format for user input (for example date or phone number). Somewhat, I thought that `LinkedStateMixin`, from `React.addons`, made input elements understand `valueLink` property (that looks like custom at the first glance) and I naively believed that it was possible to write similar solution. After several minutes of digging into React source code it turned out that `valueLink` was a part of `<input/>` and `<textarea/>` implementation and `LinkedStateMixin` just utilized it. Now I wander if there is a case when `valueLink` can be used without `LinkedStateMixin`.

### Solution:

1. Wrap `<input/>` with custom component
2. Add `react-mask-mixin` into `mixins` array
3. Spread `this.mask.props` over the `<input/>`

Mixin polutes your component scope with `mask` object where It keeps eveithing needed. `mask.props` consists of several event handlers and `value` prop that you should necessarily spread over the `<input/>` element in order to enable masking.

As a code it would look like this:
```javascript
var React = require('react/addons')
var ReactMaskMixin = require('react-mask-mixin')

var Input = React.createElement({
  mixins: [ReactMaskMixin],
  render(): {
    return <input {...this.props} {...this.mask.props}/>
  }
})

var Component = React.createElement({
  render(): {
    return <Input mask="99/99/99"/>
  }
})

React.render(<Component/>, document.body)
```

### Masking definitions

- `9` - numeric
- `A` - alphabetical
- `*` - alphanumeric

## Tests

react-mask-mixin is covered by [Mocha](http://mochajs.org/) tests. To run tests just open `test/test.html` in a browser.

## License 

react-mask-mixin may be freely distributed under the [MIT license](http://en.wikipedia.org/wiki/MIT_License#License_terms).

Copyright (c) 2015 Serge Borbit &lt;serge.borbit@gmail.com&gt;
