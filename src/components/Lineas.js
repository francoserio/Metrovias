import React, { Component } from 'react';
import moment from 'moment';
import '../App.css';

function colorLinea(exp) {
  switch(exp) {
      case "A":
          return "lightblue";
      case "B":
          return "red";
      case "C":
          return "blue";
      case "D":
          return "green";
      case "E":
          return "#8956f7";
      case "U":
          return "#ff9b11";
      case "P":
          return "#ffbf11";
      case "H":
          return "yellow";
  }
}

class Lineas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      lineas: []
    };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => fetch("http://www.metrovias.com.ar/Subterraneos/Estado?site=Metrovias")
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              lineas: result
            });
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        ),
      1000
      );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    const { error, isLoaded, lineas } = this.state;
    if (error) {
      console.error(error.message);
      return <div>No se ha podido cargar la información</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        lineas.map((linea) =>
          <Linea
            key={linea.LineName.toString()}
            rama={linea.LineName.toString()}
            status={linea.LineStatus.toString()}
            lineFreq={linea.LineFrequency.toString()}
          />
        )
      );
    }
  }
}

class Linea extends Component {
  constructor () {
      super()
      this.state = { isActive: false }
      this.onClick = this.onClick.bind(this);
  }

  onClick () {
    this.setState(prevState => ({
      isActive: !prevState.isActive
    }));
  }

  render() {
    const letra = this.props.rama;
    const minutos = Math.round(parseInt(this.props.lineFreq) / 60);
    const isActive = this.state.isActive;

    return (
      <div>
        <div>
          <button onClick={this.onClick} className="Linea" style={{backgroundColor: colorLinea(letra)}}>
            Linea {this.props.rama}
          </button>
        </div>
        { isActive ? (
          <div className="DescLinea">
            <p>Estado: {this.props.status}</p>
            <p>Frecuencia: { (isNaN(minutos)) ? "---" : minutos } minutos</p>
            <p>Proximo tren: { (isNaN(minutos)) ? "---" : (moment().add(minutos, 'm')).format("HH:mm") }</p>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

export default Lineas;
