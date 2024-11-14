

import React, { useState, useEffect, } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import CourseCard from '../components/ui/CourseCard/coursecard'



const CourseGrid = () => {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;
  const navigate = useNavigate();
  


  
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`/mobile/courses/paginated/list?page=${currentPage}`, {
       
        });
        const data = response.data.data.map((course) => ({
          id: course.id,
          title: course.title,
          description: course.description,
          image: course.image || course.thumbnail,
          provider: course.provider_data.name,
          price: course.free ? 'Free' : `${course.price} ${course.user_currency}`,
          rating: course.ratings,
          ratingCount: course.ratings_count,
          subscribers: course.subscribers,
          isLive: course.is_live ? 'Live' : 'Recorded',
        }));
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, [currentPage]);

  const handleCourseClick = (id) => {
    navigate(`/course/${id}`);
  };

  return (
    <div>
      <div className="container my-5 pt-5">
        <div className="row gy-4">
          {courses.map((course) => (
            <div className="col-lg-3 col-md-4 col-sm-6" key={course.id}>
              <CourseCard  course={course} onCourseClick={handleCourseClick} />
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <nav aria-label="Page navigation">
          <ul className="pagination justify-content-center mt-4">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>&laquo; Previous</button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Next &raquo;</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default CourseGrid;

