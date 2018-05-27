import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunkMiddleware from "redux-thunk";

import reducer from '../reducers';
import AppContainer from "./AppContainer";

const defaultState = Object.assign(
  {},
  {
    sampleList: ["sample 1", "sample 2", "sample 3"],
    isChecked: false
  }
);

function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware // lets us dispatch() functions
    )
  );

  return createStore(reducer, initialState, enhancer);
}

const store = configureStore(defaultState);

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app-container"));
