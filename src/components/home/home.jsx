import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../ui/Navbar/Navbar';

import imgOne from '../../Assets/images/bg2.jpg';
import imgTwo from '../../Assets/images/b9168f01072e2e70d51e5dfbe5126b2a.jpg';
import imgThree from '../../Assets/images/website-banner-for-online-school-study-courses-vector-27553192.jpg';
import Carousel from '../ui/cursalPointer';
import { useNavigate } from 'react-router-dom';
import Footer from '../ui/Footer/Footer';

// Carousel Component
const CarouselFadeExample = () => (
  <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
    <div className="carousel-inner w-100">
      <div className="carousel-item active">
        <img src={imgTwo} className="d-block w-100" style={{ height: '500px', objectFit: 'cover' }} alt="Slide 1" />
      </div>
      <div className="carousel-item">
        <img src={imgOne} className="d-block w-100" style={{ height: '500px', objectFit: 'cover' }} alt="Slide 2" />
      </div>
      <div className="carousel-item">
        <img src={imgThree} className="d-block w-100" style={{ height: '500px', objectFit: 'cover' }} alt="Slide 3" />
      </div>
    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>
  </div>
);

const CourseCard = ({ course }) => (
  <div className="col-md-4 g-3">
    <div className="card course-card mx-2 bg-light">
      <img
        src={course.image || 'https://via.placeholder.com/150'}
        alt={course.title}
        className="card-img-top"
        style={{ objectFit: 'cover', height: '200px' }}
      />
      <div className="card-body text-center">
        <h5 className="card-title">{course.title}</h5>
        <p className="card-text">{course.description}</p>
        <p className="text-muted">Provider: {course.provider}</p>
        <span className={`badge ${course.price === "Free" ? 'bg-success' : 'bg-primary'}`}>
          {course.price}
        </span>
      </div>
    </div>
  </div>
);

const CourseSlider = () => {
  const [courses, setCourses] = useState([]);
  const courseApiUrl = 'https://dev.championsacademy.ca/api/mobile/courses/paginated/list?page=1';
  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2Rldi5jaGFtcGlvbnNhY2FkZW15LmNhL2FwaS9kYXNoYm9hcmQvbG9naW4iLCJpYXQiOjE3MzA3MjM3MTEsIm5iZiI6MTczMDcyMzcxMSwianRpIjoiWDFHQmY3aHBKN2p4djRWYSIsInN1YiI6IjE5MjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.VI6pqezNvKVTpm0zQesxU0KCBLXPMgWwYGcFAwNmKZo';
  const navigate = useNavigate();

  const handlenavigate = () => {
    navigate("/CourseGrid");
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(courseApiUrl, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = response.data.data
          .map((course) => ({
            id: course.id,
            title: course.title,
            description: course.description,
            thumbnail: course.thumbnail,
            image: course.image || course.thumbnail,
            provider: course.provider_data.name,
            providerAvatar: course.provider_data.avatar,
            price: course.free ? 'Free' : `${course.price} ${course.user_currency}`,
            isLive: course.is_live,
            rating: course.ratings,
            ratingCount: course.ratings_count,
            subscribers: course.subscribers,
          }))
          .slice(0, 10);
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="container my-5">
      <div className='d-flex align-items-end justify-content-end'>
        <button className='btn btn-danger' onClick={handlenavigate}>Tap to See All</button>
      </div>
      <h2 className="text-center mb-4">Live Courses</h2>
      <Carousel
        items={courses}
        renderItem={(course) => <CourseCard key={course.id} course={course} />}
        carouselId="courseCarousel"
      />
    </div>
    
  );
};

// Main App Component
const App = () => {
  return (
    <div>
       <Navbar/>
      <CarouselFadeExample />
      <CourseSlider />
      <Footer/>
      <div className="CopyRight  bg-danger text-white text-center py-3">
          <p className="mb-0 mt-0">Copyright © All rights reserved to Together Apps</p>
        </div>
    </div>
  );
};

export default App;
