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
          <p>1. Deschideti Google Chrome</p>
          <p>
            2. Apasati pe <MoreOutlined />
          </p>
          <p>3. Add to Home screen</p>
        </div>

        <h3 style={{ margin: "3rem" }}>Sau</h3>

        <div className="second-method">
          <img
            src={require("../../assets/gifs/mobile-install.gif")}
            alt="loading..."
          />
        </div>
      </div>
    </div>
  );
};

export default MobileInstallInfo;
