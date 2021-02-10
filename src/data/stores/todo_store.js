import AppDispatcher from '../dispatcher/app_dispatcher';
import { TodoServices } from '../services/TodoServices';
import TodoConstants from '../constants/todo_constants';
import Events from 'events';

const Channel = new Events.EventEmitter(),
    CHANGE_EVENT = 'change';

let _todoList = [];

function createItem(description) {
    return TodoServices.create({ description, isChecked: false })
        .then(newItem => {
            _todoList.push(newItem);
        });
}

function updateItem(item) {
    const index = _todoList.findIndex(i => i.id === item.id);
    _todoList.splice(index, 1, item);
    return TodoServices.update(item);
}

function removeItem(id) {
    const index = _todoList.findIndex(item => item.id === id);
    _todoList.splice(index, 1);
    return TodoServices.remove(id);
}



function clearAll() {
    const todo = [],
        done = [];

    _todoList.forEach(item => {
        if (item.isChecked) {
            done.push(item);
        } else {
            todo.push(item);
        }
    });

    done.forEach(item => removeItem(item.id));
    _todoList = todo;
}


const TodoStore = {
    async getAll() {
        if (_todoList.length === 0) {
            _todoList = await TodoServices.list();
        }
        return _todoList;
    },

    emmitChange() {
        Channel.emit(CHANGE_EVENT);
    },

    addChangeListener(callback) {
        Channel.on(CHANGE_EVENT, callback);
    },

    removeChangeListener(callback) {
        Channel.removeListener(CHANGE_EVENT, callback);
    }
}

async function handleAction(action) {
    switch (action.actionType) {
        case TodoConstants.TODO_CREATE:
            await createItem(action.data.description);
            TodoStore.emmitChange();
            break;
        case TodoConstants.TODO_REMOVE:
            await removeItem(action.data.id);
            TodoStore.emmitChange();
            break;
        case TodoConstants.TODO_UPDATE:
            await updateItem(action.data.item);
            TodoStore.emmitChange();
            break;
        case TodoConstants.TODO_CLEAR:
            clearAll();
            TodoStore.emmitChange();
            break;
        default:
    }
}

TodoStore.dispatchToken = AppDispatcher.register(handleAction);
export default TodoStore;