function Button({type, className, children}) {
  className = className || ''
  className += ' btn btn-outline-' + type
  return <button className={className}>{children}</button>
}

function DangerBtn({className, children}) {
  return <Button className={className} type="danger">{children}</Button>
}

function BoilingVerdict ({celsius}) {
  return <div className={celsius >= 100 ? 'alert alert-danger' : 'alert alert-success'}>
    {celsius >= 100 ? "L'eau bout" : "L'eau ne bout pas"}
  </div>
}

function Column2({left, right}) {
  return <div className="row">
    <div className="col-md-6">{left}</div>
    <div className="col-md-6">{right}</div>
  </div>
}

class Home extends React.Component {
  render() {
    return <React.Fragment>
      <Column2
        left={<div><BoilingVerdict celsius="25"/><Button type="success" className="m-3">Save</Button></div>}
        right={<div><BoilingVerdict celsius="125"/><DangerBtn>Delete</DangerBtn></div>}
      />


    </React.Fragment>
  }
}

ReactDOM.render(<Home />, document.getElementById('app'))