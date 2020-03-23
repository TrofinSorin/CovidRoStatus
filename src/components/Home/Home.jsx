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
      arcGisNationalData: {}, // date romania arcGIS
      arcGisCountyData: [], // judete arcGIS
      countyData: [], // date judete
      nationalData: {}, // date romania geo spatial
      countyLoader: true, // loader pentru judete
      infoLoader: true, // loader pentru tara
      quarantinePeople: {}, // persoane in carantina
      isolatedPeople: {}, // persoane izolate
      latestChangeDate: "", // ultima actualizare,
      interval: null
    };
  }

  handleChange = value => {
    this.redirectToCountry(value);
  };

  redirectToMobileInstallInfo = () => {
    this.props.history.push(`/mobile-install-info`);
  };

  redirectToCountry = name => {
    const judet = JUDETE.filter(item => item.name === name)[0];
    const getObj = this.state.arcGisCountyData.filter(
      item => item.Judete === name
    )[0]
      ? this.state.arcGisCountyData.filter(item => item.Judete === name)[0]
      : {};
    const siruta = getObj.SIRUTA_judet;

    if (siruta) {
      this.props.history.push(
        `/judet/${siruta}/${getObj.Judete}/${judet.countyCode}`
      );
    } else {
      this.props.history.push(`/`);
    }
  };

  getCountryData = () => {
    axios
      .all([
        axios.get("https://coronavirus-19-api.herokuapp.com/countries"),
        axios.get(
          "https://covid19.geo-spatial.org/api/dashboard/getGlobalStat"
        ),
        axios.get(
          "https://services7.arcgis.com/I8e17MZtXFDX9vvT/arcgis/rest/services/Coronavirus_romania/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22Persoane_in_carantina%22%2C%22outStatisticFieldName%22%3A%22value%22%7D%5D&cacheHint=true"
        ),
        axios.get(
          "https://services7.arcgis.com/I8e17MZtXFDX9vvT/arcgis/rest/services/Coronavirus_romania/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22Persoane_izolate%22%2C%22outStatisticFieldName%22%3A%22value%22%7D%5D&cacheHint=true"
        )
      ])
      .then(
        axios.spread(
          (countries, romaniaData, quarantinePeople, isolatedPeople) => {
            const geospatialRomaniaData = romaniaData.data.data.data[0];
            const dataForRomania = countries.data.filter(
              item => item.country === "Romania"
            )[0];

            this.setState({
              arcGisNationalData: dataForRomania,
              infoLoader: false,
              nationalData: geospatialRomaniaData,
              latestChangeDate: geospatialRomaniaData["to_char"],
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
          }
        )
      );
  };

  getCountyData = () => {
    axios
      .all([
        axios.get("https://api-covid19.herokuapp.com/sorin"),
        axios.get(
          "https://services7.arcgis.com/I8e17MZtXFDX9vvT/arcgis/rest/services/Coronavirus_romania/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Judete%20asc&resultOffset=0&resultRecordCount=42&cacheHint=true"
        )
      ])
      .then(
        axios.spread((countyData, arcGisCountydata) => {
          const mappedArray = arcGisCountydata.data.features.map(
            item => item.attributes
          );

          this.setState({
            countyData: countyData.data.data.data,
            arcGisCountyData: mappedArray,
            countyLoader: false
          });
        })
      );
  };

  componentDidMount() {
    window.scrollTo(0, 0);

    this.getCountryData();
    this.getCountyData();

    let intervalId = setInterval(() => {
      this.getCountryData();
      this.getCountyData();
    }, 60000);

    this.setState({
      interval: intervalId
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  render() {
    const {
      nationalData,
      arcGisNationalData,
      quarantinePeople,
      isolatedPeople
    } = this.state;

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
              !Object.keys(arcGisNationalData ? arcGisNationalData : {})
                .length ? (
                <h1>
                  No data for the moment. Please check again in a few moments!
                </h1>
              ) : (
                <div className="info">
                  <h2 style={{ fontSize: "32px" }}>
                    Total Cazuri:
                    <span style={{ color: "red" }}>
                      {nationalData.total_case}
                    </span>
                  </h2>
                  <h2 style={{ fontSize: "32px" }}>
                    Activi:
                    <span style={{ color: "red" }}>
                      {nationalData.total_case - nationalData.total_healed}
                    </span>
                  </h2>
                  <h2 style={{ fontSize: "32px" }}>
                    Cazuri aparute astazi:
                    <span style={{ color: "red" }}>
                      {arcGisNationalData.todayCases}
                    </span>
                  </h2>
                  <h2 style={{ fontSize: "32px" }}>
                    Cazuri Recuperate:
                    <span style={{ color: "red" }}>
                      {nationalData.total_healed}
                    </span>
                  </h2>
                  <h2 style={{ fontSize: "32px" }}>
                    Total Decese:
                    <span style={{ color: "red" }}>
                      {nationalData.total_dead}
                    </span>
                  </h2>
                  {/* <h2 style={{ fontSize: "32px" }}>
                    Total Decese Astazi:
                    <span style={{ color: "red" }}>
                      {arcGisNationalData.todayDeaths}
                    </span>
                  </h2> */}
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
                    : "N/A"}
                </span>
              </h2>
            ) : null}

            {isolatedPeople && isolatedPeople.toString().length ? (
              <h2 style={{ fontSize: "32px" }}>
                Persoane izolate:
                <span style={{ color: "red" }}>
                  {typeof isolatedPeople === "number"
                    ? isolatedPeople.toString()
                    : "N/A"}
                </span>
              </h2>
            ) : null}
          </div>

          <div className="county-selector">
            <Select
              placeholder="Selectati un judet"
              style={{ width: 120 }}
              onChange={event => this.handleChange(event)}
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
                <>
                  <HartaRomania
                    countyData={this.state.countyData}
                    arcGisCountyData={this.state.arcGisCountyData}
                  ></HartaRomania>
                </>
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

        <Footer latestChangeDate={this.state.latestChangeDate}></Footer>
      </div>
    );
  }
}

export default Home;
