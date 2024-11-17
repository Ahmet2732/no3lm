import React from 'react';
import toast from 'react-hot-toast';

const CartItems = ({ items, currency, onDelete }) => {
  return (
    <div className="row">
      {items.map((item) => (
        <div key={item.id} className="col-md-4 mb-4">
          <div className="card h-100">
            <img 
              src={item.image || 'https://via.placeholder.com/150'} 
              alt={item.name || 'Course Image'} 
              className="card-img-top" 
              style={{ height: '200px', objectFit: 'cover' }} 
            />
            <div className="card-body text-center">
              <h5 className="card-title">{item.name || 'Unnamed Course'}</h5>
              <p className="card-text">Original Price: {item.price} {currency}</p>
              <p className="card-text">Current Price: {item.current_price} {currency}</p>
              {item.discount_price > 0 && (
                <p className="card-text text-success">Discount: {item.discount_price} {currency}</p>
              )}
              {item.is_soldout ? (
                <span className="badge bg-danger">Sold Out</span>
              ) : (
                <span className="badge bg-success">Available</span>
              )}
              {/* Delete Icon */}
              <div className="delete d-flex justify-content-end align-items-end">
                <button 
                  className="btn btn-link text-danger mt-3 p-0"
                  onClick={() => onDelete(item.id)}
                  title="Delete item"
                >
                  <i className="bi bi-trash" style={{ fontSize: '1.5rem' }}></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItems;