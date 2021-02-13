function Input({name, id, value, onChange, children}) {
  return <div className="form-group">
    <label htmlFor={id}>{children}</label>
    <input type="text" name={name} id={id} value={value} onChange={onChange} className="form-control" />
  </div>
}

class Home extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      celsius: 0,
      fahrenheit: 0,
      text: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    const name = e.target.name
    this.setState({
      [name]: e.target.value === undefined ? 0 : e.target.value
    })
    this.calculator()
  }

  calculator() {
    this.setState((state, props) => {
      state.fahrenheit = (state.celsius * (9/5)) + 32
      if (state.celsius < 10) {
        state.text = 'Eau froid'
      } else if(state.celsius < 100) {
        state.text = 'Eau tiède'
      } else {
        state.text = 'Eau bouillande'
      }
      return state
    })
  }

  render() {
    return <div className="container">
      <Input name="celsius" id="celsius" value={this.state.celsius} onChange={this.handleChange}>Celsius</Input>
      <Input name="fahrenheit" id="fahrenheit" value={this.state.fahrenheit}>Fahrenheit</Input>
      <textarea name="text" id="text" className="form-control" value={this.state.text}></textarea>
    </div>
  }

}


ReactDOM.render(<Home />, document.querySelector('#app'))