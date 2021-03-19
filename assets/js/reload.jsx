class Welcome extends React.Component {

  render() {
    return <h1>
      Welcome {this.props.name}
    </h1>
  }

}

class ManualIncrementor extends React.Component {

  constructor(props) {
    super(props)
    this.state = {n: props.num || 1, step: props.step || 1}
    this.increment = this.increment.bind(this)
  }

  increment(e) {
    e.preventDefault()
    this.setState((state, props) => ({n: state.n + props.step}))
  }

  render() {
    return <div>
      Valeur actuelle: {this.state.n} <button className="btn btn-outline-primary" onClick={this.increment}>Increment</button>
    </div>
  }
}

class Incrementor extends React.Component {
  constructor(props) {
    super(props)
    this.timer = null
    this.state = {num: props.num || 0, step: props.step || 1, play: true}

    this.init = this.init.bind(this)
    this.pause = this.pause.bind(this)
    this.increment = this.increment.bind(this)
  }

  componentDidMount() {
    this.setUpIncrementor()
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  increment() {
    this.setState((state, props) => ({num: state.num+props.step}))
  }

  pause(e) {
    e.preventDefault()
    if (this.state.play) {
      clearInterval(this.timer)
      this.state.play = false
      e.target.innerText = 'Play'
    } else {
      this.state.play = true
      this.setUpIncrementor()
      e.target.innerText = 'Pause'
    }
  }

  setUpIncrementor() {
    clearInterval(this.timer)
    this.timer = setInterval(this.increment, 1000)
  }

  init() {
    this.setUpIncrementor()
    this.setState((state, props) => ({num: props.num || 0}))
  }

  render() {
    return <p className="p">
      Vous avez déjà passé {this.state.num} sur la page <button className="btn btn-outline-primary" onClick={this.pause}>Pause</button>
      <button className="btn btn-outline-primary" onClick={this.init}>Reinitialiser</button>
    </p>
  }
}

class Field extends React.Component {
  constructor(props) {
    super(props)
    this.state = {val: props.value || ''}
    if (props.checked) {
      this.state.val = props.checked
    }
    this.handleChange = this.handleChange.bind(this)
    this.changer = props.handleChange
    this.type = props.type || 'text'
  }

  handleChange(e) {
    let val = ''
    if (this.type === 'text') {
      val = e.target.value
    } else if (this.type === 'checkbox') {
      val = e.target.checked
    }
    const obj = {}
    obj[this.props.name] = val
    this.changer(obj)
    this.setState({val})
  }

  render() {
    return <div className="form-group">
      <label htmlFor={this.props.name}>{this.props.children}</label>
      <input className="form-control" type={this.type} name={this.props.name} id={this.props.id || this.props.name} onChange={this.handleChange} value={this.state.val}/>
    </div>
  }
}

class Home extends React.Component {

  constructor(props) {
    super(props)
    this.state = {date: new Date(), nom: 'FN', prenom: 'Nel', news: false}
    this.timer = null
    this.tick = this.tick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.alert = this.alert.bind(this)
    this.noon = null
  }

  alert(e) {
    e.preventDefault()
    if (!this.noon) {
      this.noon = document.querySelector('#noon')
    }
    alert(`Vous vous appelez ${this.state.nom + ' ' + 
    this.state.prenom} et ${this.state.news ? 'vous acceptez' : 
      'vous n\'acceptez pas'} la newsletter et la valeur de noon est ${this.noon.value}`)
  }

  componentDidMount() {
    this.timer = setInterval(this.tick, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  tick() {
    this.setState({date: new Date()})
  }

  handleChange(val) {
    console.log(val)
    this.setState(val)
  }

  render() {
    return <React.Fragment>
      <Welcome name="Marnel"/>
      <p>
        Il est {this.state.date.toLocaleTimeString()}
      </p>
      <Incrementor step={10}/>
      <ManualIncrementor num={5} step={10}/>
      <div className="col-md-5">
        <Field name="nom" value={this.state.nom} handleChange={this.handleChange}>Nom</Field>
        <Field name="prenom" value={this.state.prenom} handleChange={this.handleChange}>Prénom</Field>
        <Field name="news" type="checkbox" checked={this.state.news} handleChange={this.handleChange}>Newsletter</Field>
        <input className="form-control" type="text" id="noon"/>
        <button className="btn btn-outline-primary" onClick={this.alert}>Submit</button>
      </div>
    </React.Fragment>
  }

}

ReactDOM.render(<Home/>, document.querySelector('#app'))
