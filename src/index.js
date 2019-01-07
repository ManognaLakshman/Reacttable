import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createStore, combineReducers } from 'redux';
import reducerForm from "./store/reducers/reducer";
import reducerDepSearch from "./store/reducers/reducerDepSearch";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";

const rootReducer = combineReducers({
  form: reducerForm,
  depSearch: reducerDepSearch
})

const store = createStore(rootReducer);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
ReactDOM.render(app, document.getElementById("root"));
serviceWorker.unregister();
