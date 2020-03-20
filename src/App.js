import React from "react";
import "./App.scss";
import Router from "./Router";

function App(props) {
  return (
    <div className="App">
      <header className="App-header"></header>
      <main>
        <Router></Router>
      </main>
    </div>
  );
}

export default App;
