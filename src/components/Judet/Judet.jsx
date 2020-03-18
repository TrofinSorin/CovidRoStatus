import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
//import { Test } from './Judet.styles';
import axios from 'axios';
import { useParams} from "react-router";
import { useHistory } from "react-router-dom";

const Judet = (props) => {
  let { id } = useParams();
  let history = useHistory();
  const [countyData, setCountyData] = useState({});

  useEffect(() => {
    axios.get('https://services7.arcgis.com/I8e17MZtXFDX9vvT/arcgis/rest/services/Coronavirus_romania/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Judete%20asc&resultOffset=0&resultRecordCount=42&cacheHint=true').then(response => {
      const mappedArray = response.data.features.map(item => item.attributes);
      const county = mappedArray.filter(item => item.SIRUTA_judet == id)[0];

      setCountyData(county);
    })
  }, []);

  return (
    <div className="JudetWrapper">
      <h3 onClick={() => history.push('/')} style={{ cursor: 'pointer'}}>{ '<< Inapoi la harta'}</h3>
      <h1 style={{ fontSize: '55px'}}>Judet: {countyData.Judete}</h1>
      <h2 style={{ fontSize: '32px'}}>Regiune dezvoltare: <span style={{ color: 'red'}}>{countyData.Regiune_dezvoltare}</span></h2>
      <h2 style={{ fontSize: '32px'}}>Populatie: <span style={{ color: 'red'}}>{countyData.Populatie}</span></h2>
      <h2 style={{ fontSize: '32px'}}>Cazuri confirmate: <span style={{ color: 'red'}}>{countyData.Cazuri_confirmate}</span></h2>
      <h2 style={{ fontSize: '32px'}}>Persoane in carantina: <span style={{ color: 'red'}}>{countyData.Persoane_in_carantina}</span></h2>
      <h2 style={{ fontSize: '32px'}}>Persoane izolate: <span style={{ color: 'red'}}>{countyData.Persoane_izolate}</span></h2>
      <h2 style={{ fontSize: '32px'}}>Persoane decedate: <span style={{ color: 'red'}}>{countyData.Persoane_decedate}</span></h2>
      <h2 style={{ fontSize: '32px'}}>Persoane vindecate: <span style={{ color: 'red'}}>{countyData.Persoane_vindecate}</span></h2>
      <h2 style={{ fontSize: '32px'}}>Probe in asteptare: <span style={{ color: 'red'}}>{countyData.Probe_in_asteptare}</span></h2>
      <h2 style={{ fontSize: '32px'}}>Cazuri infirmate: <span style={{ color: 'red'}}>{countyData.Cazuri_infirmate}</span></h2>
    </div>
  );
}

Judet.propTypes = {
  // bla: PropTypes.string,
};

Judet.defaultProps = {
  // bla: 'test',
};

export default Judet;
