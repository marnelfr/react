const scaleName = {
  c: 'Celsius',
  f: 'Fahrenheit'
}

function toCelsius(temperature) {
  return (temperature - 32) * (5/9)
}

function toFahrenheit(temperature) {
  return (temperature * (9/5)) + 32
}

function BoilingVedict({celsius}) {
  return <div className={celsius > 100 ? 'text-center alert alert-danger' : 'text-center alert alert-success'}>
    {celsius > 100 ? 'The water would boil' : 'The water wouldn\'t boil'}
  </div>
}

function Input({name, value, onChange, children}) {
  return <div className="form-group">
    <label htmlFor={name}>{children}</label>
    <input type="text" name={name} id={name} value={value} onChange={onChange} className="form-control"/>
  </div>
}


class TempInput extends React.Component {

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value)
  }

  render() {
    const name = 'scale' + this.props.scale
    return <Input name={name} value={this.props.temperature} onChange={this.handleChange}>{scaleName[this.props.scale]}</Input>
  }

}

class Calculator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      celsius: 20,
      scale: 'c'
    }
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this)
    this.handleFarenheitChange = this.handleFarenheitChange.bind(this)
  }

  handleCelsiusChange(temperature) {
    this.setState({celsius: temperature, scale: 'c'})
  }

  handleFarenheitChange(temperature) {
    this.setState({celsius: temperature, scale: 'f'})
  }

  render() {
    const celsius = this.state.scale === 'c' ? this.state.celsius : toCelsius(this.state.celsius)
    const farenheit = this.state.scale === 'f' ? this.state.celsius : toFahrenheit(this.state.celsius)
    return <React.Fragment>
      <TempInput scale="c" onTemperatureChange={this.handleCelsiusChange} temperature={celsius} />
      <TempInput scale="f" onTemperatureChange={this.handleFarenheitChange} temperature={farenheit} />
      <BoilingVedict celsius={this.state.celsius}/>
    </React.Fragment>
  }
}
ReactDOM.render(<Calculator/>, document.querySelector('#app'))