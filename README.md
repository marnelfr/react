## Learning REACT

### state
It's the main property of components tracked by react to rerun the **render** method. If its value wants to be change and depend of it's previous value or the value of one of the *Component's properties* value, the change is done through a method.�

### Changed html attributes
- for => htmlFor
- class => className
- value => defaultValue *(value still exists but is used for react controlled's field)*

### Changes for html tags
- **textarea:** has the attribute *value*
- **select:** has the attribute *value*, we can have select with **multiple** attribute if needed. In this case, its *value* will be an array.

### About the *SyntheticEvent*
From an syntheticEvent,
- **e.target** returns the component concerned by the event
- **e.target.value** returns the current value of the component
- **e.target.selectedOptions** returns the list of selected options of an *select* with the *multiple* attribute. To get these value, we could do some thing like
`Array.from(e.target.selectedOptions).map(o => o.value)`
- **e.target.checked** returns the value of a checkbox (*true* or *false*)


### About the *componentWillUnmount* event
- It's called when the component is about to be destroyed\
- `this.setState()` should not be used here 

### About React controlled's field
- To make an input controlled by react, we just have to define the `value` attribute of the input
- They make the state change on every input's change and this recall render. Shouldn't be abused
- Instead of react controlled's field, we can use default input and the get they value on the submit (for example)
- To defined the default value for these input, use `defaultValue` instead of `value` or use `value={undefined}`
- Default input only exist after the first call of `render()`. They can then only be accessed in a later method.
- Instead of select default input directly from the VirtualDOM every time, we can initialised to null their container in the constructor and affect once to those container, the default input target

