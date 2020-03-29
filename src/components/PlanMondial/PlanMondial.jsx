import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./PlanMondial.scss";
import ReactTooltip from "react-tooltip";
import MapChart from "./MapChart/MapChart";
import CountriesTable from "./CountriesTable/CountriesTable";

const PlanMondial = props => {
  let history = useHistory();
  const [content, setContent] = useState("");

  return (
    <div className="PlanMondialWrapper">
      <h3
        onClick={() => history.push("/")}
        style={{ cursor: "pointer", fontSize: "2rem" }}
      >
        {"<< Inapoi la harta"}
      </h3>

      <MapChart content={content} setTooltipContent={setContent}></MapChart>
      <ReactTooltip html={true} multiline={true}>
        {content}
      </ReactTooltip>

      <div className="countries-table">
        <CountriesTable></CountriesTable>
      </div>
    </div>
  );
};

export default PlanMondial;
