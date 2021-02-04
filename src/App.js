import React from 'react';
import TodoList from './views/components/TodoList';
import { TodoServices } from './data/services/TodoServices'
import './App.css';
import NewTodoItem from './views/components/NewTodoItem';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: []
    }
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.update = this.update.bind(this);
    this.clear = this.clear.bind(this);
  }

  async componentDidMount() {
    const todoList = await TodoServices.list();
    this.setState({
      todoList
    })
  }

  add(description) {
    TodoServices.create({ description, isChecked: false })
      .then(newItem => {
        const { todoList } = this.state;
        todoList.push(newItem);
        this.setState({ todoList });
      });
  }

  remove(id) {
    const { todoList } = this.state;
    const index = todoList.findIndex(item => item.id === id);
    todoList.splice(index, 1);
    TodoServices.remove(id);
    this.setState({ todoList });
  }

  update(item) {
    const { todoList } = this.state;
    const index = todoList.findIndex(i => i.id === item.id);
    todoList.splice(index, 1, item);
    TodoServices.update(item);
    this.setState({ todoList });
  }

  clear() {
    const todo = [],
      done = [],
      { todoList } = this.state;

    todoList.forEach(item => {
      if (item.isChecked) {
        done.push(item);
      } else {
        todo.push(item);
      }
    });

    done.forEach(item => this.remove(item.id));
    this.setState({ todoList: todo });
  }

  render() {
    const { state } = this;
    return (
      <div className="App">
        <NewTodoItem onAdd={this.add} />
        <hr />
        <button className="tw-btn" onClick={this.clear}>Limpar</button>
        <hr />
        <TodoList items={state.todoList} onRemove={this.remove} onUpdate={this.update} />
      </div>
    )
  }

}

export default App;
