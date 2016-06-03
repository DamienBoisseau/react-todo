class TodoBox extends React.Component {
  constructor() {
    super();

    this.state = {
      todos: []
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
    return this.state.todos.map(function(todo) {
      return (
        <TodoElement title={todo.title} key={todo.id} />
      );
    });
  }

  _addTodo(todoContent) {
    let newTodo = {
      id: this.state.todos.length + 1,
      title: todoContent
    }

    this.setState({
      todos: this.state.todos.concat([newTodo])
    });
  }
}

class TodoElement extends React.Component {
  constructor() {
    super();
  }

  render() {
    return(
      <li className="todo-element">
        {this.props.title}
      </li>
    );
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
          <input type="text" className="form-control" placeholder="Add a task..." ref={(input) => this._todo = input} />
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