import React from 'react';
import { Link } from 'react-router-dom';

const ProgramLink = (props) => {

  var program = props.programData;

  var to = `myprogram-${props.programData.key}/program/day-${
    program.daysComplete !== program.daysPerWeek ?
      program.daysComplete + 1 :
      program.daysComplete
  }`;

  var deleteProgram = function() {
    props.deleteProgram(props.id);
  }

  return (
    <div className="ProgramLink box">
    <h2>{props.programData.name}</h2>
    <table>
      <tbody>
        <tr>
          <th>Weeks Left: </th>
          <td>
            {
              program.complete ? 0 : (program.weeks - program.currentWeek) + 1
            }
          </td>
        </tr>
        {program.goals ? (
          <tr>
            <th>Goals: </th>
            <td>{program.goals}</td>
          </tr>
        ) : null}
      </tbody>
    </table>
    <br/>
      <Link className="btn" to={to}>View Program</Link>
      <Link className="btn-warning" to='#' onClick={deleteProgram}>Delete Program</Link>
    </div>
  )
}

export default ProgramLink;
