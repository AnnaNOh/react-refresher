import React, { PureComponent } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import WithClass from '../components/hoc/WithClass';

// PureComponent has shouldComponentUpdate in it already
// only use PureComponent for parent components that need the check
// children whose parents checked for them shouldnt have it
class App extends PureComponent {
  constructor(props){
    // if you have constructor, you must have super(props) or it won't work
    super(props);
    console.log('[App.js] Inside Constructor', props);
    this.state = {
      persons: [
        {id: 'asfa1', name: "Max", age: 28},
        {id: 'vasdf1', name: "Manu", age: 29},
        {id: 'asdf11', name: "Stephanie", age: 26}
      ],
      button: "unclicked",
      showPersons: false
    }
  }

  componentWillMount() {
    console.log('[App.js] Inside componentWillMount');
  }

  componentDidMount(){
    console.log('[App.js] Inside componentDidMount');
  }

  // this is how modern react initializes state. you can do it like we did above too
  // state = {
  //   persons: [
  //     {id: 'asfa1', name: "Max", age: 28},
  //     {id: 'vasdf1', name: "Manu", age: 29},
  //     {id: 'asdf11', name: "Stephanie", age: 26}
  //   ],
  //   button: "unclicked",
  //   showPersons: false
  // }

  componentWillReceiveProps(nextProps){
    console.log('[UPDATE App.js] Inside componentWillReceiveProps', nextProps);
  }

  // shouldComponentUpdate(nextProps, nextState){
  //   console.log('[UPDATE App.js] Inside shouldComponentUpdate', nextProps, nextState);
  //   // not a deep check. but that's okay because we reassign props
  //   return nextState.persons !== this.state.persons ||
  //     nextState.showPersons !== this.state.showPersons;
  // }

  componentWillUpdate(nextProps, nextState){
    console.log('[UPDATE App.js] Inside componentWillUpdate', nextProps, nextState);
  }

  componentDidUpdate(){
    console.log('[UPDATE App.js] Inside componentDidUpdate');
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
    // const person = Object.assign({}, this.state.persons[personIndex]); does the same thing but in ES5
    const person = {
      ...this.state.persons[personIndex]
    };
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
    console.log('[App.js] Inside render()');
    let persons = null;

    if (this.state.showPersons) {
      persons = <Persons
            persons={this.state.persons}
            clicked={this.deletePersonHandler}
            changed={this.nameChangedHandler} />;
    }

    return (
        <WithClass classes={classes.App}>
          <button onClick={()=> {this.setState({showPersons: true})}}> Show Persons </button>
          <Cockpit
            showPersons={this.state.showPersons}
            persons={this.state.persons}
            clicked={this.togglePersonsHandler} />
          {persons}
        </WithClass>
    );
    // return React.createElement('div', {className:'App'}, React.createElement('h1', null, "Hi, this is the App"));
  }
}

// higher order component
export default App;
