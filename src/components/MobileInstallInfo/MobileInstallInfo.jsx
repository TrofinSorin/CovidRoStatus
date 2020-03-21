import React from "react";
import { MoreOutlined } from "@ant-design/icons";
import "./MobileInstallInfo.scss";
import { useHistory } from "react-router-dom";

const MobileInstallInfo = props => {
  let history = useHistory();

  return (
    <div className="MobileInstallInfoWrapper">
      <h3
        onClick={() => history.push("/")}
        style={{ cursor: "pointer", fontSize: "2rem" }}
      >
        {"<< Inapoi la harta"}
      </h3>

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
