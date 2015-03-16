// dummy component
var InputComponent = React.createClass({
  mixins: [ReactMaskMixin],
  render: function() {
    return React.DOM.input(_.assign({}, this.props, this.mask.props))
  }
})

// shortcut
var TestUtils = React.addons.TestUtils
// shortcut
var Input = function(props) {
  return TestUtils.renderIntoDocument(React.createElement(InputComponent, props)).getDOMNode()
}

describe('dummy component', function() {
  it('should transfer all given props to the real input element', function() {
    var type = 'text'
    var value = 'value'
    var input = Input({value: value, type: type})
    expect(input.value).to.be(value)
    expect(input.type).to.be(type)
  })
})

describe('react-mask-mixin — mask behaviour with no input', function() {
  it('should display mask when input is focused #1', function() {
    var input = Input({mask: "999"})
    TestUtils.Simulate.focus(input)
    expect(input.value).to.be('___')
  })

  it('should display mask when input is focused #2', function() {
    var input = Input({mask: "999-999"})
    TestUtils.Simulate.focus(input)
    expect(input.value).to.be('___-___')
  })

  it('should display mask when input is focused #3', function() {
    var input = Input({mask: "AAA-(999)"})
    TestUtils.Simulate.focus(input)
    expect(input.value).to.be('___-(___)')
  })

  it('should remove mask when input is blured #1', function() {
    var input = Input({mask: "999-999-AAA"})
    TestUtils.Simulate.focus(input)
    TestUtils.Simulate.blur(input)
    expect(input.value).to.be('')
  })

  it('should remove mask when input is blured #2', function() {
    var input = Input({mask: "$99.99"})
    TestUtils.Simulate.focus(input)
    TestUtils.Simulate.blur(input)
    expect(input.value).to.be('')
  })
})

describe('react-mask-mixin — mask behaviour with input', function() {
  it('should replace mask with user input #1', function() {
    var input = Input({mask: "999"})
    TestUtils.Simulate.change(input, {target: {value: '1___'}})
    expect(input.value).to.be('1__')
  })

  it('should replace mask with user input #1', function() {
    var input = Input({mask: "999-999"})
    TestUtils.Simulate.change(input, {target: {value: '11__--___'}})
    expect(input.value).to.be('11_-___')
  })
  
  it('should replace mask with user input #2', function() {
    var input = Input({mask: "99[9-9]99"})
    TestUtils.Simulate.change(input, {target: {value: '11[1-1_]__'}})
    expect(input.value).to.be('11[1-1]__')
  })
  
  it('should replace mask with user input #3', function() {
    var input = Input({mask: "999999"})
    TestUtils.Simulate.change(input, {target: {value: '11BB___'}})
    expect(input.value).to.be('11____')
  })
  
  it('should replace mask with user input #4', function() {
    var input = Input({mask: "$AAAAA"})
    TestUtils.Simulate.change(input, {target: {value: '$FF000_'}})
    expect(input.value).to.be('$FF___')
  })
  
  it('should replace mask with user input #5', function() {
    var input = Input({mask: "999-999"})
    TestUtils.Simulate.change(input, {target: {value: '111-1'}})
    expect(input.value).to.be('111-1__')
  })

  it('should replace mask with user input #6', function() {
    var input = Input({mask: "999-999"})
    TestUtils.Simulate.change(input, {target: {value: '12-456'}})
    expect(input.value).to.be('124-56_')
  })

  it('should replace mask with user input #7', function() {
    var input = Input({mask: "999"})
    TestUtils.Simulate.change(input, {target: {value: '111___'}})
    expect(input.value).to.be('111')
  })
  
  it('should replace mask with user input #8', function() {
    var input = Input({mask: "999-999"})
    TestUtils.Simulate.change(input, {target: {value: '111111'}})
    expect(input.value).to.be('111-111')
  })
  
  it('should replace mask with user input #9', function() {
    var input = Input({mask: "AAA-AAA"})
    TestUtils.Simulate.change(input, {target: {value: 'BBBB11'}})
    expect(input.value).to.be('BBB-B__')
  })

  it('should remove mask only when input is blured', function() {
    var input = Input({mask: "AAA-999-AAA"})
    TestUtils.Simulate.focus(input)
    input.setSelectionRange(6, 6)
    TestUtils.Simulate.keyDown(input)
    TestUtils.Simulate.change(input, {target: {value: 'BBB-11_-___'}})
    TestUtils.Simulate.blur(input)
    expect(input.value).to.be('BBB-11')
  })
})


