import React, { useEffect } from "react";
import "./App.scss";
import Router from "./Router";

function App(props) {
  useEffect(() => {
    window["isUpdateAvailable"].then((reg) => {
      if (reg) {
        setupListener(reg);
      }
    });
  }, []);

  const setupListener = (reg) => {
    reg.onupdatefound = () => {
      const installingWorker = reg.installing;
      installingWorker.onstatechange = () => {
        if (installingWorker.state === "installed") {
          console.log("installingWorker.state:", installingWorker.state);
        }
      };
    };
  };

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
