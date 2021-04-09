const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
}

function toCelsius(fah) {
  return (fah - 32) * 5 / 9
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5)+32
}

function BoilingVerdict ({celsius}) {
  return <div className={celsius >= 100 ? 'alert alert-danger' : 'alert alert-success'}>
    {celsius >= 100 ? "L'eau bout" : "L'eau ne bout pas"}
  </div>
}

class TempInp extends React.Component {

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.props.onTempChange(parseFloat(e.target.value) || 0)
  }

  render() {
    const {scale, temp} = this.props
    const label = scaleNames[scale]
    return <div className="form-group">
      <label htmlFor={'temp-' + scale}>Temperature en ({label})</label>
      <input type="text" id={'temp-' + scale} value={temp} onChange={this.handleChange} className="form-control"/>
    </div>
  }
}


class Calculator extends React.Component {

  constructor(props) {
    super(props)
    this.state = {celsius: 20}
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this)
    this.handleFarenheitChange = this.handleFarenheitChange.bind(this)
  }

  handleCelsiusChange (celsius) {
    this.setState({celsius})
  }

  handleFarenheitChange(fah) {
    this.setState({celsius: toCelsius(fah)})
  }

  render() {
    const {celsius} = this.state
    const fahrenheit = toFahrenheit(celsius)
    return <React.Fragment>
      <TempInp scale="c" temp={celsius} onTempChange={this.handleCelsiusChange}/>
      <TempInp scale="f" temp={fahrenheit} onTempChange={this.handleFarenheitChange} />
      <BoilingVerdict celsius={celsius}/>
    </React.Fragment>
  }
}

ReactDOM.render(<Calculator />, document.getElementById('app'))
