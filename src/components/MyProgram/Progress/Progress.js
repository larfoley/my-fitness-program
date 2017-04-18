import React, { Component } from 'react';

import UpdateWeight from './UpdateWeight';
import Results from './Results';
import ResultsHistory from './ResultsHistory';

class Progress extends Component {

  render() {

    const program = this.props.program;

    return (
      <div>
        <Results program={program}/>
        <UpdateWeight program={program} updateWeight={this.props.updateWeight}/>
        <ResultsHistory program={program} />
      </div>
    )
  }
}

export default Progress;
