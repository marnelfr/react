class Adder extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
  }

  handleKeyUp(e) {
    if(e.code === 'Enter') {
      this.handleClick()
    }
  }

  handleClick() {
    const target = document.querySelector('#new-task')
    this.props.addTask(target.value)
    target.value = ''
  }

  render() {
    return <div className="add-items d-flex">
      <input type="text" id="new-task" onKeyUp={this.handleKeyUp} className="form-control todo-list-input"
             placeholder="What do you need to do today?"/>
      <button onClick={this.handleClick} className="add btn btn-primary font-weight-bold todo-list-add-btn">Add</button>
    </div>
  }
}

class Task extends React.Component {

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleChange(e) {
    this.props.onChange({id: this.props.data.id, done: e.target.checked})
  }

  handleClick() {
    this.props.onClick(this.props.data.id)
  }

  render() {
    const {done, title} = this.props.data
    return <li className={done ? 'completed' : ''}>
      <div className="form-check">
        <label className="form-check-label">
          <input className="checkbox" type="checkbox" checked={done} onChange={this.handleChange}/>
          {title}
          <i className="input-helper"/>
        </label>
      </div>
      <i onClick={this.handleClick} className="remove">×</i>
    </li>
  }
}

class TodoList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      tasks: [
        {id: 1, title: 'Travailler sur les instances de malanwiApp', done: false},
        {id: 2, title: 'Rencontrer le prof Alain le jour des soutenances', done: true},
        {id: 3, title: 'Appeler Alice pour lui rappeler notre diné de ce soir', done: false},
        {id: 4, title: 'Aller manger chez maman pour lui parler de mon affaire avec Geordy', done: true}
      ]
    }
    this.addTask = this.addTask.bind(this)
    this.editTask = this.editTask.bind(this)
    this.removeTask = this.removeTask.bind(this)
  }

  lastNewID() {
    const ids = this.state.tasks.map(task => task.id)
    return Math.max(...ids) + 1
  }

  addTask(task) {
    this.setState((state) => {
      state.tasks.push({
        id: this.lastNewID(),
        title: task.trim(),
        done: false
      })
      return state
    })
  }

  editTask(data) {
    this.setState((state) => {
      state.tasks.map((task) => {
        if (task.id === data.id) {
          task.done = data.done
        }
        return task
      })
      return state
    })
  }

  removeTask(id) {
    this.setState((state) => {
      state.tasks.forEach(function (task, index, tasks) {
        if (task.id === id) {
          tasks.splice(index, 1)
        }
      })
      return state
    })
  }

  render() {
    const tasks = this.state.tasks.map(task => {
      return <Task key={task.id} data={task} onChange={this.editTask} onClick={this.removeTask} />
    })
    return <div className="page-content page-container" id="page-content">
      <div className="padding">
        <div className="row container d-flex justify-content-center">
          <div className="col-md-12">
            <div className="card px-3">
              <div className="card-body">
                <h4 className="card-title">Awesome Todo list</h4>
                <Adder addTask={this.addTask}/>
                <div className="list-wrapper">
                  <ul className="d-flex flex-column-reverse todo-list">
                    {tasks}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  }

}

ReactDOM.render(<TodoList/>, document.querySelector('#app'))