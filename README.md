# react-mask-mixin

Input mask for text input.

[Example](http://borbit.github.io/react-mask-mixin/)

### Install with npm
```
npm install react-mask-mixin
```

## Usage
Task that I wanted to complete in the very beginning was to make basic `React.DOM.input` element understand a custom property `mask` which would define a strict format for user input (for example date or phone number). Somewhat, I thought that `LinkedStateMixin`, from `React.addons`, made input elements understand `valueLink` property (that looks like custom at the first glance) and I naively believed that it was possible to write similar solution. After several minutes of digging into React source code it turned out that `valueLink` was a part of `React.DOM.input` and `React.DOM.textarea` implementation and `LinkedStateMixin` just utilized it. Now I wander if there is a case when `valueLink` can be used without conjunction with `LinkedStateMixin` and I haven't found any so far.
