const PRODUCTS = [
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

class SearchBar extends React.Component {

  constructor(props) {
    super(props)
    this.handleStock = this.handleStock.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.props.onFilterTextChange(e.target.value)
  }

  handleStock(e) {
    this.props.onInStockOnlyChange(e.target.checked)
  }

  render() {
    const {filterText, inStockOnly} = this.props
    return <div className="p-2">
      <div className="form-group">
        <input type="text" placeholder="Search.." onChange={this.handleChange} value={filterText} className="form-control"/>
      </div>
      <div className="form-check">
        <input type="checkbox" id="in-stock-only" checked={inStockOnly} onChange={this.handleStock} className="form-check-input"/>
        <label htmlFor="in-stock-only" className="form-check-label">Only show products in stock</label>
      </div>
    </div>
  }

}

function ProductCategoryRow({category}) {
  return <tr>
    <th colSpan="2">
      {category}
    </th>
  </tr>
}

function ProductRow({product}) {
  return <tr>
    <td className={product.stocked ? '' : 'text-danger'}>{product.name}</td>
    <td>{product.price}</td>
  </tr>
}

class ProductTable extends React.Component {

  constructor(props) {
    super(props)
  }

  productFilter() {
    const {products, filterText, inStockOnly} = this.props
    let list = [], lastCategory = null
    products.forEach(function (product) {
      if (lastCategory !== product.category) {
        lastCategory = product.category
        list.push(<ProductCategoryRow key={lastCategory} category={lastCategory}/>)
      }
      if(
        product.name.toLowerCase().indexOf(filterText.toLowerCase()) !== -1 &&
        (!inStockOnly || inStockOnly && product.stocked)
      ) {
        list.push(<ProductRow key={product.name + product.price} product={product}/>)
      }
    })
    return list
  }

  render() {
    return <table className="table mt-3">
      <thead>
      <tr>
        <th>Name</th>
        <th>Price</th>
      </tr>
      </thead>
      <tbody>
      {this.productFilter()}
      </tbody>
    </table>
  }

}

class FilterableProductTable extends React.Component {

  constructor(props) {
    super(props)
    this.state = {filterText: '', inStockOnly: false}
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.handleStockChange = this.handleStockChange.bind(this)
  }

  handleFilterChange(filterText) {
    this.setState({filterText})
  }
  handleStockChange(inStockOnly) {
    this.setState({inStockOnly})
  }

  render() {
    const {filterText, inStockOnly} = this.state
    return <div className="container mt-2">
      <div className="row">
        <div className="col-12 col-md-6 offset-md-3">
          <SearchBar
            filterText={filterText}  inStockOnly={inStockOnly}
            onFilterTextChange={this.handleFilterChange}
            onInStockOnlyChange={this.handleStockChange}
          />
          <ProductTable products={this.props.products} filterText={filterText} inStockOnly={inStockOnly}/>
        </div>
      </div>
    </div>
  }

}

ReactDOM.render(<FilterableProductTable products={PRODUCTS}/>, document.querySelector('#app'))