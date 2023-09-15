import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './app/store.js';
import { Provider } from 'react-redux';

//let userInitialState = require("./UserInfo.json");
// console.log(userInitialState);

// let tutorInitialState = require("./TutorInfo.json");
// console.log(tutorInitialState);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>
);
