import React, { useState } from "react";
import "./App.scss";
import Router from "./Router";
import { Button, Modal } from "antd";

function App() {
  const [visible, setVisible] = useState(false);

  const date = new Date();

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = e => {
    setVisible(false);
  };

  const handleCancel = e => {
    setVisible(false);
  };

  return (
    <div className="App">
      <header className="App-header"></header>
      <main>
        <Router></Router>
      </main>

      <footer>
        <div className="footer-container">
          <p>{date.toString()}</p>
          <Button onClick={showModal} type="dashed">
            Despre
          </Button>
          <p>Sursa: ArgGIS</p>
        </div>
      </footer>

      <Modal
        title="Despre"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <h1 style={{ color: "black" }}>Bun venit!</h1>

        <p style={{ color: "black" }}>
          Aplicatie ofera informatii despre COVID19 la nivel national si la
          nivel de judet
        </p>

        <p>
          <a href="mailto:manglesorin@gmail.com">
            Contact:manglesorin@gmail.com
          </a>
          <span> sau </span>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.facebook.com/mangle.sorin"
          >
            Facebook Account
          </a>
        </p>
      </Modal>
    </div>
  );
}

export default App;
