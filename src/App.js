import React from 'react';
import {BrowserRouter, Route, NavLink} from "react-router-dom";
import ClientScreen from "./components/ClientScreen";
import AdminScreen from "./components/AdminScreen";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <NavLink to="/client">I am client screen</NavLink>
          <NavLink to= "/admin">I am admin screen</NavLink>
        </header>
        <Route path="/client" component={ClientScreen} />
        <Route path="/admin" component={AdminScreen}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
