// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import Navbar from '../ui/Navbar/Navbar';

// const CourseGrid = () => {
//   const [courses, setCourses] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const totalPages = 5;
//   const navigate = useNavigate();
//   const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2Rldi5jaGFtcGlvbnNhY2FkZW15LmNhL2FwaS9kYXNoYm9hcmQvbG9naW4iLCJpYXQiOjE3MzA3MjM3MTEsIm5iZiI6MTczMDcyMzcxMSwianRpIjoiWDFHQmY3aHBKN2p4djRWYSIsInN1YiI6IjE5MjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.VI6pqezNvKVTpm0zQesxU0KCBLXPMgWwYGcFAwNmKZo';

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const response = await axios.get(`https://dev.championsacademy.ca/api/mobile/courses/paginated/list?page=${currentPage}`, {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });
//         const data = response.data.data.map((course) => ({
//           id: course.id,
//           title: course.title,
//           description: course.description,
//           thumbnail: course.thumbnail,
//           image: course.image || course.thumbnail,
//           provider: course.provider_data.name,
//           price: course.free ? 'Free' : `${course.price} ${course.user_currency}`,
//           rating: course.ratings,
//           ratingCount: course.ratings_count,
//           subscribers: course.subscribers,
//           isLive: course.is_live ? 'Live' : 'Recorded',
//         }));
//         setCourses(data);
//       } catch (error) {
//         console.error('Error fetching courses:', error);
//       }
//     };
//     fetchCourses();
//   }, [currentPage]);

//   const handleCourseClick = (id) => {
//     navigate(`/course/${id}`);
//   };

//   const renderStars = (rating) => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       stars.push(
//         <span key={i} className={`fa fa-star ${i <= rating ? 'checked' : ''}`} style={{ color: i <= rating ? '#FFD700' : '#e4e5e9' }}>
//           ★
//         </span>
//       );
//     }
//     return stars;
//   };

//   return (
//     <div>



//       {/* Main container for courses */}
//       <div className="container my-5 pt-5">
//       <Navbar />
//         <div className="row">
//           {courses.map((course) => (
//             <div
//               key={course.id}
//               className="col-lg-3 col-md-4 col-sm-6 mb-4"
//               onClick={() => handleCourseClick(course.id)}
//               style={{ cursor: 'pointer' }}
//             >
//               <div className="card h-100 btn-outline-danger">
//                 <div className="position-relative">
//                   <img src={course.image} className="card-img-top" alt={course.title} style={{ height: '200px', objectFit: 'cover' }} />
//                   <span className="badge bg-danger position-absolute top-0 start-0 m-2">{course.isLive}</span>
//                 </div>
//                 <div className="card-body text-center">
//                   <h5 className="card-title">{course.title}</h5>
//                   <p className="card-text">{course.provider}</p>
//                   <div className="mb-2 d-flex justify-content-center">{renderStars(course.rating)}</div>
//                   <p className="text-muted mb-1">({course.ratingCount}) Rate</p>
//                   <span className="card-text fw-bold text-danger">{course.price}</span>
//                   <div className="d-flex align-items-center justify-content-center mt-2">
//                     <i className="fa fa-users me-1"></i>
//                     <span>{course.subscribers}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Pagination Controls */}
//         <nav aria-label="Page navigation">
//           <ul className="pagination justify-content-center mt-4">
//             <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
//               <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>&laquo; Previous</button>
//             </li>
//             {Array.from({ length: totalPages }, (_, index) => (
//               <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
//                 <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
//                   {index + 1}
//                 </button>
//               </li>
//             ))}
//             <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
//               <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Next &raquo;</button>
//             </li>
//           </ul>
//         </nav>
//       </div>
//     </div>
//   );
// };

// export default CourseGrid;

import React, { useState, useEffect, } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import CourseCard from '../ui/CourseCard/coursecard';



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
              <CourseCard course={course} onCourseClick={handleCourseClick} />
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

