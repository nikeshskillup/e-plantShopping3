import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping, updateCartTotal }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Total quantity of items in the cart for display on the cart icon
  const calculateQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Calculate total cost of all items in the cart
  const calculateAmount = () => {
    return cart.reduce((total, item) => total + item.cost * item.quantity, 0);
  };

  // Handle incrementing quantity
  const handleInct = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
    updateCartTotal(calculateTotalQuantity(), calculateTotalAmount()); // Update total items and amount
  };

  // Handle decrementing quantity and remove item if quantity reaches 0
  const handleDect = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem({ name: item.name }));
    }
    updateCartTotal(calculateTotalQuantity(), calculateTotalAmount()); // Update total items and amount
  };

  // Handle removing item from cart
  const handleRe = (item) => {
    dispatch(removeItem({ name: item.name }));
    updateCartTotal(calculateTotalQuantity(), calculateTotalAmount()); // Update total items and amount
  };

  // Calculate total cost for a specific item based on its quantity
  const calculateCost = (item) => {
    return item.cost * item.quantity;
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              
              <div className="cart-item-cost">${item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" ={onContinueShopping}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
