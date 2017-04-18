import React from 'react';
import { Link } from 'react-router-dom';

const PageHeader = (props) => {
  return (
    <header className="App-header">
      <div className="container">
        {props.children}
      </div>
    </header>
  )
}

export default PageHeader;
