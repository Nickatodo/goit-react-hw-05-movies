import React from 'react';
import { NavLink } from 'react-router-dom';

export function Header() {
  return (
    <>
      <nav className="Header">
        <NavLink to={'/goit-react-hw-05-movies/'} className="Header_Link">
          Home
        </NavLink>
        <NavLink to={'/goit-react-hw-05-movies/movies'} className="Header_Link">
          Movies
        </NavLink>
      </nav>
    </>
  );
}
