import React from 'react';
import classes from './Cockpit.css';

// use functional components as often as possible because they cannot manage state
// they only present information 

const cockpit = (props) => {
  let btnClass = '';
  const assignedClasses = [];
  if (props.persons.length <= 2){
    assignedClasses.push(classes.red);
  }
  if (props.persons.length <= 1){
    assignedClasses.push(classes.bold);  // classes = ['red', 'bold']
  }
  if (props.showPersons){
    btnClass = classes.Red;
  }

  return (
    <div className={classes.Cockpit}>
      <h1> Hi, this is the App </h1>
      <p className={assignedClasses.join(' ')}> This is really working! </p>
      <button
        className={btnClass}
        onClick={props.clicked}> click this
      </button>
    </div>
  )
};

export default cockpit;
