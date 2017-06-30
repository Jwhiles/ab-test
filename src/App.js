import React, { Component } from 'react';
import optimizely from 'optimizely-client-sdk';
import './App.css';

var optimizelyClientInstance;
var url = 'https://cdn.optimizely.com/json/8463270712.json';


class App extends Component {
  constructor(props) {
    super(props);
    this.state =  { variation: null };
  }
  componentDidMount() {
    this.getVariation();
  }
  getVariation() {
    window.fetch(url, { mode: 'cors' })
      .then((response) => response.json())
      .then((datafile) => {
        optimizelyClientInstance = optimizely.createInstance({
          datafile: datafile,
          skipJSONValidation: true
        });
        })
        .then(() => {
          const id = Math.floor(Math.random() * 1000) + 1  
          const variation = optimizelyClientInstance.activate('testing', String(id));
          this.setState({
            variation 
          });
        })
  }
  render() {
    const { variation } = this.state;
    return (
      <div className="App">
        <div className="App-header">
          <h2>this is an experiment experiment</h2>
        </div>
        <p className="App-intro">
          {variation === "different" ? "you are different" : "you are normal"}
        </p>
      </div>
    );
  }
}

export default App;
