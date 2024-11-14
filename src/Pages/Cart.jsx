import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons
import Navbar from '../components/ui/Navbar/Navbar';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [currency, setCurrency] = useState('');
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get('/cart/list', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.status) {
        setCartItems(response.data.data);
        setTotalPrice(response.data.totalPrice);
        setCurrency(response.data.user_currency);
      } else {
        console.error('Error fetching cart items:', response.data);
        toast.error('Failed to load cart items.');
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
      toast.error('An error occurred while loading the cart.');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/cart/delete/${id}`, {
      
      });
  
      if (response.data.status) {
        // Filter out the deleted item from cartItems
        const updatedCartItems = cartItems.filter(item => item.id !== id);
        
        // Update the cartItems state
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        
        // Update the total price by subtracting the price of the removed item
        setTotalPrice(prevTotal => prevTotal - response.data.item_price);
  
  
        toast.success('Item removed from cart successfully.');
      } else {
        console.error('Error deleting cart item:', response.data);
        toast.error('Failed to remove item from cart.');
      }
    } catch (error) {
      console.error('Error deleting cart item:', error);
      toast.error('An error occurred while deleting the item.');
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
                  {/* Delete Icon */}
                  <div className="delete d-flex justify-content-end align-items-end">
                    <button 
                      className="btn btn-link text-danger mt-3 p-0"
                      onClick={() => handleDelete(item.id)}
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
        <div className="text-center mt-4">
          <h4>Total Price: {totalPrice} {currency}</h4>
        </div>
      </div>
    </>
  );
};

export default Cart;
