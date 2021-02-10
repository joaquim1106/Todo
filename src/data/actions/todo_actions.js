import AppDispatcher from '../dispatcher/app_dispatcher';
import TodoConstants from '../constants/todo_constants';

const TodoActions = {
    create(description) {
        AppDispatcher.dispatch({
            actionType: TodoConstants.TODO_CREATE,
            data: {
                description
            }
        });
    },
    update(item) {
        AppDispatcher.dispatch({
            actionType: TodoConstants.TODO_UPDATE,
            data: {
                item
            }
        });
    },
    remove(id) {
        AppDispatcher.dispatch({
            actionType: TodoConstants.TODO_REMOVE,
            data: {
                id
            }
        });
    },
    clear() {
        AppDispatcher.dispatch({
            actionType: TodoConstants.TODO_CLEAR
        });
    }
}

export default TodoActions;