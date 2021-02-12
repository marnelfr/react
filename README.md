## Learning REACT

### state
It's the main property of components tracked by react to rerun the **render** method. If its value wants to be change and depend of it's previous value or the value of one of the *Component's properties* value, the change is done through a method.²

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
