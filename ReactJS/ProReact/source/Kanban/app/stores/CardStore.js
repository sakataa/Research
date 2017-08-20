import AppDispatcher from '../AppDispatcher';
import {
    ReduceStore
} from 'flux/utils';
import update from 'react-addons-update';
import constants from '../constants';

class CardStore extends ReduceStore {
    getInitialState() {
        return [];
    }

    reduce(state, action) {
        switch (action.type) {
            case constants.FETCH_CARDS_SUCCESS:
                return action.payload.response;
            case constants.CREATE_TASK:
                cardIndex = this.getCardIndex(action.payload.cardId);
                return update(this.getState(), {
                    [cardIndex]: {
                        tasks: {
                            $push: [action.payload.task]
                        }
                    }
                });

            case constants.CREATE_TASK_SUCCESS:
                cardIndex = this.getCardIndex(action.payload.cardId);
                taskIndex = this.getState()[cardIndex].tasks.findIndex((task) => (
                    task.id == action.payload.task.id
                ));
                return update(this.getState(), {
                    [cardIndex]: {
                        tasks: {
                            [taskIndex]: {
                                id: {
                                    $set: action.payload.response.id
                                }
                            }
                        }
                    }
                });

            case constants.CREATE_TASK_ERROR:
                let cardIndex = this.getCardIndex(action.payload.cardId);
                let taskIndex = this.getState()[cardIndex].tasks.findIndex((task) => (
                    task.id == action.payload.task.id
                ));
                return update(this.getState(), {
                    [cardIndex]: {
                        tasks: {
                            $splice: [
                                [taskIndex, 1]
                            ]
                        }
                    }
                });
            case constants.DELETE_TASK:
                cardIndex = this.getCardIndex(action.payload.cardId);
                return update(this.getState(), {
                    [cardIndex]: {
                        tasks: {
                            $splice: [
                                [action.payload.taskIndex, 1]
                            ]
                        }
                    }
                });
            case constants.DELETE_TASK_ERROR:
                cardIndex = this.getCardIndex(action.payload.cardId);
                return update(this.getState(), {
                    [cardIndex]: {
                        tasks: {
                            $splice: [
                                [action.payload.taskIndex, 0, action.payload.task]
                            ]
                        }
                    }
                });
            case constants.TOGGLE_TASK:
                cardIndex = this.getCardIndex(action.payload.cardId);
                return update(this.getState(), {
                    [cardIndex]: {
                        tasks: {
                            [action.payload.taskIndex]: {
                                done: {
                                    $apply: (done) => !done
                                }
                            }
                        }
                    }
                });
            case constants.TOGGLE_TASK_ERROR:
                cardIndex = this.getCardIndex(action.payload.cardId);
                return update(this.getState(), {
                    [cardIndex]: {
                        tasks: {
                            [action.payload.taskIndex]: {
                                done: {
                                    $apply: (done) => !done
                                }
                            }
                        }
                    }
                });
            default:
                return state;
        }
    }

    getCard(id) {
        return this._state.find((card) => card.id == id);
    }
    getCardIndex(id) {
        return this._state.findIndex((card) => card.id == id);
    }
}

export default new CardStore(AppDispatcher);