import React, { Component } from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

class UpdateWeight extends Component {

  onSubmit(e) {
    e.preventDefault();

    const program = this.props.program;
    const update = {};

    // Dont sumbit an empty form
    if (this.bodyFatInput.value.trim() === "" && this.bodyWeightInput.value.trim() === "") {
      return;
    }

    // Dont submit if no inital values have been set
    if (typeof program.currentBodyFatPercentage !== "number" && typeof program.currentWeight !== "number" ) {
      alert("Unable to update weight. Make sure you have firts set your weight and hieght")
      return;
    }

    const bodyFat = parseInt(this.bodyFatInput.value, 10) || program.currentBodyFatPercentage;
    const bodyWeight = parseInt(this.bodyWeightInput.value, 10) || program.currentWeight;

    // if bodyFat or bodyWeight is being updated then make sure the updated values
    // have already been initialised
    if (this.bodyFatInput.value.trim().length > 0 && typeof bodyFat !== "number") {
      return;
    } else {
      update.bodyFat = bodyFat;
    }

    if (this.bodyWeightInput.value.trim().length > 0 && typeof bodyWeight !== "number") {
      return;
    } else {
      update.bodyWeight = bodyWeight;
    }
    console.log("Update");
    update.id = Date.now();
    update.date = new Date().toDateString();

    this.props.updateWeight(update, this.props.program.key);
    this.form.reset();
    NotificationManager.info('Your progress has been updated');
  }

  render() {

    return (
      <div className="UpdateWeight">
        <NotificationContainer/>
        <form ref={(form) => {this.form = form}} className="box" onSubmit={this.onSubmit.bind(this)}>
          <h2>Update Current Weight</h2>
          <div className="form-field">
            <label htmlFor="">Body Weight (kgs)</label>
            <input ref={(input) => {this.bodyWeightInput = input}} type="number"/>
          </div>
          <div className="form-field">
            <label htmlFor="">Body Fat Precentage</label>
            <input ref={(input) => {this.bodyFatInput = input}} type="number"/>
          </div>
          <div className="form-field">
            <input type="submit" value="Update Weight"/>
          </div>
        </form>
      </div>
    )
  }

}

export default UpdateWeight;
