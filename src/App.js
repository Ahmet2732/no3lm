

import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import UserContextProvider from './Context/userContext';
import './utilites/Global-Api'
import Home from './Pages/main';
import CourseDetailsPage from './Pages/courseDetails';
import Cart from './Pages/Cart';
import Footer from './components/ui/Footer/Footer';
import { CartProvider } from './Context/CartContext';
import Navbar from './components/ui/Navbar/Navbar';
import CourseGrid from './Pages/allcourses';
import Login from './Pages/login';


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
        <Navbar/>
      </CartProvider>
    </UserContextProvider>
  );
}

export default App;
