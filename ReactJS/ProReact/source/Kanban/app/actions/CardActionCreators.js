import AppDispatcher from '../AppDispatcher';
import KanbanAPI from '../api/KanbanApi';
import constants from '../constants';

class CardActionCreators {
    static fetchCards() {
        AppDispatcher.dispatchAsync(KanbanAPI.fetchCards(), {
            request: constants.FETCH_CARDS,
            success: constants.FETCH_CARDS_SUCCESS,
            failure: constants.FETCH_CARDS_ERROR
        })
    }
}

export default CardActionCreators;