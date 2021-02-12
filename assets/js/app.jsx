function WelcomeFunc({name, children}) {
  return <div>
    <h1>Bonjour {name}</h1>
    <p>{children}</p>
  </div>
}

class Welcome extends React.Component {

  render() {
    return <div>
      <h1>Bonjour {this.props.name}</h1>
      <p>{this.props.children}</p>
    </div>
  }

}

class Clock extends React.Component {

  constructor(props) {
    super(props)
    this.state = {date: new Date()}
    this.timer = null
  }

  componentDidMount() {
    this.timer = window.setInterval(this.tick.bind(this), 1000)
  }

  componentwillUnmount() {
    window.clearInterval(this.timer)
  }

  tick() {
    this.setState({date: new Date()})
  }

  render() {
    return <p>
      Il est {this.state.date.toLocaleString()}
    </p>
  }

}

class Incrementor extends React.Component {

  constructor(props) {
    super(props)
    this.start = Number.parseInt(this.props.start)
    this.state = {start: this.start}
    this.timer = null
  }

  componentDidMount() {
    this.timer = window.setInterval(this.increment.bind(this), 1000)
  }

  componentwillUnmount() {
    window.clearInterval(this.timer)
  }

  increment() {
    this.setState((state, props) => ({start: state.start+props.step}))
  }

  render() {
    return <span>{this.state.start}</span>
  }

}

class Home extends React.Component {

  render() {
    return <div>
      <Welcome name={this.props.name}/>
      <Welcome name={this.props.className}>Voila ce que je disais l'autre jour quand on s'est rencontré</Welcome>
      <Clock />
      <Incrementor start="10" step={5} />
    </div>
  }

}


ReactDOM.render(<Home name="Marnel" className="Jean"/>, document.querySelector('#app'))