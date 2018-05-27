import { combineReducers } from "redux";

import * as sampleReducer from "../../../reducers/sampleReducer";
import * as filterReducer from "./filterReducer";

export default combineReducers({
  ...sampleReducer,
  ...filterReducer
});
