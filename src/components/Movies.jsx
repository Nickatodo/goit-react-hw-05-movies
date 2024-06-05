import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export function Movies() {
  const [inputValue, setInputValue] = useState('');
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('query');
    if (query) {
      fetchMovies(query);
      setInputValue(query);
    }
  }, [location.search]);

  function handleChange(evt) {
    setInputValue(evt.target.value);
  }

  async function fetchMovies(query) {
    const options = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/search/movie',
      params: {
        query: query,
        include_adult: 'false',
        language: 'en-US',
        page: '1',
      },
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NDY1ODBlYTRhMDM2MDVkOWE2N2FlM2FhYzRiNjcxZCIsInN1YiI6IjY1ZTEwZGUyMmQ1MzFhMDE0OGJlZWFmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8aUIYNFlhoowb4WMuONrqR9k2WqKHNq9SdusAefM7cc',
      },
    };
    try {
      const response = await axios.request(options);
      setMovies(response.data.results);
    } catch (error) {
      console.log(error);
    }
  }

  function handleSearch() {
    navigate(`/goit-react-hw-05-movies/movies?query=${inputValue}`);
  }

  return (
    <>
      <input
        className="SearchForm-input"
        type="text"
        autoComplete="off"
        autoFocus
        value={inputValue}
        onChange={handleChange}
      />
      <button
        className="SearchForm-button"
        type="button"
        onClick={handleSearch}
      >
        Search
      </button>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <NavLink
              to={`/goit-react-hw-05-movies/moviedetails/${movie.id}?query=${inputValue}`}
            >
              {movie.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </>
  );
}
