import React, { Component } from 'react';

import Excercise from './Excercise.js';

class Workout extends Component {

  onFormSubmit(e) {
    e.preventDefault();

    var name = this.excerciseInput.value;

    var excercise = {
      key: Date.now(),
      excercise: name,
      day: 1,
      sets: "",
      reps: "",
      weight: ""
    }

    this.props.addExcercise(excercise, this.props.programId);

  }

  render() {
    const programId = this.props.programId;
    const excercises = this.props.excercises;

    return (
      <div className="Workout">

        <div className="excercises">
          {excercises.length !== 0 ?

            excercises.map(function(excercise, i) {

              return <Excercise
                      key={'excercise-'+ (i + 1)}
                      programId={programId}
                      excercise={excercise} />
                  }) : <div className="box">
                        There are no excercises for this day. Go to the edit page
                        to add new excercises.
                      </div>}
        </div>
      </div>
    )
  }

}
export default Workout;
