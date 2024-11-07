
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import Navbar from '../ui/Navbar/Navbar';

// const CourseDetailsPage = () => {
//   const { id } = useParams();
//   const [course, setCourse] = useState(null);
//   const [enrollmentMessage, setEnrollmentMessage] = useState('');
//   const [cartMessage, setCartMessage] = useState('');
//   const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2Rldi5jaGFtcGlvbnNhY2FkZW15LmNhL2FwaS9kYXNoYm9hcmQvbG9naW4iLCJpYXQiOjE3MzA3MjM3MTEsIm5iZiI6MTczMDcyMzcxMSwianRpIjoiWDFHQmY3aHBKN2p4djRWYSIsInN1YiI6IjE5MjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.VI6pqezNvKVTpm0zQesxU0KCBLXPMgWwYGcFAwNmKZo';

//   useEffect(() => {
//     const fetchCourseDetails = async () => {
//       try {
//         const response = await axios.get(`https://dev.championsacademy.ca/api/mobile/courses/single/course/${id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });
//         setCourse(response.data.data);
//       } catch (error) {
//         console.error('Error fetching course details:', error);
//       }
//     };
//     fetchCourseDetails();
//   }, [id]);

//   const handleEnroll = async () => {
//     if (course.is_enrolled) {
//       setEnrollmentMessage('You are already enrolled in this course.');
//       return;
//     }

//     try {
//       const response = await axios.post(
//         'https://dev.championsacademy.ca/api/mobile/users/courses/enroll',
//         { course_id: course.id },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );
//       if (response.data.status) {
//         setCourse((prevCourse) => ({ ...prevCourse, is_enrolled: true }));
//         setEnrollmentMessage(response.data.msg || 'Successfully enrolled in the course!');
//       } else {
//         setEnrollmentMessage('Failed to enroll in the course.');
//       }
//     } catch (error) {
//       console.error('Error enrolling in course:', error);
//       setEnrollmentMessage('An error occurred. Please try again.');
//     }
//   };

//   const handleAddToCart = async () => {
//     try {
//       const response = await axios.post(
//         'https://dev.championsacademy.ca/api/cart/add',
//         { model_id: course.id, model_name: 'Course' },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         }
//       );

//       if (response.data.status) {
//         setCartMessage(response.data.msg || 'Successfully added to cart!');
//       } else {
//         console.log('Add to cart failed:', response.data);
//         setCartMessage('Failed to add to cart.');
//       }
//     } catch (error) {
//       console.error('Error adding to cart:', error);
//       setCartMessage('An error occurred while adding to cart.');
//     }
//   };

//   if (!course) return <p className="text-center mt-5">Loading...</p>;

//   return (
//     <>
//       <Navbar />
//       <div className="container my-5 pt-5">
//         <div className="row g-4">
//           <h2 className="text-center mb-4">{course.title}</h2>
//           <div className="col-lg-6 col-md-12">
//             <img src={course.image} alt={course.title} className="img-fluid rounded w-100 mb-4" />
//           </div>
//           <div className="col-lg-6 col-md-12">
//             <p className="lead">{course.description}</p>
//             <ul className="list-unstyled">
//               <li><strong>Provider:</strong> {course.provider_data.name}</li>
//               <li><strong>Language:</strong> {course.courseLanguage}</li>
//               <li><strong>Price:</strong> {course.free ? 'Free' : `${course.price} ${course.user_currency}`}</li>
//               <li><strong>Subscribers:</strong> {course.subscribers}</li>
//               <li><strong>Rating:</strong> {course.ratings} ({course.ratings_count} reviews)</li>
//               <li><strong>Course Language:</strong> {course.lang}</li>
//               <li><strong>Lessons Count:</strong> {course.lessons_count}</li>
//             </ul>
            
//             <div className="d-flex align-items-center justify-content-between mb-3">
//               {course.is_live ? 
//                 <span className="badge bg-success me-2">Live</span> :
//                 <span className="badge bg-danger me-2">Recorded</span>
//               }
//               <button className="btn btn-danger ms-auto" onClick={handleEnroll}>
//                 {course.is_enrolled ? 'Go to Course' : 'Enroll Now'}
//               </button>
//               <button className="btn btn-secondary ms-2" onClick={handleAddToCart}>
//                 Add to Cart
//               </button>
//             </div>

