import React from 'react';

class Excercise extends React.Component {

  render() {
    const excercise = this.props.excercise;

    return (
      <div className="Excersice box-item">
        <h2 className="Excersice-name">{excercise.name}</h2>
        <table>
          <tbody>

            {excercise.sets ?
              (<tr>
              <th>Sets: </th>
              <td>{excercise.sets}</td>
            </tr>) : null }

            {excercise.reps ?
              (<tr>
              <th>Reps: </th>
              <td>{excercise.reps}</td>
            </tr>) : null }

            {excercise.weight ?
              (<tr>
              <th>Weight: </th>
              <td>{excercise.weight}</td>
            </tr>) : null }

            {excercise.notes ?
              (<tr>
              <th>Notes: </th>
              <td>{excercise.notes}</td>
            </tr>) : null }


          </tbody>
        </table>
      </div>
      )
    }
  }


export default Excercise;
