
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cart')) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const updateQuantity = (id, change) => {
    setCartItems(items =>
      items
        .map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const getFoodImage = (item) => {
    const name = item.name.toLowerCase();

    if (name.includes('burger')) {
      return 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400';
    }
    if (name.includes('pizza')) {
      return 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400';
    }
    if (name.includes('fries')) {
      return 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400';
    }
    if (name.includes('biryani')) {
      return 'https://media-assets.swiggy.com/swiggy/image/upload/f_auto%2Cq_auto%2Cfl_lossy/RX_THUMBNAIL/IMAGES/VENDOR/2026/1/18/0e36e3ef-b309-4e00-a9bd-82112656f36d_1309977.jpg';
    }
    if (name.includes('sandwich')) {
      return 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400';
    }
    if (name.includes('coffee')) {
      return 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400';
    }
    if (name.includes('milkshake')) {
      return 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400';
    }
    if (name.includes('garlic bread')) {
      return 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy%2Cf_auto%2Cq_auto%2Cw_300%2Ch_300%2Cc_fit/FOOD_CATALOG/IMAGES/CMS/2025/12/25/4a6f5ea9-2216-4ab4-a988-46f2868ffd5a_0bb55d63-f883-4a89-8526-0639b90ed6ac.jpg';
    }

    return 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400';
  };

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <style>{`
        .cart-page {
          background: #f8f8f8;
          min-height: 75vh;
          padding: 45px 6%;
          color: #252525;
        }

        .cart-heading {
          text-align: center;
          margin-bottom: 35px;
        }

        .cart-label {
          display: inline-block;
          background: #fff0e5;
          color: #e87919;
          padding: 8px 16px;
          border-radius: 25px;
          font-size: 13px;
          font-weight: bold;
          margin-bottom: 12px;
        }

        .cart-heading h1 {
          font-size: 36px;
          margin: 0 0 10px;
        }

        .cart-heading p {
          color: #777;
          font-size: 16px;
        }

        .cart-container {
          max-width: 1050px;
          margin: auto;
        }

        .cart-item {
          display: flex;
          align-items: center;
          gap: 23px;
          background: white;
          padding: 20px;
          margin-bottom: 20px;
          border-radius: 16px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.06);
          transition: 0.3s ease;
        }

        .cart-item:hover {
          transform: translateY(-3px);
          box-shadow: 0 9px 22px rgba(0,0,0,0.10);
        }

        .cart-image {
          width: 145px;
          height: 125px;
          object-fit: cover;
          border-radius: 12px;
        }

        .cart-info {
          flex: 1;
          min-width: 0;
        }

        .cart-info h2 {
          margin: 0 0 10px;
          font-size: 21px;
        }

        .cart-category {
          color: #e87919;
          font-size: 13px;
          font-weight: bold;
        }

        .cart-info p {
          color: #666;
          margin: 10px 0;
        }

        .quantity-controls {
          display: flex;
          align-items: center;
          gap: 14px;
          margin: 13px 0;
        }

        .quantity-controls button {
          width: 34px;
          height: 34px;
          border: none;
          border-radius: 8px;
          background: #fff0e5;
          color: #d65e08;
          font-size: 21px;
          font-weight: bold;
          cursor: pointer;
          transition: 0.2s;
        }

        .quantity-controls button:hover {
          background: #e87919;
          color: white;
        }

        .quantity-number {
          font-weight: bold;
          font-size: 18px;
          min-width: 20px;
          text-align: center;
        }

        .item-subtotal {
          font-weight: bold;
          color: #252525 !important;
        }

        .remove-btn {
          background: #fff0f0;
          color: #d32f2f;
          border: none;
          padding: 11px 15px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: bold;
          transition: 0.2s;
        }

        .remove-btn:hover {
          background: #ffdada;
        }

        .cart-summary {
          background: white;
          max-width: 1050px;
          margin: 30px auto;
          padding: 28px;
          border-radius: 16px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.06);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .summary-info p {
          color: #777;
          margin: 5px 0;
        }

        .cart-total {
          font-size: 29px;
          font-weight: bold;
          color: #252525;
          margin: 8px 0;
        }

        .checkout-btn {
          background: #e87919;
          color: white;
          border: none;
          padding: 15px 25px;
          border-radius: 9px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: 0.25s;
        }

        .checkout-btn:hover:not(:disabled) {
          background: #c65e0c;
          transform: translateY(-3px);
        }

        .checkout-btn:disabled {
          background: #aaa;
          cursor: not-allowed;
        }

        .empty-cart {
          text-align: center;
          padding: 55px 20px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
        }

        .empty-icon {
          font-size: 65px;
          margin-bottom: 15px;
        }

        .empty-cart h2 {
          margin-bottom: 10px;
        }

        .empty-cart p {
          color: #777;
          margin-bottom: 22px;
        }

        .empty-cart button {
          background: #e87919;
          color: white;
          border: none;
          padding: 13px 23px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: bold;
        }

        .empty-cart button:hover {
          background: #c65e0c;
        }

        @media (max-width: 650px) {
          .cart-page {
            padding: 35px 5%;
          }

          .cart-heading h1 {
            font-size: 29px;
          }

          .cart-item {
            flex-wrap: wrap;
            gap: 15px;
          }

          .cart-image {
            width: 100%;
            height: 200px;
          }

          .cart-info {
            width: 100%;
          }

          .remove-btn {
            width: 100%;
          }

          .cart-summary {
            text-align: center;
            justify-content: center;
          }

          .checkout-btn {
            width: 100%;
          }
        }
      `}</style>

      <div className="cart-heading">
        <span className="cart-label">🛒 YOUR FOOD SELECTION</span>
        <h1>My Shopping Cart</h1>
        <p>Review your favourite food before checkout.</p>
      </div>

      <div className="cart-container">
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-icon">🛒</div>
            <h2>Your Cart is Empty!</h2>
            <p>Add some delicious food to your cart.</p>
            <button onClick={() => navigate('/menu')}>
              Explore Menu →
            </button>
          </div>
        ) : (
          cartItems.map(item => (
            <div className="cart-item" key={item.id}>
              <img
                className="cart-image"
                src={getFoodImage(item)}
                alt={item.name}
              />

              <div className="cart-info">
                <h2>{item.name}</h2>

                <span className="cart-category">
                  {item.category || 'Food Item'}
                </span>

                <p>
                  Price: ₹{Number(item.price).toFixed(2)}
                </p>

                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item.id, -1)}>
                    −
                  </button>

                  <span className="quantity-number">
                    {item.quantity}
                  </span>

                  <button onClick={() => updateQuantity(item.id, 1)}>
                    +
                  </button>
                </div>

                <p className="item-subtotal">
                  Subtotal: ₹
                  {(Number(item.price) * item.quantity).toFixed(2)}
                </p>
              </div>

              <button
                className="remove-btn"
                onClick={() => removeItem(item.id)}
              >
                ✕ Remove
              </button>
            </div>
          ))
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="cart-summary">
          <div className="summary-info">
            <p>{totalItems} items in your cart</p>
            <div className="cart-total">
              Total: ₹{total.toFixed(2)}
            </div>
          </div>

          <button
            className="checkout-btn"
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout →
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