//             {enrollmentMessage && (
//               <div className="alert alert-info mt-3" role="alert">
//                 {enrollmentMessage}
//               </div>
//             )}

//             {cartMessage && (
//               <div className="alert alert-success mt-3" role="alert">
//                 {cartMessage}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CourseDetailsPage;
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../ui/Navbar/Navbar';
import { CartContext } from '../../Context/CartContext';


const CourseDetailsPage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [enrollmentMessage, setEnrollmentMessage] = useState('');
  const [cartMessage, setCartMessage] = useState('');
  const { addToCart } = useContext(CartContext);
  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2Rldi5jaGFtcGlvbnNhY2FkZW15LmNhL2FwaS9kYXNoYm9hcmQvbG9naW4iLCJpYXQiOjE3MzA3MjM3MTEsIm5iZiI6MTczMDcyMzcxMSwianRpIjoiWDFHQmY3aHBKN2p4djRWYSIsInN1YiI6IjE5MjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.VI6pqezNvKVTpm0zQesxU0KCBLXPMgWwYGcFAwNmKZo';

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`https://dev.championsacademy.ca/api/mobile/courses/single/course/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCourse(response.data.data);
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    };
    fetchCourseDetails();
  }, [id]);

  const handleEnroll = async () => {
    if (course.is_enrolled) {
      setEnrollmentMessage('You are already enrolled in this course.');
      return;
    }

    try {
      const response = await axios.post(
        'https://dev.championsacademy.ca/api/mobile/users/courses/enroll',
        { course_id: course.id },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.status) {
        setCourse((prevCourse) => ({ ...prevCourse, is_enrolled: true }));
        setEnrollmentMessage(response.data.msg || 'Successfully enrolled in the course!');
      } else {
        setEnrollmentMessage('Failed to enroll in the course.');
      }
    } catch (error) {
      console.error('Error enrolling in course:', error);
      setEnrollmentMessage('An error occurred. Please try again.');
    }
  };

  const handleAddToCart = async () => {
    try {
      const response = await axios.post(
        'https://dev.championsacademy.ca/api/cart/add',
        { model_id: course.id, model_name: 'Course' },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.status) {
        addToCart(course);
        setCartMessage(response.data.msg || 'Successfully added to cart!');
      } else {
        console.log('Add to cart failed:', response.data);
        setCartMessage('Failed to add to cart.');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      setCartMessage('An error occurred while adding to cart.');
    }
  };

  if (!course) return <p className="text-center mt-5">Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="container my-5 pt-5">
        <div className="row g-4">
          <h2 className="text-center mb-4">{course.title}</h2>
          <div className="col-lg-6 col-md-12">
            <img src={course.image} alt={course.title} className="img-fluid rounded w-100 mb-4" />
          </div>
          <div className="col-lg-6 col-md-12">
            <p className="lead">{course.description}</p>
            <ul className="list-unstyled">
              <li><strong>Provider:</strong> {course.provider_data.name}</li>
              <li><strong>Language:</strong> {course.courseLanguage}</li>
              <li><strong>Price:</strong> {course.free ? 'Free' : `${course.price} ${course.user_currency}`}</li>
              <li><strong>Subscribers:</strong> {course.subscribers}</li>
              <li><strong>Rating:</strong> {course.ratings} ({course.ratings_count} reviews)</li>
              <li><strong>Course Language:</strong> {course.lang}</li>
              <li><strong>Lessons Count:</strong> {course.lessons_count}</li>
            </ul>

            <div className="d-flex align-items-center justify-content-between mb-3">
              {course.is_live ? 
                <span className="badge bg-success me-2">Live</span> :
                <span className="badge bg-danger me-2">Recorded</span>
              }
              <button className="btn btn-danger ms-auto" onClick={handleEnroll}>
                {course.is_enrolled ? 'Go to Course' : 'Enroll Now'}
              </button>
              <button className="btn btn-secondary ms-2" onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>

            {enrollmentMessage && (
              <div className="alert alert-info mt-3" role="alert">
                {enrollmentMessage}
              </div>
            )}

            {cartMessage && (
              <div className="alert alert-success mt-3" role="alert">
                {cartMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetailsPage;
