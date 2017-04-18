import React, { Component } from 'react';

import UpdateProgram from './UpdateProgram.js';
import AddExercise from './AddExercise.js';
import EditExercises from './EditExercises.js';

class Edit extends Component {

  render() {
    console.log(this.props.program);
    return (
      <div className="Edit">

        <UpdateProgram
          program={this.props.program}
          updateProgram={this.props.updateProgram} />

        <AddExercise
          addExcercise={this.props.addExcercise}
          program={this.props.program} />

        <EditExercises
          program={this.props.program}
          updateExcercise={this.props.updateExcercise}
          deleteExcercise={this.props.deleteExcercise} />

      </div>
    )
  }

}

export default Edit;
