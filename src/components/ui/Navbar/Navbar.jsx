import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import logo from '../../../Assets/images/logo.a03215d1.png';
import { CartContext } from '../../../Context/CartContext';

function Navbar() {
  const { cartItems } = useContext(CartContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container">
        <a href="/Home" className="navbar-brand d-flex align-items-center">
          <img 
            src={logo} 
            alt="Logo" 
            className="mb-1" 
            style={{ width: '70px', height: '70px', cursor: 'pointer' }} 
          />
  
        </a>

        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link  " href="/Home">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/CourseGrid">Courses</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#footer">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contact">Contact</a>
            </li>
            <li className="nav-item position-relative d-flex align-items-center pt-md-0 pt-sm-4">
              <a 
                className="nav-link d-flex align-items-center" 
                href="/cart" 
                style={{
                  borderRadius: '5px', 
                  position: 'relative'
                }}
              >
                {/* Custom SVG Icon */}
                <svg 
                  stroke="currentColor" 
                  fill="currentColor" 
                  strokeWidth="0" 
                  viewBox="0 0 576 512" 
                  color="#21a6a6" 
                  height="25" 
                  width="25" 
                  xmlns="http://www.w3.org/2000/svg" 
                  style={{ color: 'rgb(33, 166, 166)', marginRight: '5px' }}
                >
                  <path d="M504.717 320H211.572l6.545 32h268.418c15.401 0 26.816 14.301 23.403 29.319l-5.517 24.276C523.112 414.668 536 433.828 536 456c0 31.202-25.519 56.444-56.824 55.994-29.823-.429-54.35-24.631-55.155-54.447-.44-16.287 6.085-31.049 16.803-41.548H231.176C241.553 426.165 248 440.326 248 456c0 31.813-26.528 57.431-58.67 55.938-28.54-1.325-51.751-24.385-53.251-52.917-1.158-22.034 10.436-41.455 28.051-51.586L93.883 64H24C10.745 64 0 53.255 0 40V24C0 10.745 10.745 0 24 0h102.529c11.401 0 21.228 8.021 23.513 19.19L159.208 64H551.99c15.401 0 26.816 14.301 23.403 29.319l-47.273 208C525.637 312.246 515.923 320 504.717 320zM403.029 192H360v-60c0-6.627-5.373-12-12-12h-24c-6.627 0-12 5.373-12 12v60h-43.029c-10.691 0-16.045 12.926-8.485 20.485l67.029 67.029c4.686 4.686 12.284 4.686 16.971 0l67.029-67.029c7.559-7.559 2.205-20.485-8.486-20.485z"></path>
                </svg>

                {/* Badge for Cart Items Count */}
                {cartItems.length > 0 && (
                  <span 
                    className="cart-items-number  bg-danger text-white position-absolute d-flex justify-content-center align-items-center" 
                    style={{
                      top: '-8px',
                      right: '-8px',
                      padding: '0px 6px',
                      borderRadius: '50%',
                      fontSize: '0.8rem'
                    }}
                  >
                    {cartItems.length}
                  </span>
                )}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
