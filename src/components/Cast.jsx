import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export function Cast() {
  const location = useLocation();
  const { movie } = location.state;
  const [cast, setCast] = useState([]);

  useEffect(() => {
    async function detailCast() {
      const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/${movie.id}/credits`,
        params: { language: 'en-US' },
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NDY1ODBlYTRhMDM2MDVkOWE2N2FlM2FhYzRiNjcxZCIsInN1YiI6IjY1ZTEwZGUyMmQ1MzFhMDE0OGJlZWFmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8aUIYNFlhoowb4WMuONrqR9k2WqKHNq9SdusAefM7cc',
        },
      };

      try {
        const response = await axios.request(options);
        setCast(response.data.cast);
      } catch (error) {
        console.log(error);
      }
    }
    detailCast();
  }, [movie]);

  return (
    <>
      <ul>
        {cast.map(person => (
          <div key={person.id}>
            <img
              src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
              alt={person.name}
            />
            <li key={person.id}>{person.name}</li>
          </div>
        ))}
      </ul>
    </>
  );
}
