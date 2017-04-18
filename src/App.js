import React, { Component } from 'react';
import './index.css';

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { getLeanBodyMass, getBMI } from './helpers'

// Components
import AppHeader from './components/AppHeader';
import Home from './components/Home';
import CreateProgramForm from './components/CreateProgramForm';
import MyProgram from './components/MyProgram/MyProgram';

class App extends Component {

  constructor(props) {
    super();
    this.state = window.appStore.get();
    this.addProgram = this.addProgram.bind(this);
    this.deleteProgram = this.deleteProgram.bind(this);
    this.addExcercise = this.addExcercise.bind(this);
    this.dayComplete = this.dayComplete.bind(this);
    this.updateWeight = this.updateWeight.bind(this);
  }

  addProgram(program) {
    // Copy current state
    const programs = [ ...this.state.programs];
    // add program to copied state
    programs.push(program);
    // set new state
    this.setState({programs});
    window.appStore.update({programs});
  }

  deleteProgram(key) {
    const programs = [ ...this.state.programs];
    programs.forEach(function(program, i) {
      if (program.key === key) {
        programs.splice(i, 1);
      }
    });
    this.setState({programs: programs});
    window.appStore.update({programs: programs});
  }

  getObjectFromArray(array, id, callback) {

    const o = array.filter(function(o) {
      if (o.key === id || o.id === id) {
        return o;
      }
      return false;
    })[0];

    if (callback) {
      callback(o);
    } else {
      return o;
    }

  }

  updateCurrentDay(programId) {
    var program;

    if (program.currentDay < program.daysPerWeek) {
      program.currentDay++;
    } else {
      program.currentDay = 1;
    }
  }

  addExcercise(excercise, programId) {
    const programs = [ ...this.state.programs];
    // find program
    const program = this.getObjectFromArray(programs, programId);
    // Add excercise to program
    program.excercises.push(excercise);
    this.setState({programs: programs});
    window.appStore.update({programs: programs});
  }

  deleteExcercise(p, e) {
    console.log("Deleting excercise", p, e);
    const programs = [ ...this.state.programs];
    const program = this.getObjectFromArray(programs, p);
    program.excercises.forEach(function(ex, i) {
      if (ex.key === e) {
        program.excercises.splice(i, 1);
      }
    })
    this.setState({programs: programs});
    window.appStore.update({programs: programs});
  }

  updateExcercise(programId, excerciseId, values) {
    const programs = [ ...this.state.programs];
    const program = this.getObjectFromArray(programs, programId);
    const excercise = this.getObjectFromArray(program.excercises, excerciseId);

    // replace the old values with the updated values
    for (var key in values) {
      excercise[key] = values[key];
    }

    this.setState({programs: programs});
    window.appStore.update({programs: programs});
  }


  // MyProgram Methods
  //==============================================


  // 1. Program
  //================================================

  updateProgram(programUpdate, programId) {
    const programs = [ ...this.state.programs];
    const program = this.getObjectFromArray(programs, programId);
    var bmi, lbm;

    // this update is to set some initlal values that the user has not yet
    // set once they are set they will never be changed

    for (var key in programUpdate) {
      program[key] = programUpdate[key];
    }

    // UPDATE BMI
    //-------------

    // Need to check if weight or height has changed
    if ( programUpdate.hasOwnProperty('height') ||
         programUpdate.hasOwnProperty('initialWeight') ) {

      // Make sure height and weight have a value set
      if (typeof program.height === "number" && typeof program.initialWeight === "number" ) {

        bmi = getBMI(program.initialWeight, program.height);

        if (typeof program['initialBMI'] !== "number") {
          program['initialBMI'] = bmi;
          program['currentBMI'] = bmi;
        }

      }

    }


    // UPDATE LEAN BODY MASS
    //-----------------------

    if ( programUpdate.hasOwnProperty('initialWeight') ||
         programUpdate.hasOwnProperty('initialBodyFatPercentage') ) {

        if ( typeof program.initialWeight === "number" &&
             typeof program.initialBodyFatPercentage === "number" ) {

          lbm = getLeanBodyMass(program.initialWeight, program.currentBodyFatPercentage);

          if (typeof program['initialLeanBodyMass'] !== "number") {
            program['initialLeanBodyMass'] = lbm
            program['currentLeanBodyMass'] = lbm;
          }
        }

    }


    this.setState({programs: programs});
    window.appStore.update({programs: programs});

    return programUpdate;


  }

  dayComplete(programId, day) {

    const programs = [ ...this.state.programs];
    const program = this.getObjectFromArray(programs, programId);

    program.days.forEach(function(d) {
      if (d.day === day) {
        // Update day complete status
        d.complete = !d.complete;
        // Update total days complete for current week
        if (program.daysComplete < program.daysPerWeek) {

          d.complete ? program.daysComplete++ : program.daysComplete--;

          if (program.daysComplete === program.daysPerWeek) {
            // Update week or set program to completed
            if (program.currentWeek !== program.weeks) {
              program.currentWeek++;
              program.daysComplete = 0;
              program.days.forEach(function(day) {
                day.complete = false;
              })
            } else {
              program.complete = true
            }
          }
        }
      }
    })

    this.setState({programs: programs});
    window.appStore.update({programs: programs});

  }

  // 2. Progress
  //================================================

  updateWeight(update, programId) {

    const programs = [ ...this.state.programs];
    const program = this.getObjectFromArray(programs, programId);

    if (update.hasOwnProperty('bodyWeight')) {
      program.currentBodyFat = update.bodyFat;
      program.currentBMI = getBMI(update.bodyWeight, program.height);
    }

    if (update.hasOwnProperty('bodyFat')) {
      program.currentWeight = update.bodyWeight;
    }

    program.currentMuscleMass = getLeanBodyMass(program.currentWeight, program.currentBodyFat);

    program.results.push(update);

    this.setState({programs: programs});
    window.appStore.update({programs: programs});

  }

  // 3. Edit
  //================================================

  render() {

    var programs = this.state.programs;
    var deleteProgram = this.deleteProgram;
    var addExcercise = this.addExcercise;
    var deleteExcercise = this.deleteExcercise.bind(this);
    var updateExcercise = this.updateExcercise.bind(this);
    var dayComplete = this.dayComplete.bind(this);
    var updateWeight = this.updateWeight;
    var updateProgram = this.updateProgram.bind(this);

    return (
      <Router>
        <div className="App">
          <AppHeader/>
          <Route exact path="/" render={function() {
              return <Home programs={programs} deleteProgram={deleteProgram}/>
            }}/>

          <Route path="/create-program-form" render={function() {
              return <CreateProgramForm addProgram={this.addProgram}/>
            }.bind(this)} />

          <Route path={`/myprogram-:id/`} render={function(props) {
              var program = programs.filter(function(p) {
                if (p.key === props.match.params.id) {
                  return p;
                }
                return true;
              })[0];
            return <MyProgram
                      test={this}
                      id={props.match.params.id}
                      program={program}
                      updateProgram={updateProgram}
                      updateExcercise={updateExcercise}
                      addExcercise={addExcercise}
                      deleteExcercise={deleteExcercise}
                      dayComplete={dayComplete}
                      updateWeight={updateWeight}/>
                  }.bind(this)}/>
        </div>
      </Router>
    );
  }
}


export default App;
