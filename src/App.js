import React from 'react';
import './App.css';
import Router from './router/Router';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div className="App">
        <Router/>
      </div>
    );
  }
}

export default App;
