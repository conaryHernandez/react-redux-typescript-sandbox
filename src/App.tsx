import React from 'react';
import { connect } from 'react-redux';
import { Todo, fetchTodos, deleteTodo } from './store/actions';
import { StoreState } from './store/reducers';
import './App.css';

interface AppProps {
  todos: Todo[];
  fetchTodos: Function;
  deleteTodo: typeof deleteTodo;
}

interface AppState {
  fetching: boolean;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = { fetching: false };
  }

  componentDidUpdate(prevProps: AppProps): void {
    if (!prevProps.todos.length && this.props.todos.length) {
      this.setState({ fetching: false });
    }
  }

  onButtonClick = (): void => {
    this.props.fetchTodos();

    this.setState({ fetching: true });
  };

  onTodoClick = (id: number): void => {
    this.props.deleteTodo(id);
  };

  renderList(): JSX.Element[] {
    return this.props.todos.map((todo: Todo) => {
      return (
        <div onClick={() => this.onTodoClick(todo.id)} key={todo.id}>
          {todo.title}
        </div>
      );
    });
  }

  render() {
    console.log(this.props.todos);
    return (
      <div className="App">
        <header className="App-header">
          <button onClick={this.onButtonClick}>Fetch</button>
          {this.state.fetching ? 'Loading' : null}
          {this.renderList()}
        </header>
      </div>
    );
  }
}

const mapStateToProps = ({ todos }: StoreState): { todos: Todo[] } => {
  return {
    todos
  };
};

export default connect(mapStateToProps, { fetchTodos, deleteTodo })(App);
