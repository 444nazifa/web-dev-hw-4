import React from "react";

const Cart = ({ cartItems, total, removeItemFromCart, onCheckout, clearCart }) => {
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="cart-empty-message">
        Your cart is empty. Please select a dish from the menu above!
      </div>
    );
  }

  return (
    <div className="cart-container">
      <ul className="cart-list">
        {cartItems.map((item) => (
          <li key={item.itemId} className="cart-item">
            <div className="cart-item-info">
              <p className="item-name">{item.name}</p>
              <p className="item-details">
                {item.quantity} x ${Number(item.price).toFixed(2)}
              </p>
            </div>

            <span className="item-subtotal gold-text">
              ${(Number(item.price) * item.quantity).toFixed(2)}
            </span>

            <button
              className="remove-btn"
              onClick={() => removeItemFromCart(item.itemId)}
              aria-label={`Remove ${item.name}`}
              type="button"
            >
              &times;
            </button>
          </li>
        ))}
      </ul>

      <div className="cart-total">
        <span>Total:</span>
        <span className="gold-text">${Number(total).toFixed(2)}</span>
      </div>

      <div className="cart-actions">
        <button className="btn-secondary" onClick={clearCart} type="button">
          Clear Cart
        </button>
        <button className="btn-primary" onClick={onCheckout} type="button">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
