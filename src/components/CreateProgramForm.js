import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { getLeanBodyMass, getBMI } from '../helpers.js'

class CreateProgramForm extends Component {

  constructor() {
    super()
    this.state = {
      submitted: false,
      validSubmit: true
    }
  }

  onSubmit(e) {
    e.preventDefault();

    var validSubmit = true;

    var timestamp = Date.now();

    // required values
    var programName = this.programName.value.trim().length === 0 ? "My Program" : this.programName.value.trim();
    var daysPerWeek = parseInt(this.daysInput.value, 10) || 1;
    var weeks = parseInt(this.weeksInput.value, 10) || 1;

    var height = parseInt(this.heightInput.value, 10) || 'Not yet set';
    var initialWeight = parseInt(this.weightInput.value, 10) || 'Not yet set';
    var initialBodyFatPercentage = parseInt(this.bodyFatInput.value, 10) || 'Not yet set';
    var goals = this.goalsInput.value.trim();
    var initialLeanBodyMass = (
      typeof initialWeight === "number" &&
      typeof initialBodyFatPercentage === "number" ?
        getLeanBodyMass(initialWeight, initialBodyFatPercentage) : 'Not yet set'
    );
    var initialBMI = (
      typeof initialWeight === "number" &&
      typeof height === "number" ?
        getBMI(initialWeight, height) : 'Not yet set'
    );

    var days = (function() {

      const days = [];
      for (var i = 0; i < daysPerWeek; i++) {
        days.push({
          day: i + 1,
          complete: false,
          excercises: [],
        })
      }
      return days;
    }())

    var program = {
      key: timestamp,
      complete: false,
      name: programName,
      daysPerWeek: daysPerWeek,
      weeks: weeks,
      goals: goals,
      daysComplete: 0,
      currentWeek: 1,
      days: days,
      excercises: [],
      height: height,
      initialWeight: initialWeight,
      currentWeight: initialWeight,
      initialBodyFatPercentage: initialBodyFatPercentage,
      currentBodyFatPercentage: initialBodyFatPercentage,
      initialLeanBodyMass: initialLeanBodyMass,
      currentLeanBodyMass: initialLeanBodyMass,
      initialBMI: initialBMI,
      currentBMI: initialBMI,
      results: [],
      dateCreated: new Date()
    }

    var inputs = [].slice.call(this.form.querySelectorAll('input, textarea'));

    inputs.forEach(function(input, i) {
      if (input.value.trim() === "" && input.getAttribute('data-required')) {
        input.classList.add("required");
        validSubmit = false;
      } else {
        input.classList.remove("required");
      }
    })

    if (validSubmit) {
      this.setState({submitted: true});
      this.props.addProgram(program);
    } else {
      alert('Some required fileds are left blank');
    }

    parent.scrollTo(0, 0);

  }

  render() {

    if (this.state.submitted) {
     return (<Redirect to="/"/>)
    }

    return (
      <div className="CreateProgramForm">
        <div className="CreateProgramForm-header">
          <div className="container">
            <h2>Create a New Program</h2>
          </div>
        </div>
        <div className="container">
          {this.state.submitted ?
            <div className="box">
              <h1>Your Program is Ready</h1>
              <p>To view and edit your programs click
                <a href='/'> here</a>
              </p>
            </div> :

            <form ref={function(input) {this.form = input}.bind(this)} action="" onSubmit={this.onSubmit.bind(this)}>

              <div className="form-field">
                <label htmlFor="">Program Name</label>
                <br/>
                <input type="text" data-required ref={function(input) {this.programName = input}.bind(this)}/>
              </div>

              <div className="form-field">
                <label htmlFor="">Days Per Week</label>
                <br/>
                <select type="number" data-required defaultValue ref={function(input) {this.daysInput = input}.bind(this)}>
                  <option value="">Select Days Per Week</option>
                  <option value="1">1</option>
                  <option value="2">2 </option>
                  <option value="3">3 </option>
                  <option value="4">4 </option>
                  <option value="5">5 </option>
                  <option value="6">6 </option>
                  <option value="7">7 </option>
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="">Total Weeks</label>
                <br/>
                <input type="number" data-required ref={function(input) {this.weeksInput = input}.bind(this)}/>
              </div>

              <div className="form-field">
                <label htmlFor="">Height (cm)</label>
                <br/>
                <input type="number" step="0.01" ref={function(input) {this.heightInput = input}.bind(this)}/>
              </div>

              <div className="form-field">
                <label htmlFor="">Body Weight (kg)</label>
                <br/>
                <input type="number" step="0.01" ref={function(input) {this.weightInput = input}.bind(this)}/>
              </div>

              <div className="form-field">
                <label htmlFor="">Body Fat Precentage</label>
                <br/>
                <input type="number" step="0.01" min="1" max="100" ref={function(input) {this.bodyFatInput = input}.bind(this)}/>
              </div>

              <div className="form-field">
                <label htmlFor="">Goals</label>
                <br/>
                <textarea name="" id="" cols="30" rows="10" ref={function(input) {this.goalsInput = input}.bind(this)}></textarea>
              </div>

              <div className="form-field">
                <input className="btn" type="submit" value="Add Program"/>
              </div>

            </form>
          }
        </div>
      </div>
    );
  }

}

export default CreateProgramForm;
