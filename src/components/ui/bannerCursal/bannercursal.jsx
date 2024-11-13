import React from 'react';

const CarouselFadeExample = ({ images }) => {
  return (
    <div id="carouselExampleFade" className="carousel slide carousel-fade mt-5" data-bs-ride="carousel">
      <div className="carousel-inner w-100">
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? 'active' : ''}`}
          >
            <img
              src={image}
              className="d-block w-100"
              style={{ height: '500px', objectFit: 'cover' }}
              alt={` ${index + 1}`}
            />
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon " aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default CarouselFadeExample;
