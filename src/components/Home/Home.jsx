import React, { Component } from "react";
import axios from "axios";
import "./Home.scss";
import HartaRomania from "../../_shared/HartaRomania/HartaRomania";
import { Spin } from "antd";
import { CoffeeOutlined } from "@ant-design/icons";
import Footer from "../Footer/Footer";
import { Button } from "antd";
import { Select } from "antd";
import { JUDETE } from "../../constants/counties";

const { Option } = Select;

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      data: {},
      countyData: [],
      countyLoader: true,
      infoLoader: true,
      quarantinePeople: {},
      isolatedPeople: {}
    };
  }

  handleChange = value => {
    this.redirectToCountry(value);
  };

  redirectToMobileInstallInfo = () => {
    this.props.history.push(`/mobile-install-info`);
  };

  redirectToCountry = name => {
    const getObj = this.state.countyData.filter(item => item.Judete === name)[0]
      ? this.state.countyData.filter(item => item.Judete === name)[0]
      : {};
    const siruta = getObj.SIRUTA_judet;

    if (siruta) {
      this.props.history.push(`/judet/${siruta}/${getObj.Judete}`);
    } else {
      this.props.history.push(`/`);
    }
  };

  componentDidMount() {
    window.scrollTo(0, 0);

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

    axios
      .all([
        axios.get(
          "https://services7.arcgis.com/I8e17MZtXFDX9vvT/arcgis/rest/services/Coronavirus_romania/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22Persoane_in_carantina%22%2C%22outStatisticFieldName%22%3A%22value%22%7D%5D&cacheHint=true"
        ),
        axios.get(
          "https://services7.arcgis.com/I8e17MZtXFDX9vvT/arcgis/rest/services/Coronavirus_romania/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22Persoane_izolate%22%2C%22outStatisticFieldName%22%3A%22value%22%7D%5D&cacheHint=true"
        )
      ])
      .then(
        axios.spread((quarantinePeople, isolatedPeople) => {
          this.setState({
            quarantinePeople:
              quarantinePeople.data.features[0] &&
              quarantinePeople.data.features[0].attributes
                ? quarantinePeople.data.features[0].attributes.value
                : null,
            isolatedPeople:
              isolatedPeople.data.features[0] &&
              isolatedPeople.data.features[0].attributes
                ? isolatedPeople.data.features[0].attributes.value
                : null
          });
        })
      );
  }

  componentWillUnmount() {}

  render() {
    const { data, quarantinePeople, isolatedPeople } = this.state;

    return (
      <div className="HomeWrapper">
        <Button
          className="mobile-install-info"
          onClick={() => this.redirectToMobileInstallInfo()}
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
        <div
          className="top-donate"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <a
            href="https://www.daruiesteviata.ro/?fbclid=IwAR1ap3Wk6CiAFkf0Y5Kfhc_HRsAb9mFrgE8GxJ7FlNlsHX6dpKxqYPs4W7Y"
            rel="noopener noreferrer"
            target="_blank"
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              color: "white"
            }}
          >
            Sprijina ONG pentru Coronavirus
          </a>

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
        </div>

        <h1 style={{ textAlign: "center", fontSize: "50px", marginTop: "0" }}>
          Covid19RoStatus Monitorizare Coronavirus in Romania
        </h1>
        <div className="wrapper">
          <div className="info-wrapper" style={{ position: "relative" }}>
            {!this.state.infoLoader ? (
              !Object.keys(data ? data : {}).length ? (
                <h1>
                  No data for the moment. Please check again in a few moments!
                </h1>
              ) : (
                <div className="info">
                  <h2 style={{ fontSize: "32px" }}>
                    Total Cazuri:
                    <span style={{ color: "red" }}>{data.cases}</span>
                  </h2>
                  <h2 style={{ fontSize: "32px" }}>
                    Activi: <span style={{ color: "red" }}>{data.active}</span>
                  </h2>
                  <h2 style={{ fontSize: "32px" }}>
                    Cazuri aparute astazi:
                    <span style={{ color: "red" }}>{data.todayCases}</span>
                  </h2>
                  <h2 style={{ fontSize: "32px" }}>
                    Cazuri Recuperate:
                    <span style={{ color: "red" }}>{data.recovered}</span>
                  </h2>
                  <h2 style={{ fontSize: "32px" }}>
                    Cazuri Critice:
                    <span style={{ color: "red" }}>{data.critical}</span>
                  </h2>
                  <h2 style={{ fontSize: "32px" }}>
                    Total Decese:
                    <span style={{ color: "red" }}>{data.deaths}</span>
                  </h2>
                  <h2 style={{ fontSize: "32px" }}>
                    Total Decese Astazi:
                    <span style={{ color: "red" }}>{data.todayDeaths}</span>
                  </h2>
                </div>
              )
            ) : (
              <Spin size="large" />
            )}

            {quarantinePeople && quarantinePeople.toString().length ? (
              <h2 style={{ fontSize: "32px" }}>
                Persoane în carantină:
                <span style={{ color: "red" }}>
                  {typeof quarantinePeople === "number"
                    ? quarantinePeople.toString()
                    : null}
                </span>
              </h2>
            ) : null}

            {isolatedPeople && isolatedPeople.toString().length ? (
              <h2 style={{ fontSize: "32px" }}>
                Persoane izolate:
                <span style={{ color: "red" }}>
                  {typeof isolatedPeople === "number"
                    ? isolatedPeople.toString()
                    : null}
                </span>
              </h2>
            ) : null}
          </div>

          <div className="county-selector">
            <Select
              placeholder="Selectati un judet"
              style={{ width: 120 }}
              onChange={this.handleChange}
            >
              {JUDETE.sort((a, b) => a.name.localeCompare(b.name)).map(item => (
                <Option key={item.name} value={item.name}>
                  {item.name}
                </Option>
              ))}
            </Select>
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

        <Footer></Footer>
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
