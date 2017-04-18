import React, { Component } from 'react';
import Workout from './Workout';
import DayComplete from './DayComplete';

class Program extends Component {

  constructor(props) {
    super();
    this.state = {
      selectedDay: {},
      excercises: []
    }
  }

  onDayChange() {

    const day = parseInt(this.dayChangeInput.value, 10);
    const selectedDay = this.props.days.filter(function(d) {
      if (d.day === day) return d;
      return false
    })[0] || {};
    const excercises = !Number.isNaN(day) ?
      this.props.program.excercises.filter(function(ex) {
        if (ex.day === day) return ex;
        return false;
      }) : [];
    this.setState({selectedDay: selectedDay, excercises: excercises});

  }

  loadExcercises(day) {

    return this.props.program.excercises.filter(function(ex) {
      if (ex.day === day) {
        return ex;
      }
      return false;
    })

  }

  render() {

    var program = this.props.program;
    var addExcercise = this.props.addExcercise;
    var dayComplete = this.props.dayComplete;
    var days = program.days;
    var programId = program.key;
    var totalExcercises = this.props.program.excercises.length;
    var programIsComplete = this.props.program.complete;

    return (
      <div className="Program">
        <div className="Program-header">
          <select
            value={this.state.selectedDay.day || ""}
            onChange={this.onDayChange.bind(this)}
            ref={function(input) {this.dayChangeInput = input}.bind(this)}>
            <option key={"1"} value="">
              Select a Day
            </option>
            {days.map(function(day, i) {
              return (
                <option
                  key={"day-"+(day.day)}
                  value={day.day}>
                  Day {day.day} </option>)
                })}
          </select>
          <DayComplete
            day={this.state.selectedDay}
            programId={programId}
            dayComplete={dayComplete}
            totalExcercises={totalExcercises}
            programIsComplete={programIsComplete}/>
        </div>
        {
          Object.keys(this.state.selectedDay).length !== 0  ?
          <Workout
            day={this.state.selectedDay}
            complete={1}
            excercises={this.state.excercises}
            programId={program.key}
            addExcercise={addExcercise}
            dayComplete={dayComplete}
             /> : null
        }


      </div>
    )
  }

}

Program.contextTypes = {
  router: React.PropTypes.object
}

export default Program;
