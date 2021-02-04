import { ApiServices } from './api_services';
const endpoint = 'todo';

export const TodoServices = {
    list() {
        return ApiServices.get(endpoint);
    },
    create(item) {
        return ApiServices.post(endpoint, item);
    },
    update(item) {
        return ApiServices.put(endpoint, item);
    },
    remove(id) {
        return ApiServices.delete(endpoint, id);
    }
}