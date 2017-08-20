import AppDispatcher from '../AppDispatcher';
import KanbanAPI from '../api/KanbanApi';
import constants from '../constants';
import {
    throttle
} from '../util/utils';
import CardStore from '../stores/CardStore';

class CardActionCreators {
    static fetchCards() {
        AppDispatcher.dispatchAsync(KanbanAPI.fetchCards(), {
            request: constants.FETCH_CARDS,
            success: constants.FETCH_CARDS_SUCCESS,
            failure: constants.FETCH_CARDS_ERROR
        })
    }

    static toggleCardDetails(cardId) {
        AppDispatcher.dispatch({
            type: constants.TOGGLE_CARD_DETAILS,
            payload: {
                cardId
            }
        });
    }

    static persistCardDrag(cardProps) {
        let card = CardStore.getCard(cardProps.id)
        let cardIndex = CardStore.getCardIndex(cardProps.id)
        AppDispatcher.dispatchAsync(KanbanAPI.persistCardDrag(card.id, card.status, cardIndex), {
            request: constants.PERSIST_CARD_DRAG,
            success: constants.PERSIST_CARD_DRAG_SUCCESS,
            failure: constants.PERSIST_CARD_DRAG_ERROR
        }, {
            cardProps
        });
    }
}

CardActionCreators.updateCardStatus = throttle((cardId, listId) => {
    AppDispatcher.dispatch({
        type: constants.UPDATE_CARD_STATUS,
        payload: {
            cardId,
            listId
        }
    })
});

CardActionCreators.updateCardPosition = throttle((cardId, afterId) => {
    AppDispatcher.dispatch({
        type: constants.UPDATE_CARD_POSITION,
        payload: {
            cardId,
            afterId
        }
    });
}, 500)

export default CardActionCreators;