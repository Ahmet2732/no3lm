import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CourseCard from '../components/ui/CourseCard/coursecard';
import Pagination from '../components/ui/pagination/pagination';


const CourseGrid = () => {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5; // You can modify this according to your API response
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`/mobile/courses/paginated/list?page=${currentPage}`);
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
              <CourseCard course={course} onCourseClick={handleCourseClick} />
            </div>
          ))}
        </div>

        {/* Use the Pagination Component */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default CourseGrid;