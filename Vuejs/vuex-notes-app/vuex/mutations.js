import ActionType from "./actiontype"

export default {
    [ActionType.ADD_NOTE](state) {
        const newNote = {
            text: "New Note",
            favorite: false
        }
        state.notes.push(newNote)
        state.activeNote = newNote
    },

    [ActionType.EDIT_NOTE](state, text) {
        state.activeNote.text = text
    },

    [ActionType.DELETE_NOTE](state) {
        state.notes = state.notes.filter(note => note !== state.activeNote)
        state.activeNote = state.notes[0]
    },

    [ActionType.TOGGLE_FAVORITE](state) {
        state.activeNote.favorite = !state.activeNote.favorite
    },

    [ActionType.SET_ACTIVE_NOTE](state, note) {
        state.activeNote = note
    }
}