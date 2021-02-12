function Input({name, value, type, onChange, children}) {
    return <div className="form-group">
      <label htmlFor={name}>{children}</label>
      <input type={type} value={value} name={name} id={name} onChange={onChange} className="form-control" />
    </div>
}

function Check({name, value, type, onChange, children}) {
  return <div className="form-check">
    <input type={type} checked={value} name={name} id={name} onChange={onChange} className="form-check-input" />
    <label htmlFor={name} className="form-check-label">{children}</label>
  </div>
}

class Forms extends React.Component {

  constructor(props) {
    super(props)
    this.init = {
      nom: '',
      prenom: '',
      sexe: '',
      tel: '+229 ',
      newsLetter: false
    }
    this.state = this.init
    this.handleBlur = this.handleBlur.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const name = e.target.name
    const type = e.target.type
    const value = type === 'checkbox' ? e.target.checked : e.target.value
    this.setState((state, props) => ({[name]: value}))
  }

  handleBlur(e) {

  }

  handleSubmit(e) {
    e.preventDefault()
    this.setState((state, props) => this.init)
  }

  render() {
    return <div className="container">
      <form onSubmit={this.handleSubmit}>
        <Input name="nom" value={this.state.nom} type="text" onChange={this.handleChange}>Nom</Input>
        <Input name="prenom" value={this.state.prenom} type="text" onChange={this.handleChange}>Prénom</Input>
        <Input name="tel" value={this.state.tel} type="tel" onChange={this.handleChange}>Téléphone</Input>
        <Check name="newsLetter" value={this.state.newsLetter} type="checkbox" onChange={this.handleChange}>S'abonner au newsLetter</Check>
        <button className="btn btn-primary">Envoyer</button>
      </form>
      {JSON.stringify(this.state)}
    </div>
  }

}


ReactDOM.render(<Forms />, document.getElementById('app'))