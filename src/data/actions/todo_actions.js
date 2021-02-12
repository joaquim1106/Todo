export const TODO_CREATE = 'TODO_CREATE';
export const TODO_CREATE_RESPONSE = 'TODO_CREATE_RESPONSE';
export const TODO_UPDATE = 'TODO_UPDATE';
export const TODO_REMOVE = 'TODO_REMOVE';
export const TODO_CLEAR = 'TODO_CLEAR';
export const TODO_LIST = 'TODO_LIST';
export const TODO_LIST_RESPONSE = 'TODO_LIST_RESPONSE';

const list = () => {
    return {
        type: TODO_LIST
    };
}

const listResponse = (todoList) => {
    return {
        type: TODO_LIST_RESPONSE,
        todoList
    }
}

const create = (description) => {
    return {
        type: TODO_CREATE,
        data: {
            description,
        }
    }
}

const createResponse = (item) => {
    return {
        type: TODO_CREATE_RESPONSE,
        data: { item }
    }
}

const update = (item) => {
    return {
        type: TODO_UPDATE,
        data: {
            item
        }
    }
}
const remove = (id) => {
    return {
        type: TODO_REMOVE,
        data: {
            id
        }
    }
}
const clear = () => {
    return {
        type: TODO_CLEAR
    }
}

export { create, update, remove, clear, list, listResponse, createResponse };