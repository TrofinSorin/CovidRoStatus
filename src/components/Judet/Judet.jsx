import React, { useState, useLayoutEffect, Suspense } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import "./Judet.scss";
import { Spin } from "antd";

function loadCounty(name) {
  const Component = React.lazy(() =>
    import(`../../_shared/Judete/${name}.jsx`)
  );

  return Component;
}

const Judet = props => {
  let { id, countyName } = useParams();
  let history = useHistory();
  const [countyData, setCountyData] = useState({});
  let MapComponent = loadCounty(countyName);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);

    axios
      .get(
        "https://services7.arcgis.com/I8e17MZtXFDX9vvT/arcgis/rest/services/Coronavirus_romania/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Judete%20asc&resultOffset=0&resultRecordCount=42&cacheHint=true"
      )
      .then(response => {
        const mappedArray = response.data.features.map(item => item.attributes);
        const county = mappedArray.filter(item => item.SIRUTA_judet == id)[0];

        setCountyData(county);
      });
  }, []);

  return (
    <div className="JudetWrapper">
      <Suspense
        fallback={
          <Spin
            style={{ position: "absolute", top: "50%", left: "50%" }}
            size="large"
          />
        }
      >
        <span className="county-container">
          <h3
            onClick={() => history.push("/")}
            style={{ cursor: "pointer", fontSize: "2rem" }}
          >
            {"<< Inapoi la harta"}
          </h3>
          <h1 style={{ fontSize: "55px" }}>Judet: {countyData.Judete}</h1>
          <h2 style={{ fontSize: "32px" }}>
            Regiune dezvoltare:{" "}
            <span style={{ color: "red" }}>
              {countyData.Regiune_dezvoltare}
            </span>
          </h2>
          <h2 style={{ fontSize: "32px" }}>
            Populatie:{" "}
            <span style={{ color: "red" }}>{countyData.Populatie}</span>
          </h2>
          <h2 style={{ fontSize: "32px" }}>
            Cazuri confirmate:{" "}
            <span style={{ color: "red" }}>{countyData.Cazuri_confirmate}</span>
          </h2>
          <h2 style={{ fontSize: "32px" }}>
            Persoane in carantina:{" "}
            <span style={{ color: "red" }}>
              {countyData.Persoane_in_carantina}
            </span>
          </h2>
          <h2 style={{ fontSize: "32px" }}>
            Persoane izolate:{" "}
            <span style={{ color: "red" }}>{countyData.Persoane_izolate}</span>
          </h2>
          <h2 style={{ fontSize: "32px" }}>
            Persoane decedate:{" "}
            <span style={{ color: "red" }}>{countyData.Persoane_decedate}</span>
          </h2>
        </span>

        <div className="county-map" style={{ pointerEvents: "none" }}>
          <MapComponent />
        </div>
      </Suspense>
    </div>
  );
};

export default Judet;
