import React, { Component } from 'react';
import classes from './App.css';
import Person from './Person/Person.jsx';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

class App extends Component {
  state = {
    persons: [
      {id: 'asfa1', name: "Max", age: 28},
      {id: 'vasdf1', name: "Manu", age: 29},
      {id: 'asdf11', name: "Stephanie", age: 26}
    ],
    button: "unclicked",
    showPersons: false
  }

  deletePersonHandler = (personIndex) => {
    // should not change original state. should make changes on a copy and then repoint;
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons]; // modern array copying of array
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };
    // const person = Object.assign({}, this.state.persons[personIndex]); does the same thing but in ES5
    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState( {persons: persons} );
  }

  togglePersonsHandler = () => {
  // this sets up rather than togglerPersonsHandler() = ensures this can be used
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  // React can't have if statement in its return but you can use turnary
  // Should put the conditional in the render instead of return
  render() {
    let persons = null;
    let btnClass = '';

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <ErrorBoundary key={person.id}>
              <Person
                click={() => this.deletePersonHandler(index)}
                name={person.name}
                age={person.age}
                changed={(event) => this.nameChangedHandler(event, person.id)} />
            </ErrorBoundary>
        })}
        </div>
      );
      btnClass = classes.Red;
    }

    const assignedClasses = [];
    if (this.state.persons.length <= 2){
      assignedClasses.push(classes.red);
    }
    if (this.state.persons.length <= 1){
      assignedClasses.push(classes.bold);  // classes = ['red', 'bold']
    }

    return (

        <div className={classes.App}>
          <h1> Hi, this is the App </h1>
          <p className={assignedClasses.join(' ')}> This is really working! </p>
          <button
            className={btnClass}
            onClick={this.togglePersonsHandler}> click this
          </button>
          {persons}

        </div>

    );
    // return React.createElement('div', {className:'App'}, React.createElement('h1', null, "Hi, this is the App"));
  }
}

// higher order component
export default App;
