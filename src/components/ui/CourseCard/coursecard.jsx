// import React from 'react';
// import PropTypes from 'prop-types';

// const CourseCard = ({ course, onEnroll, onAddToCart }) => {
//   if (!course) return <p className="text-center mt-5">Loading...</p>;

//   return (
//     <div className="course-details">
//       <h2 className="text-center mb-4">{course.title}</h2>
//       <div className="row g-4">
//         <div className="col-lg-6 col-md-12">
//           <img src={course.image} alt={course.title} className="img-fluid rounded w-100 mb-4" />
//         </div>
//         <div className="col-lg-6 col-md-12">
//           <p className="lead">{course.description}</p>
//           <ul className="list-unstyled">
//             <li><strong>Provider:</strong> {course.provider_data.name}</li>
//             <li><strong>Language:</strong> {course.courseLanguage}</li>
//             <li><strong>Price:</strong> {course.free ? 'Free' : `${course.price} ${course.user_currency}`}</li>
//             <li><strong>Subscribers:</strong> {course.subscribers}</li>
//             <li><strong>Rating:</strong> {course.ratings} ({course.ratings_count} reviews)</li>
//             <li><strong>Course Language:</strong> {course.lang}</li>
//             <li><strong>Lessons Count:</strong> {course.lessons_count}</li>
//           </ul>

//           <div className="d-flex align-items-center justify-content-between mb-3">
//             {course.is_live ? 
//               <span className="badge bg-success me-2">Live</span> :
//               <span className="badge bg-danger me-2">Recorded</span>
//             }
//             {course.free ? (
//               <button className="btn btn-danger ms-auto" onClick={onEnroll}>
//                 {course.is_enrolled ? 'Go to Course' : 'Enroll Now'}
//               </button>
//             ) : (
//               <button className="btn btn-secondary ms-auto" onClick={onAddToCart}>
//                 Add to Cart
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// CourseCard.propTypes = {
//   course: PropTypes.object.isRequired,
//   onEnroll: PropTypes.func,
//   onAddToCart: PropTypes.func,
// };

// export default CourseCard;
// import React from 'react';
// import PropTypes from 'prop-types';

// const CourseCard = ({ course, onCourseClick }) => {
//   const renderStars = (rating) => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       stars.push(
//         <span
//           key={i}
//           className={`fa fa-star ${i <= rating ? 'checked' : ''}`}
//           style={{ color: i <= rating ? '#FFD700' : '#e4e5e9' }}
//         >
//           ★
//         </span>
//       );
//     }
//     return stars;
//   };

//   return (
//     <div
//       className="col-lg-3 col-md-4 col-sm-6 mb-4"
//       onClick={() => onCourseClick(course.id)}
//       style={{ cursor: 'pointer' }}
//     >
//       <div className="card h-100 btn-outline-danger">
//         <div className="position-relative">
//           <img
//             src={course.image}
//             className="card-img-top"
//             alt={course.title}
//             style={{ height: '200px', objectFit: 'cover' }}
//           />
//           <span className="badge bg-danger position-absolute top-0 start-0 m-2">{course.isLive}</span>
//         </div>
//         <div className="card-body text-center">
//           <h5 className="card-title">{course.title}</h5>
//           <p className="card-text">{course.provider}</p>
//           <div className="mb-2 d-flex justify-content-center">{renderStars(course.rating)}</div>
//           <p className="text-muted mb-1">({course.ratingCount}) Rate</p>
//           <span className="card-text fw-bold text-danger">{course.price}</span>
//           <div className="d-flex align-items-center justify-content-center mt-2">
//             <i className="fa fa-users me-1"></i>
//             <span>{course.subscribers}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// CourseCard.propTypes = {
//   course: PropTypes.object.isRequired,
//   onCourseClick: PropTypes.func.isRequired,
// };

// export default CourseCard;
// CourseCard.js
// CourseCard.js
import React from 'react';

const CourseCard = ({ course, onCourseClick, showDetails = false }) => {
  return (
    <div
      className="card h-100 mb-4"
      style={{ cursor: onCourseClick ? 'pointer' : 'default' }}
      onClick={() => onCourseClick && onCourseClick(course.id)}
    >
      <div className="position-relative">
        <img
          src={course.image}
          className="card-img-top"
          alt={course.title.slice(0,10)}
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <span className="badge bg-danger position-absolute top-0 start-0 m-2">
          {course.isLive}
        </span>
      </div>
      <div className="card-body text-center">
        <h5 className="card-title">{course.title.slice(0,10)}</h5>
        <p className="card-text">{course.provider}</p>
        <div className="mb-2 d-flex justify-content-center">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={`fa fa-star ${i < course.rating ? 'checked' : ''}`} style={{ color: i < course.rating ? '#FFD700' : '#e4e5e9' }}>
              ★
            </span>
          ))}
        </div>
        <p className="text-muted mb-1">({course.ratingCount}) Rate</p>
        <span className="card-text fw-bold text-danger">{course.price}</span>
        <div className="d-flex align-items-center justify-content-center mt-2">
          <i className="fa fa-users me-1"></i>
          <span>{course.subscribers}</span>
        </div>
        {showDetails && (
          <>
            <p className="lead mt-3">{course.description}</p>
            <ul className="list-unstyled">
              <li><strong>Language:</strong> {course.courseLanguage}</li>
              <li><strong>Lessons Count:</strong> {course.lessons_count}</li>
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
