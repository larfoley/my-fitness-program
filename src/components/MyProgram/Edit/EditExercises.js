import React from 'react';

class EditExcercise extends React.Component {

  onSubmit(e) {
    e.preventDefault();
    const programId = this.props.program.key;
    const excerciseId = this.props.excercise.id;
    const values = {};
    values.name = this.nameInput.value;
    values.sets = this.setsInput.value;
    values.reps = this.repsInput.value;
    values.weight = this.weightInput.value;
    values.notes = this.notesInput.value;
    this.props.updateExcercise(programId, excerciseId, values);
  }

  onDelete() {
    this.props.deleteExcercise(this.props.programId, this.props.excerciseId);
  }

  render() {
    const excercise = this.props.excercise;

    return (
      <div className="EditExcercise">
        <header className="u-clearfix">
          <h3 className="u-float-left">Day {excercise.day}</h3>
          <div className="delete u-float-right"  onClick={this.onDelete.bind(this)}>
            <i className="fa fa-times fa-2x" aria-hidden="true"></i>
          </div>
        </header>
        <form action="" onSubmit={this.onSubmit.bind(this)}>
          <table>
            <tbody>
              <tr>
                <th>Name: </th>
                <td>
                  <input
                    type="text"
                    defaultValue={excercise.name}
                    ref={function(input) {
                            this.nameInput = input;
                          }.bind(this)}/>
                  </td>
              </tr>
              <tr>
                <th>Sets: </th>
                <td><input
                      type="text"
                      defaultValue={excercise.sets}
                      ref={function(input) {
                    this.setsInput = input;
                  }.bind(this)}/></td>
              </tr>
              <tr>
                <th>Reps: </th>
                <td><input
                      type="text"
                      defaultValue={excercise.reps}
                      ref={function(input) {
                    this.repsInput = input;
                  }.bind(this)}/></td>
              </tr>
              <tr>
                <th>Weight: </th>
                <td><input
                      type="text"
                      defaultValue={excercise.weight}
                      ref={function(input) {
                    this.weightInput = input;
                  }.bind(this)}/></td>
              </tr>
              <tr>
                <th>Notes: </th>
                <td><textarea
                      type="text"
                      defaultValue={excercise.notes}
                      ref={function(input) {
                    this.notesInput = input;
                  }.bind(this)}></textarea></td>
              </tr>
            </tbody>
          </table>
          <br/>
          <div className="form-field">
            <button className="btn-primary">Save Changes</button>
          </div>
        </form>
      </div>
    )
  }
}

class EditExcercises extends React.Component {

  render() {
    const program = this.props.program;
    const updateExcercise = this.props.updateExcercise;
    const deleteExcercise = this.props.deleteExcercise;

    return (
      <div className="EditExcercises">
        <header>
          <h2>Edit Excercises</h2>
        </header>
        <div className="EditExcercises-list">
          {program.days.map(function(day, i) {

            return (
              program.excercises.map(function(excercise, i) {
                if (day.day === excercise.day) {
                  return (
                    <EditExcercise
                      key={i}
                      program={program}
                      excercise={excercise}
                      updateExcercise={updateExcercise}
                      deleteExcercise={deleteExcercise} />)
                } else {
                  return false;
                }
            })
          )
          })}
        </div>
      </div>
    )
  }
}

export default EditExcercises;
