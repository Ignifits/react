import axios from 'axios';
import {
    ADD_TODO_SUCCESS,
    ADD_TODO_FAILURE,
    ADD_TODO_STARTED,
    DELETE_TODO
  } from '../actions/types';


/*export const fetchPoke = ({ title, userId }) => {
    return dispatch => {
      dispatch(addTodoStarted());
  
      axios
        .post(`https://jsonplaceholder.typicode.com/todos`, {
          title,
          userId,
          completed: false
        })
        .then(res => {
          dispatch(addTodoSuccess(res.data));
        })
        .catch(err => {
          dispatch(addTodoFailure(err.message));
        });
    };
};*/


export const fetchPoke = payload => {

    return dispatch => {

        dispatch(addTodoStarted());
        fetch('https://pokeapi.co/api/v2/pokemon')
        .then(response => response.json())
        .then(result => dispatch(dispatch(addTodoSuccess(result))))
        .catch(err => dispatch(addTodoFailure(err.message)))
        
    }
}

const addTodoSuccess = todo => ({
    type: ADD_TODO_SUCCESS,
    payload: {
      ...todo
    }
  });
  
  const addTodoStarted = () => ({
    type: ADD_TODO_STARTED
  });
  
  const addTodoFailure = error => ({
    type: ADD_TODO_FAILURE,
    payload: {
      error
    }
  });


/*const startGetPokemons = payload =>({
    type: 'START_GET_POKEMONS',
    ...payload
})

const successGetPokemons = payload =>({
    type: 'SUCCESS_GET_POKEMONS',
    ...payload
})


export const fetchPoke = payload => {

    return dispatch => {

        dispatch(startGetPokemons());
        fetch('https://pokeapi.co/api/v2/pokemon')
        .then(response => response.json())
        .then(result => dispatch(successGetPokemons(result)));
        
    }
}*/