// react-mask-mixin
// http://github.com/borbit/react-mask-mixin
// Copyright (c) 2015 Serge Borbit
// Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
// Version: 0.0.5
(function(root) {

var MASK_REGEX = {
  '9': /\d/,
  'A': /[A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]/,
  '*': /[\dA-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]/
}

var MASK_CHARS = Object.keys(MASK_REGEX)
var PTRN_REGEX = new RegExp('[' + MASK_CHARS.join(',') + ']', 'g')

var ReactMaskMixin = {
  componentWillMount: function() {
    this.mask = {
      props: {
        value: this.props.value,
        onClick: this._onClick,
        onChange: this._onChange,
        onKeyDown: this._onKeyDown,
        onFocus: this._onFocus,
        onBlur: this._onBlur
      },
      empty: true,
      cursorPrev: 0,
      cursor: 0
    }

    if (this.props.value && this.props.mask) {
      this.processValue(this.props.value)
    }
  },

  componentDidUpdate: function() {
    var input = this.getDOMNode();
    
    if (input === document.activeElement) {
      input.setSelectionRange(
        this.mask.cursor,
        this.mask.cursor
      )
    }
  },

  processValue: function(value) {
    var mask = this.props.mask
    var pattern = mask.replace(PTRN_REGEX, '_')
    var rexps = {}

    mask.split('').forEach(function(c, i) {
      if (~MASK_CHARS.indexOf(c)) {
        rexps[i+1] = MASK_REGEX[c]
      }
    })

    var cursorMax = 0
    var cursorMin = 0
    var newValue = ''
    var nextChar

    for (i = 0; i < mask.length; i++) {
      if (~MASK_CHARS.indexOf(mask[i])) {
        cursorMin = i
        break
      }
    }

    for (var i = 0, j = 0; i < mask.length;) {
      if (!~MASK_CHARS.indexOf(mask[i])) {
        newValue += mask[i]
        if (mask[i] == value[j]) {
          j++
        }
        i++
      } else {
        if (nextChar = value.substr(j++, 1)) {
          if (rexps[newValue.length+1].test(nextChar)) {
            newValue += nextChar
            cursorMax = newValue.length
            i++
          }
        } else {
          newValue = newValue.substr(0, cursorMax)
          newValue += pattern.slice(cursorMax)
          break
        }
      }
    }

    var cursorPrev = this.mask.cursor
    var cursorCurr = this.isMounted() ? this.getDOMNode().selectionStart : 0
    var removing = this.mask.cursor > cursorCurr
    cursorMax = Math.max(cursorMax, cursorMin)

    if (cursorCurr <= cursorMin) {
      cursorCurr = cursorMin
    } else if (cursorCurr >= cursorMax) {
      cursorCurr = cursorMax
    } else if (removing) {
      for (var i = cursorCurr; i >= 0; i--) {
        cursorCurr = i
        if (rexps[i] && !rexps[i+1]) break
        if (rexps[i] && rexps[i+1] && rexps[i+1].test(newValue[i])) {
          break
        }
      }
    } else {
      for (var i = cursorCurr; i <= cursorMax; i++) {
        cursorCurr = i
        if (!rexps[i+1] && rexps[i]) break
        if (rexps[i+1] && rexps[i+1].test(newValue[i])) {
          if (!rexps[i]) {
            cursorCurr++
          }
          break
        }
      }
    }

    this.mask.empty = cursorMax == cursorMin
    this.mask.props.value = newValue
    this.mask.cursor = cursorCurr
  },

  _onBlur: function(e) {
    if (this.props.mask) {
      var cursor = this.mask.cursor
      var value = this.mask.props.value

      if (!this.mask.empty) {
        this.mask.props.value = value.substr(0, cursor)
      } else {
        this.mask.props.value = ''
      }

      this.forceUpdate()
    }
    if (this.props.onBlur) {
      this.props.onBlur(e)
    }
  },

  _onChange: function(e) {
    if (this.props.mask) {
      this.processValue(e.target.value)
      e.target.value = this.mask.props.value
      this.forceUpdate()
    }
    if (this.props.onChange) {
      this.props.onChange(e)
    }
  },

  _onKeyDown: function(e) {
    if (this.props.mask) {
      this.mask.cursor = this.getDOMNode().selectionStart
    }
    if (this.props.onKeyDown) {
      this.props.onKeyDown(e)
    }
  },

  _onFocus: function(e) {
    this._onChange(e)
    if (this.props.onFocus) {
      this.props.onFocus(e)
    }
  },

  _onClick: function(e) {
    this._onChange(e)
    if (this.props.onClick) {
      this.props.onClick(e)
    }
  }
}

// Export ReactMaskMixin for CommonJS. If being loaded as an
// AMD module, define it as such. Otherwise, just add
// `ReactMaskMixin` to the global object
if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = ReactMaskMixin;
  }
  exports.ReactMaskMixin = ReactMaskMixin;
} else if (typeof define === 'function' && define.amd) {
  // Return the ReactMaskMixin as an AMD module:
  define([], function() {
    return ReactMaskMixin;
  });
} else {
  // Declare `ReactMaskMixin` on the root (global/window) object:
  root['ReactMaskMixin'] = ReactMaskMixin;
}

})(this)