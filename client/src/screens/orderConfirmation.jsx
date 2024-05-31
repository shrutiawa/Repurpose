import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

const OrderConformation = () => {
  const navigate = useNavigate();

  const handleGoToHomePage = () => {
    navigate('/');
  };

  useEffect(() => {
    const deleteCart = async () => {
      try {
        const response = await fetch('http://localhost:5000/carts', {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete cart');
        }
        const data = await response.json();
        console.log('Cart deletion response:', data);
      } catch (error) {
        console.error('Error deleting cart:', error);
      }
    };

    deleteCart();
  }, []);

  return (
    <>
      
        <div className="confirm-container">
          <h2 className="confirm">Order Confirmed!</h2>
          <p className="confirm-para">Your order is placed!</p>
          <p className="confirm-para">Thank You for shopping with Us</p>
          <button className="home-button" onClick={handleGoToHomePage}>OK</button>
        </div>
   
    </>
  );
};

export default OrderConformation;
