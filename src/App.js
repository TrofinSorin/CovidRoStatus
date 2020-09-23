import React, { useEffect } from "react";
import "./App.scss";
import Router from "./Router";

function App(props) {
  useEffect(() => {
    // listen to the service worker promise in index.html to see if there has been a new update.
    // condition: the service-worker.js needs to have some kind of change - e.g. increment CACHE_VERSION.
    window["isUpdateAvailable"].then((isAvailable) => {
      if (isAvailable) {
        console.log("isAvailable:", isAvailable);
      }
    });
  }, []);

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
