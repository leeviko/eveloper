import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from "./store";
import App from './App';

const loader = document.querySelector('.loader');
const showLoader = () => loader.classList.remove('loader--hide');
const hideLoader = () => loader.classList.add('loader--hide');

ReactDOM.render(
  <Provider store={store}>
    <App 
      hideLoader={hideLoader}
      showLoader={showLoader}  
    />
  </Provider>,
  document.getElementById('root')
);
