import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export function Reviews() {
  const location = useLocation();
  const { movie } = location.state;
  const [review, setReview] = useState([]);

  useEffect(() => {
    async function detailReview() {
      const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/${movie.id}/reviews`,
        params: { language: 'en-US', page: '1' },
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NDY1ODBlYTRhMDM2MDVkOWE2N2FlM2FhYzRiNjcxZCIsInN1YiI6IjY1ZTEwZGUyMmQ1MzFhMDE0OGJlZWFmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8aUIYNFlhoowb4WMuONrqR9k2WqKHNq9SdusAefM7cc',
        },
      };

      try {
        const response = await axios.request(options);
        setReview(response.data.results);
      } catch (error) {
        console.log(error);
      }
    }
    detailReview();
  }, [movie]);

  return (
    <>
      <ul>
        {review.length <= 0 && (
          <span>We don't have any reviews for this movie.</span>
        )}
        {review.length > 0 &&
          review.map(rev => (
            <div key={rev.id}>
              <li key={rev.id}>{rev.author}</li>
              <p>{rev.content}</p>
            </div>
          ))}
      </ul>
    </>
  );
}
