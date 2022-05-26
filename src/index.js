import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import userChangeReducer from './reducers/reducer';
import { createStore } from 'redux'
import { Provider } from 'react-redux';

export const store = createStore(userChangeReducer, {'user': '', 'blogs': []})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>

    
  </React.StrictMode>,
  document.getElementById('root')
);
