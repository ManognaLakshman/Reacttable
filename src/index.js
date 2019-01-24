import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import appReducer from "./store/reducers/appReducer";
import reducerForm from "./store/reducers/reducer";
import reducerDepSearch from "./store/reducers/reducerDepSearch";
import employeeReducer from "./store/reducers/employeeReducer";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import rootSaga from "./sagas/saga";

const rootReducer = combineReducers({
  form: reducerForm,
  depSearch: reducerDepSearch,
  emp: employeeReducer,
  login: appReducer
});

const fetchData = store => {
  return next => {
    return action => {
      console.log("[Middleware] Dispatching ", action);
      const result = next(action);
      console.log("[Middleware] next state ", store.getState());
      return result;
    };
  };
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ latency: 0 })
  : compose;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(fetchData, sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
ReactDOM.render(app, document.getElementById("root"));
serviceWorker.unregister();
