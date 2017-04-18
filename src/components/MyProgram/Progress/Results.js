import React, { Component } from 'react';

class Results extends Component {

  render() {

    const program = this.props.program;

    return (
      <div className="Results">
        <div className="box">
          <h2>Current Weight</h2>
          <table>
            <tbody>
              <tr>
                <th>Body Weight</th>
                <td>
                  {typeof program.currentWeight === "number" ? program.currentWeight + " kgs": "Unknown"}
                </td>
              </tr>
              <tr>
                <th>Body Fat Precentage</th>
                <td>
                  {typeof program.currentBodyFatPercentage === "number" ? program.currentBodyFatPercentage + "%": "Unknown"}
                </td>
              </tr>
              <tr>
                <th>Lean Body Mass</th>
                <td>
                  {typeof program.currentLeanBodyMass === "number" ? program.currentLeanBodyMass + " kgs": "Unknown"}
                </td>
              </tr>
              <tr>
                <th>BMI</th>
                <td>
                  {typeof program.currentBMI === "number" ? program.currentBMI + "": "Unknown"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default Results;
