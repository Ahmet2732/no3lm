

import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import UserContextProvider from './Context/userContext';

import Login from './components/login/login';
import Home from './components/home/home';
import CourseGrid from './components/AllCourses/AllCourses';
import CourseDetailsPage from './components/courseDetails/courseDetails';
import Cart from './components/Cart/Cart';
import Footer from './components/ui/Footer/Footer';
import { CartProvider } from './Context/CartContext';


// Define your routes
let routes = createBrowserRouter([
  { index: true, element: <Login /> },
  { path: "/Home", element: <Home /> },
  { path: "/CourseGrid", element: <CourseGrid /> },
  { path: "/course/:id", element: <CourseDetailsPage /> },
  { path: "/Cart", element: <Cart /> },
  { path: "/Footer", element: <Footer /> }
]);

function App() {
  return (
    <UserContextProvider>
      <CartProvider>
      
        <RouterProvider router={routes} />
        <Toaster />
      </CartProvider>
    </UserContextProvider>
  );
}

export default App;
