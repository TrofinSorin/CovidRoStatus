import React from "react";
import "./App.scss";
import Router from "./Router";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <main>
        <Router></Router>
      </main>

      <footer>
        <p>footer</p>
      </footer>
    </div>
  );
}

export default App;
