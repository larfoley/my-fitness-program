import React, { Component } from 'react';


class ResultsHistory extends Component{

  render() {
    const program = this.props.program;
    const history = this.props.program.results;

    return (
      <div className="History">

        {history.map(function(h, i) {

          let previousHistory = i !== 0 ? history[i - 1] : {
            bodyFat: program.initialBodyFat,
            bodyWeight: program.bodyWeight
          };
          let indicator;

          if (h.bodyFat > previousHistory.bodyFat) {
            indicator = (<i className="green-text fa fa-caret-up" aria-hidden="true"></i>);
          } else if (h.bodyFat === previousHistory.bodyFat) {
            indicator = (<i className="green-text fa fa-caret-down" aria-hidden="true"></i>);
          } else {
            indicator = null;
          }


          return (
            <div key={"history-" + (i + 1)} className="box-item">
              <h2>{h.date}</h2>
              <table>
                <tbody>
                  <tr>
                    <th>Body Fat Precentage</th>
                    <td>
                      {h.bodyFat}% &nbsp;
                      {indicator}
                    </td>
                  </tr>
                  <tr>
                    <th>Body Weight</th>
                      <td>
                        {h.bodyWeight}&nbsp;
                        {indicator}
                      </td>
                  </tr>
                  <tr>
                    <th>Lean Muscle Mass</th>
                      <td>
                        {h.bodyWeight}&nbsp;
                        {indicator}
                      </td>
                  </tr>
                  <tr>
                    <th>BMI</th>
                      <td>
                        {h.bodyWeight}&nbsp;
                        {indicator}
                      </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )
        })}
      </div>
    )
  }
}

export default ResultsHistory;
