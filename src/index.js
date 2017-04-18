import React from 'react';
import ReactDOM from 'react-dom';

import App from './App'

import './index.css';

window.appStore = (function() {

  var store = localStorage.getItem("appStore");

  if (store === null) {
    console.log("setting state app state...");
    localStorage.setItem("appStore", '{"programs": []}');
  }

  return {
    get: function() {
      return JSON.parse(localStorage.getItem("appStore"));
    },
    update: function(state) {
      console.log("updating store", state);
      localStorage.setItem("appStore", JSON.stringify(state));
    }
  }

}())

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
