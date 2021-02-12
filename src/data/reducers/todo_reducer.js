import * as TodoConstants from '../actions/todo_actions';

const TodoReducer = (todoList = [], action) => {
    switch (action.type) {
        case TodoConstants.TODO_LIST_RESPONSE:
            return action.todoList;
        case TodoConstants.TODO_CREATE_RESPONSE:
            return [
                ...todoList,
                action.data.item
            ]
        case TodoConstants.TODO_REMOVE:
            const itemIndex = todoList.findIndex(item => item.id === action.data.id);
            return [...todoList.slice(0, itemIndex), ...todoList.slice(itemIndex + 1)];
        case TodoConstants.TODO_UPDATE:
            return todoList.map(item => {
                if (item.id === action.data.item.id) {
                    return action.data.item;
                }
                return item;
            })
        default:
            return todoList;
    }
}

export default TodoReducer;