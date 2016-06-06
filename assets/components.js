class TodoBox extends React.Component {
  constructor() {
    super();

    this.state = {
      todos: [
        {id: 1, title: "Faire ceci"},
        {id: 2, title: "Faire cela"},
        {id: 3, title: "Cette tâche est intéressante"}
      ]
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
    return this.state.todos.map((todo) => {
      return (
        <TodoElement id={todo.id} title={todo.title} key={todo.id} onDelete={this._removeTodo.bind(this)} />
      );
    });
  }

  _addTodo(todoContent) {

    if(todoContent.length > 0) {
      let newTodo = {
        id: this.state.todos.length + 1,
        title: todoContent
      }

      this.setState({
        todos: this.state.todos.concat([newTodo])
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

  render() {
    return(
      <li className="todo-element">
        <span className="todo-title">{this.props.title}</span>
        
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
