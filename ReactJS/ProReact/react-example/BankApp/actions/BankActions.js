import AppDispatcher from '../dispatcher/AppDispatcher';
import bankConstants from '../constants';

let BankActions = {
    createAccount() {
        AppDispatcher.dispatch({
            type: bankConstants.CREATED_ACCOUNT,
            amount: 0
        })
    },

    depositIntoAccount(amount) {
        AppDispatcher.dispatch({
            type: bankConstants.DEPOSITED_INTO_ACCOUNT,
            amount: amount
        })
    },

    withdrawfromAccount(amount) {
        AppDispatcher.dispatch({
            type: bankConstants.WITHDREW_FROM_ACCOUNT,
            amount: amount
        })
    }
}

export default BankActions;