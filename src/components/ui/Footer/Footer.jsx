import React from 'react';
import logo from '../../../Assets/images/logo.a03215d1.png';
import qrCode from '../../../Assets/images/download.jpg'; 

const Footer = () => {
  return (
    <footer className="bg-light py-5 " id="footer">
      <div className="container ">
        
       
        <div className="row justify-content-center mb-4">
          <div className="col-auto">
            <img src={logo} alt="Champions Academy Logo" className="img-fluid" style={{ maxWidth: '100px' }} />
          </div>
        </div>
        
        {/* Main Footer Content */}
        <div className="row justify-content-between text-start m-2">
          
          {/* About Section */}
          <div className="col-md-3 mb-4">
            <h4 className="fw-bold">About Champions</h4>
            <p>
              At Champions, we’re on a mission to inspire and empower the next generation of youth. Through our cutting-edge app, we provide youth with the tools to develop essential life skills while nurturing strong Islamic values. We create an engaging path for personal growth, spiritual enrichment, and the pursuit of excellence—helping today’s youth and young youth become the confident, capable leaders of tomorrow.
            </p>
          </div>

          {/* Site  Section */}
          <div className="col-md-2 mb-4">
            <h4 className="fw-bold">Site Map</h4>
            <ul className="list-unstyled">
              <li><a href="/user/initiatives/" className="text-decoration-none text-dark">Challenges</a></li>
              <li><a href="/consultants/get-teachers" className="text-decoration-none text-dark">Mentors</a></li>
              <li><a href="/courses" className="text-decoration-none text-dark">Courses</a></li>
              <li><a href="/events-list" className="text-decoration-none text-dark">Events</a></li>
              <li><a href="/user/trackings/list/" className="text-decoration-none text-dark">Follow-up Systems</a></li>
            </ul>
          </div>

          {/* Links Section */}
          <div className="col-md-2 mb-4">
            <h4 className="fw-bold">Links</h4>
            <ul className="list-unstyled">
              <li><a href="https://apps.apple.com" className="text-decoration-none text-dark">App Store</a></li>
              <li><a href="https://play.google.com" className="text-decoration-none text-dark">Play Store</a></li>
              <li><a href="/contact-us" className="text-decoration-none text-dark">Contact Us</a></li>
              <li><a href="/terms-and-conditions" className="text-decoration-none text-dark">Terms And Conditions</a></li>
            </ul>
          </div>

          {/* Download App Section */}
          <div className="col-md-2 mb-4">
            <h4 className="fw-bold">Download App</h4>
            <img src={qrCode} alt="QR Code for App Download" className="img-fluid rounded" style={{ width: '100px' }} />
          </div>
          
        </div>

   
    
      </div>
    </footer>
  );
};

export default Footer;
