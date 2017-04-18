import React from 'react';

class DayComplete extends React.Component {

  onChange() {
    if (this.props.totalExcercises) {
      this.props.dayComplete(this.props.programId, this.props.day.day);
    }
  }

  render() {
    const day = this.props.day;
    const programIsComplete = this.props.programIsComplete;
    var dayComplete = false;
    var dayIsSet = false;

    if ("complete" in day) {
      dayComplete = day.complete;
      dayIsSet = true;
    }

    return (
        dayIsSet && !programIsComplete ?
          <label className={"DayComplete " + (dayComplete ? "isComplete" : "isNotComplete")}>
            <div>
              <span>{dayComplete ? "Day Complete" : "Mark Day Complete"}</span>
              <input type="checkbox" onChange={this.onChange.bind(this)}/>
            </div>
          </label> : <div></div>
    )
  }
}

export default DayComplete;
