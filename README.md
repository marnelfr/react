## Learning REACT

## Changed html attributes
- for => htmlFor
- class => className
- value => defaultValue *(value still exists but is used for react controlled's field)*

## Changes for html tags
- **textarea:** has the attribute *value*
- **select:** has the attribute *value*, we can have select with **multiple** attribute if needed. In this case, its *value* will be an array.

## About the *SyntheticEvent*
From an syntheticEvent,
- **e.target** returns the component concerned by the event
- **e.target.value** returns the current value of the component
- **e.target.selectedOptions** returns the list of selected options of an *select* with the *multiple* attribute. To get these value, we could do some thing like
`Array.from(e.target.selectedOptions).map(o => o.value)`
- **e.target.checked** returns the value of a checkbox (*true* or *false*)


## About the componentWillUnmount event
- It's called when the component is about to be destroyed\
- `this.setState()` should not be used here 

## About React controlled's field
- To make an input controlled by react, we just have to define the `value` attribute of the input
- They make the state change on every input's change and this recall render. Shouldn't be abused
- Instead of react controlled's field, we can use default input and the get they value on the submit (for example)
- To defined the default value for these input, use `defaultValue` instead of `value` or use `value={undefined}`
- Default input only exist after the first call of `render()`. They can then only be accessed in a later method.
- Instead of select default input directly from the VirtualDOM every time, we can initialised to null their container in the constructor and affect once to those container, the default input target

## Communication between two components
To make two siblings components communicate, they should'nt define their own state. The state should be set on a component that hold these two thus their closest parent component.

## Attributes and their method
For an `action`, the html attribute should be called `onAction` and the method executed, `handleAction`\
E.g.: 
- onClick => handleClick 
- onChange => handleChange
- onMouseOver => handleMouseOver
- onOpacityChange => handleOpacityChange

## State
It's the main property of components tracked by react to rerun the **render** method. If its value wants to be change and depends of it's previous value or the value of one of the *Components' properties* value, the change is done through a method.\
The *stride operator* help us to create a component from another with all of its props.\
To know if a data manage by our application is a state or just a props, we should ask ourselves, these questions about each of them:
- Is it passed in from a parent via props? If so, it probably isn't state.
- Does it remain unchanged over time? If so, it probably is'nt state.
- Can you compute it based on any other state or props in your component? If so, it isn't state.

### Where state are declared
For each piece of state in your application:
- Identify every component that renders something based on that state.
- Find a common owner component (a single component above all the components that need the state in the hierarchy).
- Either the common owner or another component higher up in the hierarchy should own the state.
- If you can’t find a component where it makes sense to own the state, create a new component solely for holding the state and add it somewhere in the hierarchy above the common owner component.

## Pure component
Used if the component's render() functioin renders the same result given the same props and state. They implement shouldComponentUpdate() method.
- const MyPureComponent = React.memo(MyComponent)
- class MyPureComponent extends React.PureComponent\

You better use **[...items, newItem]** or **[newItem, ...items]** or **{...object, newProperty: value}** or **{newProperty: val, ...object}** (I mean never mute element in props or state) while using pure components and **never define callback directly in their attributes**.

## Ref
They are create using `this.input = this.createRef()` in the constructor and then pass to the node doing `ref={this.input}`.\
The node can then be retrieve using `this.input.current`. Always check if it's not `null` before using it.
Should only be used to make our component's node communicate with tiers library or only with **not controlled fields**\
`React.forwardRef(MyComponent)` allow us to pass ref from a parent component.

## Create-React-App
In order to facilitate the development using react, we can use its modern build setup with no configuration.
It can be installed with the command `npx create-react-app my-app` 

## Parcel
In addition to create-react-app, we can also use parcel to facilitate our development using react or any other library.
To add it to our project, we've got to install it with the command: 
- `yarn init [-y]`
- `yarn add -D parcel-bundler` or `yarn add -D parcel@next` for the version 2.0.0 that have the fast refresh that's done without making our components loosing they state
- `npx parcel index.html` - For development
- `npx parcel build index.html` - For production

Here, `index.html` is our entry point.

## Next step
For the remaining lessons, I'm going to use the react modern build setup locate on the repository [marnelfr/react-app](https://github.com/marnelfr/react-app)
