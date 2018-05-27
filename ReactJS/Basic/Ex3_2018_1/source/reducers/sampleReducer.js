import { GET_SAMPLE, ADD_SAMPLE } from "../actions/types";
import createReducer from "../modules/createReducer.js";

export const sampleList = createReducer(
  {},
  {
    [GET_SAMPLE](state, action) {
      return action.data;
    },
    [ADD_SAMPLE](state, action) {
      return action.data;
    }
  }
);
