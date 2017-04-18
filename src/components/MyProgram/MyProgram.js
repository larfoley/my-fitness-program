import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';

import Program from './Program/Program';
import Progress from './Progress/Progress';
import Edit from './Edit/Edit';
import ResultsHistory from "./Progress/ResultsHistory";

class MyProgram extends Component {

  getCurrentWeek() {
    var daysPerWeek = this.props.program.daysPerWeek;
    var daysComplete = this.props.program.daysComplete;
    return  (Math.round(daysComplete / daysPerWeek)) + 1 ;
  }

  render() {

    const program = this.props.program;
    const addExcercise = this.props.addExcercise;
    const updateExcercise = this.props.updateExcercise;
    const deleteExcercise = this.props.deleteExcercise;
    const dayComplete = this.props.dayComplete;
    const updateWeight = this.props.updateWeight;
    const days = this.props.program.days;
    const updateProgram = this.props.updateProgram;

    return (
        program.complete ?
          <div className="container">
            <h1 className="u-text-center">Program Complete</h1>
            
            <ResultsHistory program={program} />
          </div> :
          <div className="MyProgram">
            <header className="MyProgram-header">
              <div className="container">
                <div>
                  <h1>{this.props.program.name}</h1>
                  <h2>Week {this.props.program.currentWeek}</h2>
                </div>
              </div>
            </header>
            <nav className="MyProgram-nav">
              <div className="container">
                <NavLink  activeClassName="selected" to={`/myprogram-${program.key}/program/`}>Program</NavLink>
                <NavLink  activeClassName="selected" to={`/myprogram-${program.key}/progress/`}>Progress</NavLink>
                <NavLink  activeClassName="selected" to={`/myprogram-${program.key}/edit/`}>Edit</NavLink>
              </div>
            </nav>
            <div className="container">
              <Route path={`/myprogram-${program.key}/:section/`} render={
                  function(props) {
                    var view;

                    switch (props.match.params.section) {
                      case "program":
                        view = <Program
                                  program={program}
                                  addExcercise={addExcercise}
                                  updateExcercise={updateExcercise}
                                  dayComplete={dayComplete}
                                  days={days}
                                  />
                        break;
                      case "edit":
                        view = <Edit
                                  program={program}
                                  addExcercise={addExcercise}
                                  updateExcercise={updateExcercise}
                                  deleteExcercise={deleteExcercise}
                                  updateProgram={updateProgram} />
                        break;
                      case "progress":
                        view = <Progress program={program} updateWeight={updateWeight}/>
                        break;
                      default:
                    }

                    return view;
                  }
                    }/>

            </div>
          </div>
    )
  }

}

export default MyProgram;
