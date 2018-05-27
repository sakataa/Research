import createReducer from "../../../modules/createReducer";
import { TOGGLE_SAMPLE } from "../actions/types";

export const isChecked = createReducer(
  {},
  {
    [TOGGLE_SAMPLE](state, action) {
      return action.data;
    }
  }
);
