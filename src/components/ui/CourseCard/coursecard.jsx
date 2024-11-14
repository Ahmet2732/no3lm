
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
