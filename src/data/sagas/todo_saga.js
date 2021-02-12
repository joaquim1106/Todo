import { TodoServices } from '../services/TodoServices';
import * as TodoActions from '../actions/todo_actions';
import { all, put, takeLatest, takeEvery, select } from 'redux-saga/effects';

function* listAll() {
    const todoList = yield TodoServices.list();
    yield put(TodoActions.listResponse(todoList));
}

function* watchListAll() {
    yield takeLatest(TodoActions.TODO_LIST, listAll);
}

function* create({ data: { description } }) {
    const item = yield TodoServices.create({ description, isChecked: false });
    yield put(TodoActions.createResponse(item));
}

function* wacthCreate() {
    yield takeLatest(TodoActions.TODO_CREATE, create);
}

function* remove({ data: { id } }) {
    yield TodoServices.remove(id);
}

function* watchRemove() {
    yield takeEvery(TodoActions.TODO_REMOVE, remove)
}

function* clear() {
    const state = yield select(),
        todoList = state.TodoReducer;

    const newTodoList = todoList.filter(item => !item.isChecked),
        toRemove = todoList.filter(item => item.isChecked);

    toRemove.forEach(item => { TodoServices.remove(item.id); });
    yield put(TodoActions.listResponse(newTodoList));
}

function* watchClear() {
    yield takeLatest(TodoActions.TODO_CLEAR, clear);
}

function* update({ data: { item } }) {
    yield TodoServices.update(item);
}

function* watchUpdate(){
    yield takeEvery(TodoActions.TODO_UPDATE, update);
}

export default function* TodoSaga() {
    yield all([
        watchListAll(),
        wacthCreate(),
        watchRemove(),
        watchClear(),
        watchUpdate()
    ])
}