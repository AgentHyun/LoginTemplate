import React from 'react';
import ReactDOM from "react-dom/client";
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import { thunk } from 'redux-thunk'; // Update this import statement
import Reducer from './_reducers';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, thunk)(createStore);

const rootNode = document.getElementById("root"); //오류 2 해결
 
ReactDOM.createRoot(rootNode).render(
  <React.StrictMode>  
    <Provider store={createStoreWithMiddleware(
      Reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )}>
      <App />
    </Provider>
  </React.StrictMode>
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

