import React, { Component } from "react";
import axios from "axios";
import "./Home.scss";
import HartaRomania from "../../_shared/HartaRomania/HartaRomania";
import { Spin } from "antd";
import { CoffeeOutlined } from "@ant-design/icons";
import { Button } from "antd";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      data: {},
      countyData: [],
      countyLoader: true,
      infoLoader: true
    };
  }

  componentDidMount() {
    axios
      .get("https://coronavirus-19-api.herokuapp.com/countries")
      .then(response => {
        const dataForRomania = response.data.filter(
          item => item.country === "Romania"
        )[0];

        this.setState({
          data: dataForRomania,
          infoLoader: false
        });
      });

    axios
      .get(
        "https://services7.arcgis.com/I8e17MZtXFDX9vvT/arcgis/rest/services/Coronavirus_romania/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Judete%20asc&resultOffset=0&resultRecordCount=42&cacheHint=true"
      )
      .then(response => {
        const mappedArray = response.data.features.map(item => item.attributes);

        this.setState({
          countyData: mappedArray,
          countyLoader: false
        });
      });
  }

  componentWillUnmount() {}

  render() {
    const { data } = this.state;

    return (
      <div className="HomeWrapper">
        <Button
          style={{
            fontSize: "10px",
            color: "white",
            background: "transparent",
            padding: "1px",
            position: "absolute",
            right: "35px",
            top: "4px"
          }}
        >
          Mobile Install Info
        </Button>
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="donate"
          href="https://www.patreon.com/trofinSorin"
        >
          <CoffeeOutlined />
          <span
            style={{ marginLeft: "0.3rem", marginTop: "5px", color: "white" }}
          >
            Doneaza pentru sustinerea site-ului
          </span>
        </a>
        <h1 style={{ textAlign: "center", fontSize: "50px", marginTop: "0" }}>
          CoronaRoStatus COVID19 in Romania
        </h1>
        <div className="wrapper">
          <div className="info-wrapper" style={{ position: "relative" }}>
            {!this.state.infoLoader ? (
              !Object.keys(data ? data : {}).length ? (
                <h1>
                  No data for the moment. Please check again in a few moments!{" "}
                </h1>
              ) : (
                <div className="info">
                  <h2 style={{ fontSize: "32px" }}>
                    Total Cazuri:{" "}
                    <span style={{ color: "red" }}>{data.cases}</span>
                  </h2>
                  <h2 style={{ fontSize: "32px" }}>
                    Activi: <span style={{ color: "red" }}>{data.active}</span>
                  </h2>
                  <h2 style={{ fontSize: "32px" }}>
                    Cazuri aparute astazi:{" "}
                    <span style={{ color: "red" }}>{data.todayCases}</span>
                  </h2>
                  <h2 style={{ fontSize: "32px" }}>
                    Cazuri Recuperate:{" "}
                    <span style={{ color: "red" }}>{data.recovered}</span>
                  </h2>
                  <h2 style={{ fontSize: "32px" }}>
                    Cazuri Critice:{" "}
                    <span style={{ color: "red" }}>{data.critical}</span>
                  </h2>
                  <h2 style={{ fontSize: "32px" }}>
                    Total Decese:{" "}
                    <span style={{ color: "red" }}>{data.deaths}</span>
                  </h2>
                  <h2 style={{ fontSize: "32px" }}>
                    Total Decese Astazi:{" "}
                    <span style={{ color: "red" }}>{data.todayDeaths}</span>
                  </h2>
                </div>
              )
            ) : (
              <Spin size="large" />
            )}
          </div>

          <div className="map">
            {!this.state.countyLoader ? (
              this.state.countyData.length > 0 ? (
                <HartaRomania countyData={this.state.countyData}></HartaRomania>
              ) : (
                <h1>
                  No data available for the moment, please check again in a few
                  moments
                </h1>
              )
            ) : (
              <Spin size="large" />
            )}
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  // bla: PropTypes.string,
};

Home.defaultProps = {
  // bla: 'test',
};

export default Home;
