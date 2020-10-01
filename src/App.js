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

  // private openSnackBar() {
  //     if (!this.dialogOpen) {
  //         this.dialogOpen = true;
  //         this.snackBar.openFromComponent(NewApplicationVersionDataComponent, {
  //             duration: -1,
  //             verticalPosition: 'bottom',
  //             horizontalPosition: 'center'
  //         }).afterDismissed().subscribe(() => {
  //             this.dialogOpen = false;
  //         });
  //     }
  // }

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
