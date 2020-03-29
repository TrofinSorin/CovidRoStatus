import React, { useState } from "react";
import { Spin } from "antd";
import { useEffect } from "react";
import axios from "axios";
import "./CountriesTable.scss";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";

const useSortableData = (
  items,
  config = { key: "cases", direction: "descending" }
) => {
  const [sortConfig, setSortConfig] = React.useState(config);

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = key => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

const CountriesTable = props => {
  const [countries, setCountries] = useState([]);
  const [countriesLoader, setCountriesLoader] = useState(true);
  const { items, requestSort, sortConfig } = useSortableData(countries);

  const getClassNamesFor = name => {
    if (!sortConfig) {
      return;
    }

    return sortConfig.key === name ? sortConfig.direction : "";
  };

  const showIcon = direction => {
    switch (direction) {
      case "ascending":
        return <CaretDownOutlined />;
      case "descending":
        return <CaretUpOutlined />;
      default:
        return null;
    }
  };

  useEffect(() => {
    axios
      .get("https://coronavirus-19-api.herokuapp.com/countries")
      .then(response => {
        setCountries(response.data);
        setCountriesLoader(false);
      });
  }, []);

  return (
    <div className="CountriesTableWrapper">
      {countriesLoader ? (
        <Spin size="large"></Spin>
      ) : (
        <table>
          <thead>
            <tr>
              <th
                style={{ cursor: "pointer" }}
                onClick={() => requestSort("country")}
                className={getClassNamesFor("country") + " labels"}
              >
                <span>Tara</span>
                {showIcon(getClassNamesFor("country"))}
              </th>
              <th
                style={{ cursor: "pointer" }}
                onClick={() => requestSort("cases")}
                className={getClassNamesFor("cases") + " labels"}
              >
                <span>Total Cazuri</span>
                {showIcon(getClassNamesFor("cases"))}
              </th>
              <th
                style={{ cursor: "pointer" }}
                onClick={() => requestSort("todayCases")}
                className={getClassNamesFor("todayCases") + " labels"}
              >
                <span>Cazuri Astazi</span>
                {showIcon(getClassNamesFor("todayCases"))}
              </th>
              <th
                style={{ cursor: "pointer" }}
                onClick={() => requestSort("active")}
                className={getClassNamesFor("active") + " labels"}
              >
                <span>Total Activi</span>
                {showIcon(getClassNamesFor("active"))}
              </th>
              <th
                style={{ cursor: "pointer" }}
                onClick={() => requestSort("deaths")}
                className={getClassNamesFor("deaths") + " labels"}
              >
                <span>Decese</span>
                {showIcon(getClassNamesFor("deaths"))}
              </th>
              <th
                style={{ cursor: "pointer" }}
                onClick={() => requestSort("todayDeaths")}
                className={getClassNamesFor("todayDeaths") + " labels"}
              >
                <span>Decese Astazi</span>
                {showIcon(getClassNamesFor("todayDeaths"))}
              </th>
            </tr>
          </thead>

          <tbody className="relative">
            {items.map(item => (
              <tr key={item.country}>
                <th>{item.country}</th>
                <th>{item.cases}</th>
                <th>{item.todayCases}</th>
                <th>{item.active}</th>
                <th>{item.deaths}</th>
                <th>{item.todayDeaths}</th>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CountriesTable;
