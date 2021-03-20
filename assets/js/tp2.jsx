const data = [
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

function Container({col, children}) {
  const offset = (12-col)/2
  return <div className="container mt-4">
    <div className="row">
      <div className={'border col-12 col-sm-10 col-md-' + col + ' offset-sm-1 offset-md-' + offset}>
        {children}
      </div>
    </div>
  </div>
}

function Input({type, id, placeholder, val, onChange, children}) {
  placeholder = placeholder || ''
  return <div className="form-group">
    {children ? <label htmlFor={id}>{children}</label> : null}
    <input type={type} id={id} value={val} placeholder={placeholder} onChange={onChange} className="form-control mt-2"/>
  </div>
}

function TextInput({id, placeholder, val, onChange}) {
  return <Input type="text" id={id} value={val} placeholder={placeholder} onChange={onChange}/>
}

function CheckBox({id, val, onChange, children}) {
  return <div className="text-center">
    <div className="form-group">
      <input type="checkbox" checked={val} id={id} onChange={onChange} className="form-check-input" />
      <label htmlFor={id} className="form-check-label">{children}</label>
    </div>
  </div>
}

class Home extends React.Component {

  constructor(props) {
    super(props)
    this.state = {searchKey: '', onlyStocked: false}
    this.handleSearch = this.handleSearch.bind(this)
    this.showOnlyStocked = this.showOnlyStocked.bind(this)
  }

  handleSearch(e) {
    this.setState({searchKey: e.target.value.trim()})
  }

  showOnlyStocked(e) {
    this.setState({onlyStocked: e.target.checked})
  }

  render() {
    return <Container col="6">
      <TextInput id="search" placeholder="Search..." value={this.state.searchKey} onChange={this.handleSearch} />
      <CheckBox id="stocked" value={this.state.onlyStocked} onChange={this.showOnlyStocked}>Only show products in stock</CheckBox>
    </Container>
  }

}


ReactDOM.render(<Home/>, document.querySelector('#app'))
