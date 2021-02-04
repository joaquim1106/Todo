const url = 'http://localhost:3002/api/react-flux/';

export const ApiServices = {
    get(endpoint) {
        return fetch(`${url}${endpoint}`).then(response => response.json()).catch(error => {
            console.error(error);
        });
    },
    post(endpoint, data) {
        return fetch(`${url}${endpoint}`, {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(response => response.json()).catch(error => {
            console.error(error);
        });
    },
    put(endpoint, data) {
        return fetch(`${url}${endpoint}?id=${data.id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        }).then(response => response.json()).catch(error => {
            console.error(error);
        });
    },
    delete(endpoint, id) {
        return fetch(`${url}${endpoint}?id=${id}`, {
            method: 'DELETE'
        }).then(response => response.json()).catch(error => {
            console.error(error);
        });
    }
}