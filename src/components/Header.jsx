import React from 'react';
import { NavLink } from 'react-router-dom';

export function Header() {
  return (
    <>
      <nav className="Header">
        <NavLink to={'/'} className="Header_Link">
          Home
        </NavLink>
        <NavLink to={'/movies'} className="Header_Link">
          Movies
        </NavLink>
      </nav>
    </>
  );
}
