import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
constructor() {
  super();

  this.state = {
    cars: []
  }
}

getCar = () => {
  console.log("running function")
  axios.get("https://joes-autos.herokuapp.com/api/vehicles/").then(allCars => {
    this.setState({
      cars: allCars.data
    });
  }).catch(err => alert('No car found'))
}

deleteCar = (id) => {
  console.log("delete car")
  axios.delete(`https://joes-autos.herokuapp.com/api/vehicles/${id}` ).then(deleteCar => {
    this.setState({
      cars: deleteCar.data.vehicles
    })
  }).catch(err => alert("Cannont delete car"))
}

addCar = () => {
  let addCar = {
    id: this.id.value,
    make: this.make.value,
    model: this.model.value,
    year: this.year.value,
    color: this.year.value,
    price: this.price.value
  };

  axios.post(`https://joes-autos.herokuapp.com/api/vehicles/`, addCar).then(addCar => {
    this.setState({
      cars: addCar.data.vehicles
    })
  })
}


  render() {
    console.log(this.state.cars)
    const mappedCars = this.state.cars.map( cars => {
      return (
        <div className = "car-container">
          <p className= "car-info"><span>Car Make:</span> {cars.make}</p> 
          <p className= "car-info"><span>Car Model:</span> {cars.model}</p>
          <p className= "car-info"><span>Car Year:</span> {cars.year}</p>
          <p className= "car-info"><span>Car Color:</span> {cars.color}</p>
          <p className= "car-info"><span>Car Price:</span> {cars.price}</p>

          <button className = "delete-button" onClick ={() => {this.deleteCar(cars.id)}}>Delete Car</button>
          <button className = "get-car-button" onClick ={this.addCar}>Add Car</button>
          <br></br>
        </div>
      
      )
    })

    return (
      <div className="App">
        <h1>Cars API Weekend Practice</h1>
        <button className="get-car-button" onClick= {this.getCar}>Get your car</button>
        {mappedCars}
      </div>
    );
  }

}

export default App;
