import './App.css';

import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import {fetchPoke} from './actions/index'
import { Table } from "antd"; 

function App() {

  const state = useSelector(state => state, shallowEqual);
  const dispatch = useDispatch();
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Url',
      dataIndex: 'url',
      key: 'url',
    }
  ];


  useEffect(() =>{
    
    if (state.todos.length === 0 && state.loading == false) {
      dispatch(fetchPoke());
      console.log(state)
    }
  })

  

  return (
    <div className="App">
      <Table dataSource={state.todos} columns={columns} />
    </div>
  );
}

export default App;
