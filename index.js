import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import burgerBuilderReducer from './store/reducer/burgerBuilder';
import orderReducer from './store/reducer/order';
import authReducer from './store/reducer/auth';


const composeEnhancers = process.env.NODE_ENV==='development'? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__: null || compose;
//process.env.NODE_ENV means only when you are in development mode you can inspect JS code, and all user in production mode cant access.
const rootReducer=combineReducers({
   burgerBuilder: burgerBuilderReducer,
   order: orderReducer,
   auth: authReducer //in Auth container in mapStateToProps state.auth.loading, where auth is the one defined here.
})

//const store=createStore(burgerBuilderReducer,  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const store=createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));

const app=(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
);

ReactDOM.render(
    app, document.getElementById('root'));

registerServiceWorker();
