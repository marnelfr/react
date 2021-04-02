class Filter extends React.Component {

  render() {
    const {value, onChange} = this.props
    return <div className="form-group mb-3">
      <input type="text" value={value} onChange={onChange} placeholder="Filtrer la liste..." className="form-control"/>
    </div>
  }

}

function Check({id, checked, onChange, children}) {
  return <div className="form-group ml-4">
    <input type="checkbox" checked={checked} id={id} className="form-check-input" onChange={onChange}/>
    <label htmlFor={id} className="form-check-label">{children}</label>
  </div>
}

class Product extends React.Component {

  render() {
    const {name, price, stocked} = this.props
    return <div className="col-12 border-bottom">
      <span className={stocked ? null : 'text-danger'}>{name}</span>
      <span className="float-right">${price}</span>
    </div>
  }
}

class ProductList extends React.Component {

  render() {
    return <div className="border">

    </div>
  }

}


class ProductApp extends React.Component {

  constructor(props) {
    super(props)
    const products = [
      {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
      {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
      {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
      {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
      {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
      {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
    ];
    this.state = {filter: '', onlyOnStock: false, products}
    this.handleFilter = this.handleFilter.bind(this)
    this.handleStockProduct = this.handleStockProduct.bind(this)
  }

  handleStockProduct(e) {
    this.setState({onlyOnStock: e.target.checked})
  }

  getProductList(onlyInStock, filter) {
    let list = []
    this.getCategories().forEach((category) => {
      list.push(<div key={category} className="col-12 p-2 font-weight-bold">{category}</div>)
      list = [...list, ...this.state.products.map((product) => {
        if((
          (onlyInStock && product.stocked) || !onlyInStock) &&
          product.name.toLowerCase().includes(filter.toLowerCase()) &&
          product.category === category
        ) {
          return <Product key={product.name} name={product.name} price={product.price} stocked={product.stocked} />
        }
      })]
    })
    return list
  }

  getCategories() {
    const cat = []
    this.state.products.forEach(function (product) {
      if(cat.indexOf(product.category) < 0) {
        cat.push(product.category)
      }
    })
    return cat
  }

  handleFilter(e) {
    this.setState({filter: e.target.value.trim()})
  }

  render() {
    const {filter, onlyOnStock} = this.state
    const products = this.getProductList(onlyOnStock, filter)
    return <div className="container mt-3">
      <Filter value={filter} onChange={this.handleFilter}/>
      <Check id="on-stock" checked={onlyOnStock} onChange={this.handleStockProduct}>Show only product on stock</Check>
      {products}
    </div>
  }

}

ReactDOM.render(<ProductApp/>, document.querySelector('#app'))