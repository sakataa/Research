import React, { Component } from 'react';
import KanbanBoard from './KanbanBoard';
import 'whatwg-fetch';
import update from 'react-addons-update';

// If you're running the server locally, the URL will be, by default, localhost:3000
// Also, the local server doesn't need an authorization header.
const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADERS = {
    'Content-Type': 'application/json',
    Authorization: 'any-string-you-like1234' // The Authorization is not needed for local server
};

class KanbanBoardContainer extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            cards: []
        }
    }

    componentDidMount() {
        fetch(API_URL + "/cards", { headers: API_HEADERS })
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({ cards: responseData })
            })
            .catch((error) => {
                console.log("Error fetching and Parsing data", error);
            })
    }

    addTask(cardId, taskName) {
        const prevState = this.state;

        const cardIndex = this.state.cards.findIndex((card) => card.id == cardId);

        const newTask = { id: Date.now(), name: taskName, done: false };

        const nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: { $push: [newTask] }
            }
        });

        this.setState({ cards: nextState });

        // Call the API to add the task on the server
        fetch(`${API_URL}/cards/${cardId}/tasks`, {
            method: 'post',
            headers: API_HEADERS,
            body: JSON.stringify(newTask)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Server response wasn't ok");
                }
                return response.json()
            })
            .then((responseData) => {
                // When the server returns the definitive ID
                // used for the new Task on the server, update it on React
                newTask.id = responseData.id
                this.setState({ cards: nextState });
            })
            .catch((error) => {
                console.error("Fetch error: ", error);
                this.setState(prevState);
            });
    }

    deleteTask(cardId, taskId, taskIndex) {
        const prevState = this.state;

        const cardIndex = this.state.cards.findIndex((card) => card.id == cardId);

        const nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: { $splice: [[taskIndex, 1]] }
            }
        });

        this.setState({ cards: nextState });

        // Call the API to remove the task on the server
        fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
            method: 'delete',
            headers: API_HEADERS
        })
            .then((response) => {
                if (!response.ok) {
                    // Throw an error if server response wasn't 'ok'
                    // so you can revert back the optimistic changes
                    // made to the UI.
                    throw new Error("Server response wasn't OK")
                }
            })
            .catch((error) => {
                console.error("Fetch error: ", error);
                this.setState(prevState);
            });
    }

    toggleTask(cardId, taskId, taskIndex) {
        const prevState = this.state;

        const cardIndex = this.state.cards.findIndex((card) => card.id == cardId);

        let newDoneValue;

        const nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: {
                    [taskIndex]: {
                        done: { $apply: (done) => !done }
                    }
                }
            }
        });

        // Call the API to toggle the task on the server
        fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
            method: 'put',
            headers: API_HEADERS,
            body: JSON.stringify({ done: newDoneValue })
        })
            .then((response) => {
                if (!response.ok) {
                    // Throw an error if server response wasn't 'ok'
                    // so you can revert back the optimistic changes
                    // made to the UI.
                    throw new Error("Server response wasn't OK")
                }
            })
            .catch((error) => {
                console.error("Fetch error: ", error);
                this.setState(prevState);
            });
    }

    render() {
        return (
            <KanbanBoard cards={this.state.cards}
                taskCallbacks={{
                    toggle: this.toggleTask.bind(this),
                    delete: this.deleteTask.bind(this),
                    add: this.addTask.bind(this)
                }}
            />
        )
    }
}

export default KanbanBoardContainer;