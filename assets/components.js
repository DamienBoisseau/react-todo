class TodoBox extends React.Component {
  constructor() {
    super();

    this.state = {
      todos: [
        {id: 1, title: "Faire ceci", isDone: false},
        {id: 3, title: "Cette tâche est intéressante", isDone: false},
        {id: 2, title: "Faire cela", isDone: false},
        {id: 4, title: "Tâche terminée", isDone: true}
      ],
      nextId: 5
    };
  }

  render() {
    let todo = this._getTodo();

    return(
      <div className="todo-container">
        <h2>Todo-list</h2>

        <h4>Add a task :</h4>
        <TodoForm addTodo={this._addTodo.bind(this)} />

        <h4>{this._getTodoCount(this.state.todos.length)}</h4>
        <ul className="todo-list">
          {todo}
        </ul>
      </div>
    );
  }

  _getTodoCount(length) {
    if(length == 0) {
      return 'No task yet';
    }
    else if(length == 1) {
      return '1 task :';
    }
    else {
      return `${length} tasks :`;
    }
  }

  _getTodo() {
    this.state.todos.sort(function (a, b) {
      if(!a.isDone && b.isDone) {return -1;}
      if(a.isDone && !b.isDone) {return 1;}
      else {
        if (a.id > b.id) {return 1;}
        if (a.id < b.id) {return -1;}
        return 0;
      }
    });

    return this.state.todos.map((todo) => {
      return (
        <TodoElement id={todo.id} title={todo.title} isDone={todo.isDone} key={todo.id} onDelete={this._removeTodo.bind(this)} />
      );
    });
  }

  _addTodo(todoContent) {

    if(todoContent.length > 0) {
      let newTodo = {
        id: this.state.nextId,
        title: todoContent,
        isDone: false
      }

      this.setState({
        todos: this.state.todos.concat([newTodo]),
        nextId: this.state.nextId + 1
      });

      document.getElementById('todo-input').focus();
    }
  }

  _removeTodo(todoID) {
    const todos = this.state.todos.filter(
      todo => todo.id !== todoID
    );

    this.setState({ todos: todos });
  }
}

class TodoElement extends React.Component {
  constructor() {
    super();
  }

  componentWillMount() {
    this.setState({
      isDone: this.props.isDone
    });
  }

  render() {

    let todoClasses = (this.state.isDone) ? 'todo-element is-done' : 'todo-element';

    return(
      <li className={todoClasses}>
        <div className="checkbox">
          <label>
            <input type="checkbox" defaultChecked={this.state.isDone} onChange={this._handleDone.bind(this)} />
            <span className="todo-title">{this.props.title}</span>
          </label>
        </div>
        <div className="todo-actions">
          <div className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span className="glyphicon glyphicon-option-vertical" ></span>
            <span className="sr-only">Options</span>
          </div>
          <ul className="dropdown-menu">
            <li>
              <a href="#" onClick={this._handleDelete.bind(this)}>
                <span className="glyphicon glyphicon-remove-circle" aria-hidden="true"></span> Delete
              </a>
            </li>
          </ul>
        </div>
      </li>
    );
  }

  _handleDone(event) {
    this.setState({
      isDone: !this.state.isDone
    });
  }

  _handleDelete(event) {
    event.preventDefault();
    this.props.onDelete(this.props.id);
  }
}

class TodoForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form className="todo-form form-inline" onSubmit={this._handleSubmit.bind(this)}>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Add a task..." id="todo-input" ref={(input) => this._todo = input} />
        </div>
        <button type="submit" className="btn btn-default">Add</button>
      </form>
    );
  }

  _handleSubmit(event) {
    event.preventDefault();

    this.props.addTodo(this._todo.value);

    this._todo.value = '';
  }
}

ReactDOM.render(
  <TodoBox />,
  document.getElementById('todo-box')
);
