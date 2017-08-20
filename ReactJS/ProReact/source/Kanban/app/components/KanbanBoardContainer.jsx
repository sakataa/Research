import React, { Component } from 'react';
import KanbanBoard from './KanbanBoard';
import 'whatwg-fetch';
import update from 'react-addons-update';

import { Container } from 'flux/utils';
import CardActionCreators from '../actions/CardActionCreators';
import CardStore from '../stores/CardStore';

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