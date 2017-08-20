import React, { Component, PropTypes } from 'react';
import Card from './Card';

class List extends Component {
    render() {
        let cards = this.props.cards.map((card) => {
            return <Card
                key={card.id}
                {...card} />
        });

        return (
            <div className="list">
                <h1>{this.props.title}</h1>
                {cards}
            </div>
        )
    }
}

List.PropTypes = {
    title: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(PropTypes.object)
}

export default List;