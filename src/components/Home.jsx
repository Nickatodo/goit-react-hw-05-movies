import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

export function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function trendingMovie() {
      const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/trending/movie/day',
        params: { language: 'en-US' },
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NDY1ODBlYTRhMDM2MDVkOWE2N2FlM2FhYzRiNjcxZCIsInN1YiI6IjY1ZTEwZGUyMmQ1MzFhMDE0OGJlZWFmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8aUIYNFlhoowb4WMuONrqR9k2WqKHNq9SdusAefM7cc',
        },
      };

      try {
        const response = await axios.request(options);
        const datas = response.data.results;

        const movieTrending = datas.map(element => ({
          id: element.id,
          title: element.title,
        }));
        setMovies(movieTrending);
      } catch (error) {
        console.log(error);
      }
    }

    trendingMovie();
  }, []);

  return (
    <>
      <h1>Trending</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <NavLink to={`/goit-react-hw-05-movies/moviedetails/${movie.id}`}>
              {movie.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </>
  );
}