describe('react-mask-mixin — coursor behaviour', function() {
  it('should move cursor to the beginning when input is focused #1', function() {
    var input = Input({mask: "999-999"})
    TestUtils.Simulate.focus(input)
    expect(input.selectionStart).to.be(0)
  })

  it('should move cursor to the beginning when input is focused #2', function() {
    var input = Input({mask: "$99.99"})
    TestUtils.Simulate.focus(input)
    expect(input.selectionStart).to.be(1)
  })

  it('should move cursor to the end of user input #1', function() {
    var input = Input({mask: "999-999"})
    TestUtils.Simulate.focus(input)
    input.setSelectionRange(2, 2)
    TestUtils.Simulate.keyDown(input)
    TestUtils.Simulate.change(input, {target: {value: '11_-___'}})
    expect(input.selectionStart).to.be(2)
  })

  it('should move cursor to the end of user input #2', function() {
    var input = Input({mask: "999-999"})
    TestUtils.Simulate.focus(input)
    input.setSelectionRange(6, 6)
    TestUtils.Simulate.keyDown(input)
    TestUtils.Simulate.change(input, {target: {value: '111-11_'}})
    expect(input.selectionStart).to.be(6)
  })

  it('should move cursor to the end of user input #3', function() {
    var input = Input({mask: "999-999"})
    TestUtils.Simulate.focus(input)
    input.setSelectionRange(3, 3)
    TestUtils.Simulate.keyDown(input)
    TestUtils.Simulate.change(input, {target: {value: '111-___'}})
    expect(input.selectionStart).to.be(3)
  })

  it('should move cursor to the end of user input #4', function() {
    var input = Input({mask: "999-999"})
    TestUtils.Simulate.focus(input)
    input.setSelectionRange(1, 1)
    TestUtils.Simulate.keyDown(input)
    TestUtils.Simulate.change(input, {target: {value: '1_-___'}})
    expect(input.selectionStart).to.be(1)
  })

  it('should move cursor to the end of user input #5', function() {
    var input = Input({mask: "999-999"})
    TestUtils.Simulate.focus(input)
    input.setSelectionRange(3, 3)
    TestUtils.Simulate.keyDown(input)
    TestUtils.Simulate.change(input, {target: {value: '111___'}})
    expect(input.selectionStart).to.be(3)
  })

  it('should move cursor to the end of user input #6', function() {
    var input = Input({mask: "999-999"})
    TestUtils.Simulate.focus(input)
    
    input.setSelectionRange(7, 7)
    TestUtils.Simulate.keyDown(input)
    TestUtils.Simulate.change(input, {target: {value: '111-111'}})

    input.setSelectionRange(6, 6)
    TestUtils.Simulate.change(input, {target: {value: '111-11'}})
    
    expect(input.selectionStart).to.be(6)
  })

  it('should not move cursor if it is in the middle of user input', function() {
    var input = Input({mask: "999999"})
    TestUtils.Simulate.focus(input)
    TestUtils.Simulate.change(input, {target: {value: '111111'}})
    input.setSelectionRange(4, 4)
    TestUtils.Simulate.keyDown(input)
    TestUtils.Simulate.change(input, {target: {value: '1234567'}})
    expect(input.selectionStart).to.be(4)
  })

  it('should move cursor to an available position if it is in the middle of user input #1', function() {
    var input = Input({mask: "999-999"})
    TestUtils.Simulate.focus(input)
    
    input.setSelectionRange(2, 2)
    TestUtils.Simulate.keyDown(input)
    TestUtils.Simulate.change(input, {target: {value: '111-111'}})
    
    input.setSelectionRange(4, 4)
    TestUtils.Simulate.change(input, {target: {value: '1112-111'}})
    
    expect(input.selectionStart).to.be(5)
  })

  it('should move cursor to an available position if it is in the middle of user input #2', function() {
    var input = Input({mask: "999-999"})
    TestUtils.Simulate.focus(input)
    
    input.setSelectionRange(5, 5)
    TestUtils.Simulate.keyDown(input)
    TestUtils.Simulate.change(input, {target: {value: '111-111'}})

    input.setSelectionRange(4, 4)
    TestUtils.Simulate.change(input, {target: {value: '111-11'}})

    expect(input.selectionStart).to.be(3)
  })

  it('should move cursor to an available position if it is in the middle of user input #3', function() {
    var input = Input({mask: "999999"})
    TestUtils.Simulate.focus(input)
    
    input.setSelectionRange(4, 4)
    TestUtils.Simulate.keyDown(input)
    TestUtils.Simulate.change(input, {target: {value: '111111'}})

    input.setSelectionRange(5, 5)
    TestUtils.Simulate.change(input, {target: {value: '1111111'}})
    
    expect(input.selectionStart).to.be(5)
  })

  it('should move cursor to an available position if it is in the middle of user input #4', function() {
    var input = Input({mask: "999999"})
    TestUtils.Simulate.focus(input)
    
    input.setSelectionRange(5, 5)
    TestUtils.Simulate.keyDown(input)
    TestUtils.Simulate.change(input, {target: {value: '111111'}})

    input.setSelectionRange(4, 4)
    TestUtils.Simulate.change(input, {target: {value: '11111'}})
    
    expect(input.selectionStart).to.be(4)
  })

  it('should move cursor to an available position if it is in the middle of user input #5', function() {
    var input = Input({mask: "999-999"})
    TestUtils.Simulate.focus(input)
    
    input.setSelectionRange(2, 2)
    TestUtils.Simulate.keyDown(input)
    TestUtils.Simulate.change(input, {target: {value: '111-111'}})

    input.setSelectionRange(3, 3)
    TestUtils.Simulate.change(input, {target: {value: '1121-111'}})
    
    expect(input.selectionStart).to.be(3)
  })

  it('should move cursor to an available position if it is in the middle of user input #6', function() {
    var input = Input({mask: "999---999"})
    TestUtils.Simulate.focus(input)
    
    input.setSelectionRange(3, 3)
    TestUtils.Simulate.keyDown(input)
    TestUtils.Simulate.change(input, {target: {value: '111---111'}})

    input.setSelectionRange(4, 4)
    TestUtils.Simulate.change(input, {target: {value: '1112---111'}})
    
    expect(input.selectionStart).to.be(7)
  })

  it('should move cursor to an available position if it is in the middle of user input #7', function() {
    var input = Input({mask: "999---999"})
    TestUtils.Simulate.focus(input)
    
    input.setSelectionRange(7, 7)
    TestUtils.Simulate.keyDown(input)
    TestUtils.Simulate.change(input, {target: {value: '111---111'}})

    input.setSelectionRange(6, 6)
    TestUtils.Simulate.change(input, {target: {value: '111---11'}})
    
    expect(input.selectionStart).to.be(3)
  })

  it('should move cursor to an available position if it is in the middle of user input #8', function() {
    var input = Input({mask: "---999---999---"})
    TestUtils.Simulate.focus(input)
    
    input.setSelectionRange(3, 3)
    TestUtils.Simulate.keyDown(input)
    TestUtils.Simulate.change(input, {target: {value: '---111---111---'}})

    input.setSelectionRange(2, 2)
    TestUtils.Simulate.change(input, {target: {value: '--111---11---'}})
    
    expect(input.selectionStart).to.be(3)
  })
})