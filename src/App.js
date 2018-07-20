import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person.jsx';


class App extends Component {
  state = {
    persons: [
      {name: "Max", age: 28},
      {name: "Manu", age: 29},
      {name: "Stephanie", age: 26}
    ],
    button: "unclicked"
  }

  switchNameHandler = () => {
    // console.log("Was clicked")
    if (this.state.button === "unclicked") {
      this.setState({button: "clicked"});
    } else {
      this.setState({button: "unclicked"});
    }
  }

  nameChangedHandler = (event) => {
    this.setState( {
      persons: [
        {name: "Max", age: 28},
        {name: event.target.value, age: 29},
        {name: "Stephanie", age: 26}
      ]
    })
  }

  render() {
    return (
      <div className="App">
        <h1> Hi, this is the App </h1>
        <button onClick={() => this.switchNameHandler()}> click this </button>
        <Person
          name={this.state.persons[0].name}
          age={this.state.persons[0].age} />
        <Person
          name={this.state.persons[1].name}
          age={this.state.persons[1].age}
          click={this.switchNameHandler.bind(this, 'Max!')}
          changed={this.nameChangedHandler}> Hi there. </Person>
        <Person
          name={this.state.persons[2].name}
          age={this.state.persons[2].age} />
    </div>
    );
    // return React.createElement('div', {className:'App'}, React.createElement('h1', null, "Hi, this is the App"));
  }
}

export default App;
