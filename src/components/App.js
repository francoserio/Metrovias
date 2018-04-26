import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import Clock from './Clock';
import Lineas from './Lineas';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Bienvenido a la ReactApp de Metrovias</h1>
        </header>
        <img src="/images/metrovias-logo.png" alt="metrovias-logo" />
        <Clock />
        <Lineas />
      </div>
    );
  }
}

export default App;
