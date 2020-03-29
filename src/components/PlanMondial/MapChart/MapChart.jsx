import React, { useState, useEffect, memo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule
} from "react-simple-maps";
import axios from "axios";
import { scaleLinear } from "d3-scale";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

let colorScale;

const MapChart = ({ setTooltipContent, content }) => {
  const [countries, setCountries] = useState([]);
  const [minCases, setMinCases] = useState(0);
  const [maxCases, setMaxCases] = useState(0);

  useEffect(() => {
    axios
      .get("https://coronavirus-19-api.herokuapp.com/countries")
      .then(response => {
        setCountries(response.data);
        setMaxCases(arrayMax(response.data));
        setMinCases(arrayMin(response.data));
      });
  }, []);

  useEffect(() => {
    colorScale = scaleLinear()
      .domain([minCases, maxCases / 2, maxCases])
      .range(["#B2B2FF", "#3232FF", "#000099"]);
  }, [minCases, maxCases]);

  const getCountry = name => {
    const country = countries.filter(item => item.country === name)[0]
      ? countries.filter(item => item.country === name)[0]
      : {};

    return country;
  };

  const arrayMax = array => {
    if (array.length === 0) {
      return;
    }

    return array.reduce((min, b) => Math.max(min, b.cases), array[0].cases);
  };

  const arrayMin = array => {
    if (array.length === 0) {
      return;
    }

    return array.reduce((min, b) => Math.min(min, b.cases), array[0].cases);
  };

  return (
    <div className="MapChartWrapper">
      <ComposableMap
        data-tip={content}
        projectionConfig={{
          rotate: [-10, 0, 0],
          scale: 190
        }}
      >
        <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
        <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map(geo => {
              const d = (countries || []).find(
                item => item.country === geo.properties.NAME
              );

              countries.forEach(item => {
                if (item.country === "USA") {
                  item.country = "United States of America";
                }

                if (item.country === "UK") {
                  item.country = "United Kingdom";
                }
                if (item.country === "S. Korea") {
                  item.country = "South Korea";
                }

                if (item.country === "Dominican Republic") {
                  item.country = "Dominican Rep.";
                }
                if (item.country === "Bosnia and Herzegovina") {
                  item.country = "Bosnia and Herz.";
                }

                if (item.country === "North Macedonia") {
                  item.country = "Macedonia";
                }

                if (item.country === "Equatorial Guinea") {
                  item.country = "Eq. Guinea";
                }

                if (item.country === "Ivory Coast") {
                  item.country = "Côte d'Ivoire";
                }
              });

              setCountries(countries);

              return (
                <Geography
                  style={{ cursor: "pointer" }}
                  className={geo.properties.NAME}
                  key={geo.rsmKey}
                  geography={geo}
                  fill={d && colorScale ? colorScale(d.cases) : "#F5F4F6"}
                  onMouseEnter={() => {
                    setTooltipContent(
                      `${geo.properties.NAME} <br /> 
                      Total Cazuri: ${
                        getCountry(geo.properties.NAME).cases
                          ? getCountry(geo.properties.NAME).cases
                          : 0
                      } <br />
                      Cazuri Active: ${
                        getCountry(geo.properties.NAME).active
                          ? getCountry(geo.properties.NAME).active
                          : 0
                      } <br />
                      Recuperati: ${
                        getCountry(geo.properties.NAME).recovered
                          ? getCountry(geo.properties.NAME).recovered
                          : 0
                      } <br />
                      Cazuri Astazi: ${
                        getCountry(geo.properties.NAME).todayCases
                          ? getCountry(geo.properties.NAME).todayCases
                          : 0
                      } <br />  
                      Decese: ${
                        getCountry(geo.properties.NAME).deaths
                          ? getCountry(geo.properties.NAME).deaths
                          : 0
                      } <br />
                      Decese Astazi: ${
                        getCountry(geo.properties.NAME).todayDeaths
                          ? getCountry(geo.properties.NAME).todayDeaths
                          : 0
                      } <br />
                    `
                    );
                  }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default memo(MapChart);
