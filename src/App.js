import React, { Component } from 'react';
import logo from './logo.svg';
// import './App.scss';
import './App.css';
// import './layout/layout.scss';
import './layout/layout.css';
import {Link} from 'react-router-dom'


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Link to="/calendar">日历</Link>
        <Link to="/index/passbook">首页</Link>
      </div>
    );
  }
}

export default App;
