import React, { Suspense } from 'react';
import { Outlet, useParams, useLocation, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export function MovieDetails() {
  let { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    async function detailMovie() {
      const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/${id}`,
        params: { language: 'en-US' },
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NDY1ODBlYTRhMDM2MDVkOWE2N2FlM2FhYzRiNjcxZCIsInN1YiI6IjY1ZTEwZGUyMmQ1MzFhMDE0OGJlZWFmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8aUIYNFlhoowb4WMuONrqR9k2WqKHNq9SdusAefM7cc',
        },
      };
      try {
        const response = await axios.request(options);
        setMovie(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    detailMovie();
  }, [id]);

  const params = new URLSearchParams(location.search);
  const query = params.get('query');

  const handleGoBack = () => {
    if (query) {
      navigate(`/movies?query=${query}`);
    } else {
      navigate('/');
    }
  };

  return (
    <>
      <button onClick={handleGoBack}>GO BACK</button>
      <div className="MovieDetail">
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
        <div>
          <h3>
            {movie.title} (
            {movie.release_date
              ? new Date(movie.release_date).getFullYear()
              : ''}
            )
          </h3>
          <p>User Score: {movie.vote_average * 10}%</p>
          <h4>Overview</h4>
          <p>{movie.overview}</p>
          <h5>Genres</h5>
          <p>
            {movie.genres
              ? movie.genres.map(genre => genre.name).join(' ')
              : ''}
          </p>
        </div>
      </div>
      <div className="Add_info">
        <p>Aditional information</p>
        <ul>
          <li>
            <NavLink
              to={`/moviedetails/${movie.id}/cast${
                query ? `?query=${query}` : ''
              }`}
              state={{ movie, query }}
            >
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/moviedetails/${movie.id}/reviews${
                query ? `?query=${query}` : ''
              }`}
              state={{ movie, query }}
            >
              Reviews
            </NavLink>
          </li>
        </ul>
      </div>
      <Suspense>
        <Outlet></Outlet>
      </Suspense>
    </>
  );
}
