
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../ui/Navbar/Navbar';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [currency, setCurrency] = useState('');
  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2Rldi5jaGFtcGlvbnNhY2FkZW15LmNhL2FwaS9kYXNoYm9hcmQvbG9naW4iLCJpYXQiOjE3MzA3MjM3MTEsIm5iZiI6MTczMDcyMzcxMSwianRpIjoiWDFHQmY3aHBKN2p4djRWYSIsInN1YiI6IjE5MjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.VI6pqezNvKVTpm0zQesxU0KCBLXPMgWwYGcFAwNmKZo';

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get('https://dev.championsacademy.ca/api/cart/list', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Check if the response is successful and handle the data accordingly
      if (response.data.status) {
        setCartItems(response.data.data);  // Array of cart items
        setTotalPrice(response.data.totalPrice);  // Total price from API
        setCurrency(response.data.user_currency);  // Currency from API
      } else {
        console.error('Error fetching cart items:', response.data);
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-5 pt-5">
        <h2 className="text-center mb-4">Your Cart</h2>
        <div className="row">
          {cartItems.map((item) => (
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
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <h4>Total Price: {totalPrice} {currency}</h4>
        </div>
      </div>
    </>
  );
};

export default Cart;

