
import { createStore, applyMiddleware } from 'redux';
//import rootReducer from './reducers';
import thunk from 'redux-thunk';
//import * as serviceWorker from './serviceWorker';

// use applyMiddleware to add the thunk middleware to the store

import {
    ADD_TODO_SUCCESS,
    ADD_TODO_FAILURE,
    ADD_TODO_STARTED,
    DELETE_TODO
  } from '../actions/types';

const initialState = {
    loading: false,
    todos: [],
    error: null
  };

function todosReducer(state = initialState, action) {
    switch (action.type) {
      case ADD_TODO_STARTED:
        return {
          ...state,
          loading: true
        };
      case ADD_TODO_SUCCESS:
        
        return {
          ...state,
          loading: false,
          error: null,
          todos: [...state.todos, action.payload.results]
        };
      case ADD_TODO_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload.error
        };
      default:
        return state;
    }
  }


export default () =>{

    return {
        ...createStore(todosReducer, applyMiddleware(thunk))
    }

}

