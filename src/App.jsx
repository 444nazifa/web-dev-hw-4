import React, { useState, useEffect, useMemo } from "react";
import Menu from "./Menu";
import Cart from "./Cart";
import "./App.css";

const API = import.meta.env.VITE_API_URL;

function App() {
  /* ---------------- MENU ---------------- */
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMenu = async () => {
      try {
        const res = await fetch(`${API}/api/menu`);
        if (!res.ok) throw new Error("Failed to load menu");
        const data = await res.json();
        setMenuItems(data);
      } catch (err) {
        console.error("❌ Failed to fetch menu:", err);
      } finally {
        setLoading(false);
      }
    };

    loadMenu();
  }, []);

  /* ---------------- CART (DB-backed) ---------------- */
  const [cartId, setCartId] = useState(() => localStorage.getItem("cartId") || "");
  const [cartItems, setCartItems] = useState([]);
  const [cartLoaded, setCartLoaded] = useState(false); // ✅ prevents refresh wipe

  // Create or load cart from MongoDB (runs once)
  useEffect(() => {
    const initCart = async () => {
      try {
        let id = localStorage.getItem("cartId");

        // Create new cart if none exists
        if (!id) {
          const created = await fetch(`${API}/api/cart`, { method: "POST" });
          if (!created.ok) throw new Error("Failed to create cart");
          const newCart = await created.json();
          id = newCart._id;
          localStorage.setItem("cartId", id);
        }

        setCartId(id);

        // Load cart contents from DB
        const res = await fetch(`${API}/api/cart/${id}`);
        if (!res.ok) throw new Error("Failed to load cart");
        const cart = await res.json();

        setCartItems(cart.items || []);
        setCartLoaded(true); // ✅ mark loaded AFTER we set items
      } catch (err) {
        console.error("❌ Failed to init/load cart:", err);
      }
    };

    initCart();
  }, []);

  // Sync cart changes to MongoDB (ONLY after initial load)
  useEffect(() => {
    if (!cartId || !cartLoaded) return; // ✅ prevents wiping cart on refresh

    const syncCart = async () => {
      try {
        await fetch(`${API}/api/cart/${cartId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: cartItems }),
        });
      } catch (err) {
        console.error("❌ Failed to sync cart:", err);
      }
    };

    syncCart();
  }, [cartId, cartLoaded, cartItems]);

  /* ---------------- CART ACTIONS ---------------- */

  // cartItems are stored in DB as: { itemId, name, price, quantity }
  const addItemToCart = (menuItem) => {
    setCartItems((prev) => {
      const exists = prev.find((i) => i.itemId === menuItem._id);
      if (exists) {
        return prev.map((i) =>
          i.itemId === menuItem._id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          itemId: menuItem._id,
          name: menuItem.name,
          price: menuItem.price,
          quantity: 1,
        },
      ];
    });
  };

  const removeItemFromCart = (itemId) => {
    setCartItems((prev) => prev.filter((i) => i.itemId !== itemId));
  };

  const clearCart = () => setCartItems([]);

  /* ---------------- TOTALS ---------------- */

  const cartTotal = useMemo(() => {
    return cartItems.reduce((sum, i) => sum + Number(i.price) * (i.quantity || 0), 0);
  }, [cartItems]);

  const cartCount = useMemo(() => {
    return cartItems.reduce((sum, i) => sum + (i.quantity || 0), 0);
  }, [cartItems]);

  /* ---------------- CHECKOUT ---------------- */

  const handleCheckout = async () => {
    if (cartItems.length === 0) return alert("Cart is empty!");

    try {
      const res = await fetch(`${API}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cartItems, total: cartTotal }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        console.error("Checkout failed:", data);
        return alert(`❌ Checkout failed: ${data.message || "Unknown error"}`);
      }

      alert(`✅ Order placed! Order ID: ${data.orderId || ""}`);

      // Clear DB cart + UI
      if (cartId) await fetch(`${API}/api/cart/${cartId}`, { method: "DELETE" });
      clearCart();
    } catch (err) {
      console.error(err);
      alert("❌ Checkout failed. Is the backend running?");
    }
  };

  /* ---------------- RENDER ---------------- */

  return (
    <div className="app-container">
      <header className="site-header">
        <div className="logo"><span>🥄</span> The Gilded Spoon</div>
        <nav className="site-nav">
          <a href="#home">Home</a>
          <a href="#menu">Menu</a>
          <a href="#cart-section">Cart ({cartCount})</a>
          <a href="#about">About</a>
        </nav>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-inner">
            <h1>The Gilded Spoon</h1>
            <p>Seasonal plates • Cozy vibes • NYC classics</p>
            <a className="btn" href="#menu">Explore Menu</a>
          </div>
        </section>

        <section id="menu" className="section">
          <h2 className="section-title">Our Menu</h2>
          {loading ? (
            <p className="loading-text">Loading fresh ingredients...</p>
          ) : menuItems.length > 0 ? (
            <Menu items={menuItems} addItemToCart={addItemToCart} />
          ) : (
            <p className="error-text">Menu is empty. Did you run seed.js and is the backend running?</p>
          )}
        </section>

        <section id="cart-section" className="section">
          <h2 className="section-title gold-text">Your Order</h2>
          <Cart
            cartItems={cartItems}
            total={cartTotal}
            removeItemFromCart={removeItemFromCart}
            onCheckout={handleCheckout}
            clearCart={clearCart}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
