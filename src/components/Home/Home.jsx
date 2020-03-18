import React, { Component } from 'react';
import axios from 'axios';
import './Home.scss';
import HartaRomania from '../../_shared/HartaRomania/HartaRomania';

class Home extends Component { 
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      data: {},
      countyData: []
    };
  }

  componentDidMount() {
    axios.get('https://coronavirus-19-api.herokuapp.com/countries').then(response => {
      const dataForRomania = response.data.filter(item => item.country === 'Romania')[0];

      this.setState({
        data: dataForRomania
      })
    })

    axios.get('https://services7.arcgis.com/I8e17MZtXFDX9vvT/arcgis/rest/services/Coronavirus_romania/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Judete%20asc&resultOffset=0&resultRecordCount=42&cacheHint=true').then(response => {
      const mappedArray = response.data.features.map(item => item.attributes);

      this.setState({
        countyData: mappedArray
      });
    })
  }

  componentWillUnmount() {
  }

  render () {
    const { data } = this.state;

    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return (
      <div className="HomeWrapper">
        <h1 style={{ textAlign: 'center', fontSize: '50px'}}>Coronavirus Romania Status</h1>
        <div className='wrapper'>
          <div className='info'>
            <h2 style={{ fontSize: '32px'}}>Total Cazuri: <span style={{ color: 'red'}}>{data.cases}</span></h2>
            <h2 style={{ fontSize: '32px'}}>Activi: <span style={{ color: 'red'}}>{data.active}</span></h2>
            <h2 style={{ fontSize: '32px'}}>Cazuri aparute astazi: <span style={{ color: 'red'}}>{data.todayCases}</span></h2>
            <h2 style={{ fontSize: '32px'}}>Cazuri Recuperate: <span style={{ color: 'red'}}>{data.recovered}</span></h2>
            <h2 style={{ fontSize: '32px'}}>Cazuri Critice: <span style={{ color: 'red'}}>{data.critical}</span></h2>
            <h2 style={{ fontSize: '32px'}}>Total Decese: <span style={{ color: 'red'}}>{data.deaths}</span></h2>
            <h2 style={{ fontSize: '32px'}}>Total Decese Astazi: <span style={{ color: 'red'}}>{data.todayDeaths}</span></h2>
          </div>
          <div className='map'>
            <HartaRomania countyData={this.state.countyData}></HartaRomania>
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
