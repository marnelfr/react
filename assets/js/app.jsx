function WelcomeFunc(props) {
  return <h1>Bonjour {props.name}</h1>
}

class Welcome extends React.Component {


  render() {
    return <React.Fragment>
      <h1>
        {this.props.name}
      </h1>
      <span>{this.props.children}</span>
    </React.Fragment>
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
    this.setState((state, props) => ({date: new Date()}))
  }

  render() {
    return <p>
      Nous sommes le {this.state.date.toLocaleDateString()} et il est {this.state.date.toLocaleTimeString()}
    </p>
  }
}

class Timer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {second: 0, paused: false, timer: null}
    this.pause = this.pause.bind(this)
    this.clear = this.clear.bind(this)
  }

  componentDidMount() {
    this.startTimer()
  }

  componentwillUnmount() {
    window.clearInterval(this.timer)
  }

  seconder() {
    this.setState((state, props) => ({second: ++state.second}))
  }

  startTimer() {
    this.setState((state, props) => ({timer: window.setInterval(this.seconder.bind(this), 1000)}))
  }

  stopTimer() {
    this.setState((state, props) => {
      window.clearInterval(state.timer)
      return {timer: null}
    })
  }

  clear(e) {
    e.preventDefault()
    this.stopTimer()
    this.state.second = 0
    this.startTimer()
  }

  pause(e) {
    e.preventDefault()
    this.setState((state, props) => {
      if (!state.paused) {
        this.stopTimer()
      } else {
        this.startTimer()
      }
      return {paused: !state.paused}
    })
  }

  render() {
    return <div>
      <p>
        Vous êtes sur la page depuis {this.state.second} secondes
      </p>
      <button onClick={this.pause}>{this.state.paused ? 'Play' : 'Pause'}</button>
      <button onClick={this.clear}>Clear</button>
    </div>
  }

}


class Home extends React.Component {

  render() {
    return <React.Fragment>
      <Welcome name={this.props.name}/>
      <Clock />
      <Timer />
    </React.Fragment>
  }

}

ReactDOM.render(<Home name={"Jean"}>Soyez les bienvenu</Home>, document.getElementById('app'))