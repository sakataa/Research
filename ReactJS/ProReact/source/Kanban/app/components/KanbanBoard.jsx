import React, { Component, PropTypes } from 'react';
import List from './List';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class KanbanBoard extends Component {
    render() {
        return (
            <div className="app">
                <List id="todo" title="To Do"
                    cards={this.props.cards.filter((card) => card.status === "todo")} />
                <List id="in-progress" title="In Progress"
                    cards={this.props.cards.filter((card) => card.status === "in-progress")} />
                <List id="done" title="Done"
                    cards={this.props.cards.filter((card) => card.status === "done")} />

                {this.props.children}
            </div>
        )
    }
}

KanbanBoard.PropTypes = {
    cards: PropTypes.arrayOf(PropTypes.object)
}

export default DragDropContext(HTML5Backend)(KanbanBoard);;