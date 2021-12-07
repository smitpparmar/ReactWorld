
import './App.css';
import Header from './My component/Header';
import { Footer } from './My component/Footer';
import { Todos } from './My component/Todos';
import { AddTodo } from './My component/AddTodo'
import {About} from "./My component/About"
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


function App() {
  let initTodo;
  if (localStorage.getItem("todos") === null) {
    initTodo = [];
  }
  else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }
  const onDelete = (todo) => {
    console.log("i am on delete", todo);

    setTods(tods.filter((e) => {
      return e !== todo;
    }))
    localStorage.setItem("todos", JSON.stringify(tods));
  }
  const addTodo = (title, desc) => {
    console.log("adding!!!!1")
    let sno;
    if (tods.length === 0) {
      sno = 1;
    }
    else {
      sno = tods[tods.length - 1].sno + 1;
    }
    const myTodo = {
      sno: sno,
      title: title,
      desc: desc
    }
    setTods([...tods, myTodo]);
  }



  const [tods, setTods] = useState(initTodo);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(tods));
  }, [tods])
  return ( 
    <div>
    <Router>
      <Header title="my todolist" Searchbar={false} />
      <Routes>
          <Route exact path="/" element={
              <div>
              <AddTodo addTodo={addTodo} />
              <Todos todos={tods} onDelete={onDelete} />
              </div>
          }>
          </Route>
          <Route exact path="/about" element={<About/>}/>
        </Routes>
        <Footer />
      </Router>
      </div>
  );
}

export default App;
