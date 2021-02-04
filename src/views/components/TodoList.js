import React from 'react';

import TodoItem from './TodoItem';

class TodoList extends React.Component {
    static defaultProps = {
        items: [],
        onRemove: () => { },
        onUpdate: () => { }
    }

    constructor(props) {
        super(props);
        this.remove = this.remove.bind(this);
        this.update = this.update.bind(this);
    }

    update(item) {
        this.props.onUpdate(item);
    }

    remove(id) {
        this.props.onRemove(id);
    }
    render() {
        const { props } = this;
        if (props.items.length === 0) {
            return <div>Não há itens na lista</div>
        } else {
            return (
                <ul className="todo-list">
                    {
                        props.items.map(item => <TodoItem
                            key={item.id}
                            item={item}
                            onUpdate={this.update}
                            onRemove={this.remove}
                        />)
                    }
                </ul>
            )
        }
    }
}

export default TodoList;