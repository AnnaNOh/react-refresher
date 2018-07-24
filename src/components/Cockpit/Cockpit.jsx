import React from 'react';
import classes from './Cockpit.css';

const cockpit = (props) => {
  const assignedClasses = [];
  if (props.persons.length <= 2){
    assignedClasses.push(classes.red);
  }
  if (props.persons.length <= 1){
    assignedClasses.push(classes.bold);  // classes = ['red', 'bold']
  }

  return (
    <div className={classes.Cockpit}>
      <h1> Hi, this is the App </h1>
      <p className={assignedClasses.join(' ')}> This is really working! </p>
      <button
        className={btnClass}
        onClick={this.togglePersonsHandler}> click this
      </button>
    </div>
  )
};

export default cockit;
