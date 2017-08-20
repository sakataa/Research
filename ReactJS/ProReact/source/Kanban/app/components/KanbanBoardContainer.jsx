import React, { Component } from 'react';
import KanbanBoard from './KanbanBoard';
import 'whatwg-fetch';
import update from 'react-addons-update';

import { Container } from 'flux/utils';
import CardActionCreators from '../actions/CardActionCreators';
import CardStore from '../stores/CardStore';

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

    static getStores() {
        return [CardStore];
    }

    static calculateState(prevState) {
        return {
            cards: CardStore.getState()
        }
    }

    componentDidMount() {
        CardActionCreators.fetchCards();
    }

    render() {
        return <KanbanBoard cards={this.state.cards} />
    }
}

const App = Container.create(KanbanBoardContainer);
export default App;