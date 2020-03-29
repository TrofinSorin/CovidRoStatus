import React, { useState, useEffect } from "react";
import axios from "axios";

const NivelJudete = props => {
  const [countyLoader, setCountyLoader] = useState(true);
  const [countyData, setCountyData] = useState([]);

  useEffect(() => {
    getCountyData();
  }, []);

  const getCountyData = () => {
    axios
      .get("https://covid19.geo-spatial.org/api/dashboard/getCasesByCounty")
      .then(countyData => {
        console.log("countyData:", countyData);
        setCountyData(countyData.data.data.data);
        setCountyLoader(false);
      });
  };

  return <div className="NivelJudeteWrapper">NivelJudete</div>;
};

export default NivelJudete;
