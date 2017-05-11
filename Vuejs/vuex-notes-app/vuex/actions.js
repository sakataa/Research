import ActionType from "./actiontype"

export const addNote = ({
    commit
}) => {
    commit(ActionType.ADD_NOTE)
}

export const editNote = ({
    commit
}, e) => {
    commit(ActionType.EDIT_NOTE, e.target.value)
}

export const deleteNote = ({
    commit
}) => {
    commit(ActionType.DELETE_NOTE)
}

export const updateActiveNote = ({
    commit
}, note) => {
    commit(ActionType.SET_ACTIVE_NOTE, note)
}

export const toggleFavorite = ({
    commit
}) => {
    commit(ActionType.TOGGLE_FAVORITE)
}