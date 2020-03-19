import React from "react";
import "./App.scss";
import Router from "./Router";
import { Button } from "antd";

function App() {
  const date = new Date();

  return (
    <div className="App">
      <header className="App-header"></header>
      <main>
        <Router></Router>
      </main>

      <footer>
        <div className="footer-container">
          <p>{date.toString()}</p>
          <Button type="dashed">Despre</Button>
          <p>Sursa: ArgGIS</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
