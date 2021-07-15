import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { createStore, applyMiddleware } from 'redux';
import rootReducer from './store/reducer';
import { Provider } from 'react-redux';
// import thunk from 'redux-thunk';

import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './store/configureStore';
const { store, persistor } = configureStore();

// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// no more needed--created a configureStore.js
// const store = createStore(rootReducer, applyMiddleware(thunk)
//   );


ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
  , document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
