import React from 'react';
import { Header } from 'components/Header';
import { Home } from 'components/Home';
import { Movies } from 'components/Movies';
import { MovieDetails } from 'components/MovieDetails';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

export default function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
          <Header></Header>
          <Home></Home>
        </>
      ),
    },
    {
      path: '/movies',
      element: (
        <>
          <Header></Header>
          <Movies></Movies>
        </>
      ),
    },
    {
      path: '/moviedetails/:id',
      element: (
        <>
          <Header></Header>
          <MovieDetails></MovieDetails>
        </>
      ),
      children: [
        {
          path: '/moviedetails/:id/cast',
          lazy: async () => {
            const { Cast } = await import('../components/Cast');
            return { Component: Cast };
          },
        },
        {
          path: '/moviedetails/:id/reviews',
          lazy: async () => {
            const { Reviews } = await import('../components/Reviews');
            return { Component: Reviews };
          },
        },
      ],
    },
    {
      path: '*',
      element: (
        <>
          <Header></Header>
          <Home></Home>
        </>
      ),
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}
