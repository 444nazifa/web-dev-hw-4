import React from 'react';

const Cart = ({ cartItems, total, removeItemFromCart, clearCart }) => {
    
    if (cartItems.length === 0) {
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
                    <li key={item.name} className="cart-item">
                        <div className="cart-item-info">
                            <p className="item-name">{item.name}</p>
                            <p className="item-details">{item.quantity} x ${item.price.toFixed(2)}</p>
                        </div>
                        
                        <span className="item-subtotal gold-text">
                            ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        
                        <button 
                            className="remove-btn"
                            onClick={() => removeItemFromCart(item.name)}
                            aria-label={`Remove one ${item.name}`}
                        >
                            &times;
                        </button>
                    </li>
                ))}
            </ul>

            <div className="cart-total">
                <span>Total:</span>
                <span className="gold-text">${total.toFixed(2)}</span>
            </div>

            <div className="cart-actions">
                <button 
                    className="btn-secondary"
                    onClick={clearCart}
                >
                    Clear Cart
                </button>
                <button 
                    className="btn-primary"
                >
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
};

export default Cart;