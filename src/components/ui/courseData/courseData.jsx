import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CourseData = ({ courseApiUrl }) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(courseApiUrl);
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
  }, [courseApiUrl]);

  return (
    <div>
      {courses.length > 0 ? (
        courses.map((course) => (
          <div key={course.id} className="course-item">
            <img src={course.image} alt={course.title} />
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <p>Provider: {course.provider}</p>
            <p>Price: {course.price}</p>
            <p>Rating: {course.rating} ({course.ratingCount} ratings)</p>
            <p>Subscribers: {course.subscribers}</p>
            {course.isLive && <span>Live Now!</span>}
          </div>
        ))
      ) : (
        <p>Loading courses...</p>
      )}
    </div>
  );
};

export default CourseData;
