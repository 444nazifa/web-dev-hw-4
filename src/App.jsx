import React, { useState, useMemo } from 'react';
import Menu from './Menu'; // Your existing component
import Cart from './Cart'; // Your existing component
import './App.css'; // Import the main CSS file

// Central data for the menu (using the full list from your original index.html)
const MENU_ITEMS = [
    { id: 1, name: "Roasted Tomato Soup", price: 9.00, category: "Starters" },
    { id: 2, name: "Crispy Calamari", price: 14.00, category: "Starters" },
    { id: 3, name: "Shaved Fennel Salad", price: 12.00, category: "Starters" },
    
    { id: 4, name: "Truffle Tagliatelle", price: 19.00, category: "Mains" },
    { id: 5, name: "Midtown Smash Burger", price: 18.00, category: "Mains" },
    { id: 6, name: "Miso Glazed Salmon", price: 24.00, category: "Mains" },
    
    { id: 7, name: "Herbed Fries", price: 7.00, category: "Sides" },
    { id: 8, name: "Grilled Asparagus", price: 8.00, category: "Sides" },
    { id: 9, name: "Garlic Broccolini", price: 7.00, category: "Sides" },

    { id: 10, name: "Basque Cheesecake", price: 9.00, category: "Desserts" },
    { id: 11, name: "Chocolate Lava Cake", price: 10.00, category: "Desserts" },
    { id: 12, name: "Lemon Olive Oil Cake", price: 9.00, category: "Desserts" },
];

function App() {
  const [cartItems, setCartItems] = useState([]);
  // ... (addItemToCart, removeItemFromCart, clearCart, cartTotal functions remain the same)
  // --- Start Cart Logic (copy/paste these functions if you modified them) ---
  const addItemToCart = (item) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(i => i.name === item.name);
      if (existingItemIndex > -1) {
        const newItems = [...prevItems];
        newItems[existingItemIndex] = { ...newItems[existingItemIndex], quantity: newItems[existingItemIndex].quantity + 1 };
        return newItems;
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
    document.getElementById('cart').scrollIntoView({ behavior: 'smooth' });
  };

  const removeItemFromCart = (name) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(i => i.name === name);
      if (existingItemIndex > -1) {
        const item = prevItems[existingItemIndex];
        if (item.quantity > 1) {
          const newItems = [...prevItems];
          newItems[existingItemIndex] = { ...item, quantity: item.quantity - 1 };
          return newItems;
        } else {
          return prevItems.filter(i => i.name !== name);
        }
      }
      return prevItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };
  
  const cartTotal = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);
  // --- End Cart Logic ---


  return (
    <div className="app-container">
      {/* HEADER - Includes Navigation */}
      <header className="site-header">
        <div className="logo"><span>🥄</span> The Gilded Spoon</div>
        {/* We skip the toggle/hamburger menu for now as it requires CSS/JS handling */}
        <nav className="site-nav" aria-label="Primary">
          <a href="#home">Home</a>
          <a href="#menu">Menu</a>
          <a href="#gallery">Gallery</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        {/* HOME SECTION (HERO) */}
        <section id="home" className="hero" role="img" aria-label="A delicious-looking burger on a wooden board">
          <div className="hero-inner">
            <h1>The Gilded Spoon</h1>
            <p>Seasonal plates • Cozy vibes • NYC classics</p>
            <a className="btn" href="#menu">Explore Menu</a>
          </div>
        </section>
        
        {/* MENU SECTION (Integrating Cart Logic) */}
        <section id="menu" className="section">
          <h2 className="section-title">Our Menu</h2>
          <p className="section-lead">Click an item to add it to your cart. All prices are in USD.</p>
          <Menu items={MENU_ITEMS} addItemToCart={addItemToCart} />
        </section>

        {/* ORDER CART SECTION (Custom Section Below Menu) */}
        <section id="cart-section" className="section">
          <h2 className="section-title gold-text">Your Order Cart</h2>
          <Cart 
            cartItems={cartItems}
            total={cartTotal}
            removeItemFromCart={removeItemFromCart}
            clearCart={clearCart}
          />
        </section>
        
        {/* GALLERY SECTION */}
        <section id="gallery" className="section">
          <h2 className="section-title">Gallery</h2>
          <p className="section-lead">A glimpse into our world. Drag or swipe to explore.</p>
          <div className="slider">
            <div className="slider-viewport">
                {/* Note: In a real React app, these image URLs should be imported or moved to the public folder */}
                <figure className="slide" id="slide-1"><img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1600&auto=format&fit=crop" alt="Burger close-up" loading="lazy" /></figure>
                <figure className="slide" id="slide-2"><img src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1600&auto=format&fit=crop" alt="Pasta with truffle" loading="lazy" /></figure>
                <figure className="slide" id="slide-3"><img src="https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1600&auto=format&fit=crop" alt="Tacos plate" loading="lazy" /></figure>
                <figure className="slide" id="slide-4"><img src="https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1600&auto=format&fit=crop" alt="Wood-fired pizza" loading="lazy" /></figure>
                <figure className="slide" id="slide-5"><img src="https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=1600&auto=format&fit=crop" alt="Steak" loading="lazy" /></figure>
                <figure className="slide" id="slide-6"><img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1587&auto=format&fit=crop" alt="Elegant restaurant interior with warm lighting" loading="lazy" /></figure>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="section">
          <h2 className="section-title">About Us</h2>
          <div className="about-grid">
            <div className="about-text">
                <p>
                    Opened in 2015, The Gilded Spoon is a sophisticated yet cozy neighborhood spot just a stone's throw from Lexington Avenue.
                    Our mission is simple: use seasonal ingredients to create bold flavors, and offer hospitality that feels like family.
                </p>
                <p>
                    We’re known for our signature <strong>Truffle Tagliatelle</strong>, a rotating fresh seafood program, and delicious desserts baked in-house daily. Come join us for a memorable meal.
                </p>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="section">
          <h2 className="section-title">Get In Touch</h2>
          <div className="contact-grid">
            <div className="map-wrap">
              <iframe title="Map to The Gilded Spoon"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.42233265337!2d-73.98006098459393!3d40.75276297932757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2590186652511%3A0x4033285521741604!2sGrand%20Central%20Terminal!5e0!3m2!1sen!2sus!4v1668819493356!5m2!1sen!2sus"
                width="100%" height="100%" style={{border:0}} allowFullScreen="" loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <form className="contact-form" method="post" action="#">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" required />
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" required />
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="5" required></textarea>
              <button className="btn" type="submit">Send Message</button>
            </form>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="footer-grid">
          <div>
            <h4>Visit Us</h4>
            <address>
              123 Lexington Ave<br />
              New York, NY 10016<br />
              <a href="tel:+12125550123">(212) 555-0123</a>
            </address>
          </div>
          <div>
            <h4>Hours</h4>
            <ul className="hours">
              <li>Mon–Thu: 11am – 9pm</li>
              <li>Fri–Sat: 11am – 10:30pm</li>
              <li>Sun: 12pm – 8pm</li>
            </ul>
          </div>
          <div>
            <h4>Follow Us</h4>
            <div className="social">
              <a href="#">Facebook</a>
              <a href="#">Instagram</a>
              <a href="#">TikTok</a>
            </div>
          </div>
        </div>
        <p className="copy">© 2025 The Gilded Spoon. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;