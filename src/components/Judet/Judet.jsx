import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
//import { Test } from './Judet.styles';
import axios from 'axios';

const Judet = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://services7.arcgis.com/I8e17MZtXFDX9vvT/arcgis/rest/services/Coronavirus_romania/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Judete%20asc&resultOffset=0&resultRecordCount=42&cacheHint=true').then(response => {
      const mappedArray = response.data.features.map(item => item.attributes);

     setData(mappedArray);
    })
  }, []);

  return (
    <div className="JudetWrapper">
      Judet
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
