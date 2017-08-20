import 'whatwg-fetch';

const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADERS = {
    'Content-Type': 'application/json',
    Authorization: 'any-string-you-like'
}

class KanbanAPI {
    static fetchCards() {
        return fetch(`${API_URL}/cards`, {
                headers: API_HEADERS
            })
            .then(response => response.json())
    }

    static addTask(cardId, task) {
        return fetch(`${API_URL}/cards/${cardId}/tasks`, {
                method: 'post',
                headers: API_HEADERS,
                body: JSON.stringify(task)
            })
            .then((response) => response.json())
    }
    static deleteTask(cardId, task) {
        return fetch(`${API_URL}/cards/${cardId}/tasks/${task.id}`, {
            method: 'delete',
            headers: API_HEADERS
        })
    }
    static toggleTask(cardId, task) {
        return fetch(`${API_URL}/cards/${cardId}/tasks/${task.id}`, {
            method: 'put',
            headers: API_HEADERS,
            body: JSON.stringify({
                done: !task.done
            })
        })
    }
}

export default KanbanAPI;