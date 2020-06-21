import React, { useState, useEffect } from "react";
import { MoreOutlined } from "@ant-design/icons";
import "./MobileInstallInfo.scss";
import { useHistory } from "react-router-dom";

const MobileInstallInfo = (props) => {
  let history = useHistory();

  const [showInstaller, setShowInstaller] = useState(false);
  const [defferedPromt, setDefferedPrompt] = useState(null);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent the mini-infobar from appearing on mobile

      // Stash the event so it can be triggered later.
      setShowInstaller(true);
      setDefferedPrompt(e);
      // Update UI notify the user they can install the PWA
    });
  }, []);

  useEffect(() => {
    if (showInstaller && defferedPromt) {
      let buttonInstall = document.getElementById("pwa-installer-button");

      const clickLogicForPWA = (e) => {
        // Show the install prompt
        defferedPromt.prompt();
        // Wait for the user to respond to the prompt
        defferedPromt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === "accepted") {
            setShowInstaller(false);
            console.log("User accepted the install prompt");
          } else {
            buttonInstall.addEventListener(
              "click",
              buttonInstall.removeEventListener("click", clickLogicForPWA)
            );
            console.log("User dismissed the install prompt");
          }

          setDefferedPrompt(null);
        });
      };

      buttonInstall.addEventListener("click", clickLogicForPWA);
    }
  }, [showInstaller, defferedPromt]);

  return (
    <div className="MobileInstallInfoWrapper">
      <h3
        onClick={() => history.push("/")}
        style={{ cursor: "pointer", fontSize: "2rem" }}
      >
        {"<< Inapoi la harta"}
      </h3>

      {showInstaller ? (
        <button id="pwa-installer-button">Install PWA</button>
      ) : null}

      <h1>Mobile Install Info</h1>
      <div
        className="info-wrapper"
        style={{ display: "flex", flexDirection: "row" }}
      >
        <div
          className="first-method"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <h2>Prima metoda</h2>

          <img
            src={require("../../assets/gifs/mobile-install.gif")}
            alt="loading..."
          />
        </div>

        <div className="second-method">
          <h2>A doua metoda</h2>
          <p>1. Deschideti Google Chrome</p>
          <p>2. Intrati pe www.covid19rostatus.ro</p>
          <p>
            3. Apasati pe <MoreOutlined />
          </p>
          <p>4. Add to Home screen</p>
        </div>
      </div>
    </div>
  );
};

export default MobileInstallInfo;
