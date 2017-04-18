import React from 'react';
import { Link } from 'react-router-dom';

const AppHeader = () => {
  return (
    <header className="App-header">
      <Link to="/"> My Fitness Program</Link>
    </header>
  )
}

export default AppHeader;
