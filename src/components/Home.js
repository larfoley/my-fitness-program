import React from 'react';
import { Link } from 'react-router-dom';

import ProgramLink from "./ProgramLink";

const Home = (props) => {

  var programs = props.programs;
  var deleteProgram = props.deleteProgram;

  return (
    <div className="home">
      <div className="PageHeader">
        <div className="container u-text-center margin-vertical">
          <Link to="/create-program-form" className="btn-primary">
            Create New Program <strong>&#43;</strong>
          </Link>
        </div>
      </div>
      <div className="container">
        {programs.map(function(p) {
          return <ProgramLink key={p.key} id={p.key} programData={p} deleteProgram={deleteProgram}/>
        })}

      </div>
    </div>
  )

}

export default Home;
