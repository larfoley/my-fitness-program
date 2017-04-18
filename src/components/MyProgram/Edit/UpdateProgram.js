import React from 'react';

class UpdateProgram extends React.Component {


  valueIsSet(value) {
    return typeof value === "number" ? true : false;
  }

  onFormSubmit(e) {
    e.preventDefault();

    const height = this.heightInput ? parseInt(this.heightInput.value, 10) : null;
    const bodyWeight = this.initialWeight ? parseInt(this.initialWeight.value, 10) : null;
    const bodyFat = this.bodyFatInput ? parseInt(this.bodyFatInput.value, 10) : null;
    const programUpdate = {};

    if (height) { programUpdate.height = height }

    if (bodyWeight) {
      programUpdate.initialWeight = bodyWeight;
      programUpdate.currentWeight = bodyWeight;
    }

    if (bodyFat) {
      programUpdate.initialBodyFatPercentage = bodyFat;
      programUpdate.currentBodyFatPercentage = bodyFat
    }

    if (Object.keys(programUpdate).length !== 0) {
      this.props.updateProgram(programUpdate, this.props.program.key);
      this.formEl.reset();
    }

  }

  render() {
    const program = this.props.program;

    // Check if all values are not set
    if ( !( this.valueIsSet(program.height) &&
            this.valueIsSet(program.initialWeight) &&
            this.valueIsSet(program.initialBodyFatPercentage) ) ) {

      return (
        <div className="EditProgram box">
          <h2>Update Program</h2>
          <p className="h3">In order to calculate your BMI and lean body mass, you need to enter in the following details.</p>
          <form action="" ref={function(input) {this.formEl = input}.bind(this)} className="EditProgram" onSubmit={this.onFormSubmit.bind(this)}>

            {!this.valueIsSet(program.height) ? (
              <div className="form-field">
                <label htmlFor="initialWeight">Height (cm): </label>
                <input
                  ref={function(input) {this.heightInput = input}.bind(this)}
                  type="number" />
              </div>
            ) : null}

            {!this.valueIsSet(program.initialWeight) ? (

              <div className="form-field">
                <label htmlFor="initialWeight">Initial Body Weight (kgs): </label>
                <input
                  ref={function(input) {this.initialWeight = input}.bind(this)}
                  type="number" />
              </div>

            ) : null}

            {!this.valueIsSet(program.initialBodyFatPercentage) ? (

              <div className="form-field">
                <label htmlFor="initialBodyFat">Initial Body Fat Precentage: </label>
                <input
                  ref={function(input) {this.bodyFatInput = input}.bind(this)}
                  type="number" />
              </div>

            ) : null}

            <div className="form-field">
              <input type="submit" defaultValue="Save Changes"/>
            </div>
          </form>
        </div>
      )
    } else {
      return null;
    }

  }
}

export default UpdateProgram;
