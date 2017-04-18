import React from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

class AddExcercise extends React.Component {


  onSubmit(e) {
    e.preventDefault();
    var excercise = {};
        excercise.id = Date.now();
        excercise.name = this.nameInput.value;
        excercise.day = parseInt(this.dayInput.value, 10) || "";
        excercise.sets = parseInt(this.setsInput.value, 10) || "";
        excercise.reps = parseInt(this.repsInput.value, 10) || "";
        excercise.weight = parseInt(this.weightInput.value, 10) || "";

    this.props.addExcercise(excercise, this.props.program.id);
    this.form.reset();
    NotificationManager.success("Excercise Added");

  }

  render() {
    return (
      <div className="box">
        <NotificationContainer/>
        <h2>Add Excercise</h2>
        <form action="" ref={function(form) {this.form = form}.bind(this)} onSubmit={this.onSubmit.bind(this)}>

          <div className="form-field">
            <label htmlFor=""></label><br/>
            <select name="day" id="" required ref={function(input) {this.dayInput = input}.bind(this)}>
              <option value="">Select a Day</option>
              {this.props.program.days.map(function(day, i) {
                return <option key={'day-' + (i + 1)} value={i + 1}>Day {i + 1}</option>
              })}
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="">Name</label>
            <input required
              ref={function(input) {this.nameInput = input}.bind(this)}
              type="text"
              placeholder=""/>
          </div>

          <div className="form-field">
            <label htmlFor="">Sets</label>
            <input
              ref={function(input) {this.setsInput = input}.bind(this)}
              type="text"
              placeholder=""/>
          </div>

          <div className="form-field">
            <label htmlFor="">Reps</label>
            <input ref={function(input) {this.repsInput = input}.bind(this)}
              type="text"
              placeholder=""/>
          </div>

          <div className="form-field">
            <label htmlFor="">Weight</label>
            <input
              ref={function(input) {this.weightInput = input}.bind(this)}
              type="text"
              placeholder=""/>
          </div>

          <div className="form-field">
            <label htmlFor="">Notes</label>
            <textarea
              ref={function(input) {this.notesInput = input}.bind(this)}
              type="text"
              placeholder="">
            </textarea>
          </div>

          <div className="form-field">
            <input type="submit" defaultValue="Add Excersice"/>
          </div>

        </form>
      </div>
    );
  }
}

export default AddExcercise;
