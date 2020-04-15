import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import 'toastr/build/toastr.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store';
import './css/main.css';
import './css/res.css';
import { loginAdmin } from './actions/loginAdmin';

const token = localStorage.getItem('token');

if (token) {
  const user = jwt.decode(token)
  store.dispatch(loginAdmin(user))
}

ReactDOM.render(
  <React.StrictMode>
  <BrowserRouter>
   <Provider store={store}>
    <App />
    </Provider>
  </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
