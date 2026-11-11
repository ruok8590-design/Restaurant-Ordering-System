
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const navigate = useNavigate();

  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [placingOrder, setPlacingOrder] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const API_URL = 'https://restaurant-ordering-system-okdr.onrender.com';

  const cart = (() => {
    try {
      return JSON.parse(localStorage.getItem('cart') || '[]');
    } catch {
      return [];
    }
  })();

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const submitOrder = async (method) => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Please login first.');
      navigate('/login');
      return;
    }

    if (cart.length === 0) {
      alert('Your cart is empty.');
      navigate('/menu');
      return;
    }

    setPlacingOrder(true);

    try {
      const response = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          deliveryAddress,
          phoneNumber,
          paymentMethod: method,
          items: cart.map(item => ({
            menu_id: item.id,
            quantity: item.quantity,
            price: Number(item.price)
          }))
        })
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          alert('Your session has expired. Please login again.');
          navigate('/login');
          return;
        }

        alert(data.message || 'Order placement failed.');
        return;
      }

      localStorage.removeItem('cart');

      if (method === 'online') {
        alert('Demo payment successful! Order ID: ' + data.orderId);
      } else {
        alert('Order placed successfully! Order ID: ' + data.orderId);
      }

      navigate('/orders');

    } catch (error) {
      console.error('Order Error:', error);
      alert('Unable to connect to server.');
    } finally {
      setPlacingOrder(false);
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!localStorage.getItem('token')) {
      alert('Please login first.');
      navigate('/login');
      return;
    }

    if (cart.length === 0) {
      alert('Your cart is empty.');
      navigate('/menu');
      return;
    }

    if (paymentMethod === 'online') {
      setShowPaymentModal(true);
      return;
    }

    submitOrder('cod');
  };

  const confirmDemoPayment = () => {
    setShowPaymentModal(false);
    submitOrder('online');
  };

  return (
    <div className="checkout-page">
      <style>{`
        .checkout-page {
          background: #f8f8f8;
          min-height: 75vh;
          padding: 45px 6%;
          color: #252525;
        }

        .checkout-heading {
          text-align: center;
          margin-bottom: 35px;
        }

        .checkout-label {
          display: inline-block;
          background: #fff0e5;
          color: #e87919;
          padding: 8px 16px;
          border-radius: 25px;
          font-size: 13px;
          font-weight: bold;
          margin-bottom: 12px;
        }

        .checkout-heading h1 {
          font-size: 36px;
          margin: 0 0 10px;
        }

        .checkout-heading p {
          color: #777;
          font-size: 16px;
        }

        .checkout-container {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 25px;
          max-width: 1100px;
          margin: auto;
          align-items: start;
        }

        .checkout-form,
        .order-summary {
          background: white;
          padding: 28px;
          border-radius: 16px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.06);
        }

        .checkout-form h2,
        .order-summary h2 {
          color: #252525;
          margin: 0 0 22px;
          font-size: 22px;
        }

        .form-section {
          margin-bottom: 28px;
        }

        .checkout-form label:not(.payment-option) {
          display: block;
          font-weight: bold;
          color: #444;
          margin-bottom: 9px;
          font-size: 14px;
        }

        .checkout-form input[type="text"],
        .checkout-form input[type="tel"],
        .checkout-form textarea {
          width: 100%;
          padding: 14px;
          border: 1px solid #ddd;
          border-radius: 9px;
          margin-bottom: 20px;
          font-size: 15px;
          box-sizing: border-box;
          font-family: inherit;
          outline: none;
          transition: 0.2s;
        }

        .checkout-form textarea {
          min-height: 110px;
          resize: vertical;
        }

        .checkout-form input:focus,
        .checkout-form textarea:focus {
          border-color: #e87919;
          box-shadow: 0 0 0 3px rgba(232,121,25,0.10);
        }

        .payment-option {
          display: flex !important;
          align-items: center;
          gap: 12px;
          padding: 15px;
          border: 1px solid #eee;
          border-radius: 10px;
          margin-bottom: 12px;
          cursor: pointer;
          transition: 0.2s;
          color: #444;
        }

        .payment-option:has(input:checked) {
          border-color: #e87919;
          background: #fff8f2;
        }

        .payment-option input {
          accent-color: #e87919;
          width: 17px;
          height: 17px;
        }

        .payment-icon {
          font-size: 22px;
        }

        .payment-note {
          font-size: 13px;
          color: #777;
          line-height: 1.6;
          margin-top: 12px;
        }

        .place-order-btn {
          width: 100%;
          background: #e87919;
          color: white;
          border: none;
          padding: 16px;
          border-radius: 9px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          margin-top: 10px;
          transition: 0.25s;
        }

        .place-order-btn:hover:not(:disabled) {
          background: #c65e0c;
          transform: translateY(-2px);
        }

        .place-order-btn:disabled {
          background: #aaa;
          cursor: not-allowed;
        }

        .payment-modal {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          z-index: 1000;
        }

        .payment-modal-content {
          background: white;
          width: 100%;
          max-width: 420px;
          padding: 30px;
          border-radius: 16px;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .payment-modal-content h2 {
          margin-bottom: 12px;
          color: #252525;
        }

        .demo-payment-warning {
          color: #b45309;
          background: #fff7ed;
          padding: 12px;
          border-radius: 8px;
          font-size: 14px;
          margin: 18px 0;
        }

        .demo-payment-amount {
          font-size: 28px;
          font-weight: bold;
          margin: 20px 0;
        }

        .demo-pay-btn,
        .demo-cancel-btn {
          width: 100%;
          padding: 14px;
          border: none;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
          margin-top: 10px;
        }

        .demo-pay-btn {
          background: #e87919;
          color: white;
        }

        .demo-cancel-btn {
          background: #eee;
          color: #333;
        }

        .summary-subtitle {
          color: #777;
          font-size: 14px;
          margin-top: -12px;
          margin-bottom: 20px;
        }

        .summary-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          padding: 15px 0;
          border-bottom: 1px solid #eee;
          color: #555;
          font-size: 14px;
        }

        .summary-item strong {
          color: #252525;
          white-space: nowrap;
        }

        .summary-total {
          display: flex;
          justify-content: space-between;
          font-size: 24px;
          font-weight: bold;
          color: #252525;
          margin-top: 24px;
          gap: 10px;
        }

        .secure-note {
          background: #f6faf5;
          color: #477345;
          border-radius: 9px;
          padding: 13px;
          font-size: 13px;
          margin-top: 25px;
          line-height: 1.6;
        }

        .empty-checkout {
          max-width: 600px;
          margin: auto;
          background: white;
          padding: 45px 25px;
          border-radius: 16px;
          text-align: center;
          box-shadow: 0 4px 15px rgba(0,0,0,0.06);
        }

        .empty-checkout div {
          font-size: 55px;
          margin-bottom: 15px;
        }

        .empty-checkout p {
          color: #777;
          margin-bottom: 22px;
        }

        .empty-checkout button {
          background: #e87919;
          color: white;
          border: none;
          padding: 13px 22px;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
        }

        @media (max-width: 750px) {
          .checkout-container {
            grid-template-columns: 1fr;
          }

          .checkout-page {
            padding: 35px 5%;
          }

          .checkout-heading h1 {
            font-size: 30px;
          }
        }
      `}</style>

      <div className="checkout-heading">
        <span className="checkout-label">🔒 SECURE ORDERING</span>
        <h1>Complete Your Order</h1>
        <p>Just a few more details before your delicious food arrives!</p>
      </div>

      {showPaymentModal && (
        <div className="payment-modal">
          <div className="payment-modal-content">
            <h2>💳 Demo Payment</h2>

            <p>
              Confirm your demo payment to place your order.
            </p>

            <div className="demo-payment-warning">
              This is a simulated payment. No real money will be charged.
            </div>

            <div className="demo-payment-amount">
              ₹{total.toFixed(2)}
            </div>

            <button
              className="demo-pay-btn"
              type="button"
              onClick={confirmDemoPayment}
              disabled={placingOrder}
            >
              {placingOrder
                ? 'Processing...'
                : 'Simulate Successful Payment'}
            </button>

            <button
              className="demo-cancel-btn"
              type="button"
              onClick={() => setShowPaymentModal(false)}
              disabled={placingOrder}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {cart.length === 0 ? (
        <div className="empty-checkout">
          <div>🛒</div>
          <h2>Your Cart is Empty</h2>
          <p>Add some delicious food before proceeding to checkout.</p>
          <button onClick={() => navigate('/menu')}>
            Explore Menu →
          </button>
        </div>
      ) : (
        <div className="checkout-container">
          <form className="checkout-form" onSubmit={handlePlaceOrder}>
            <div className="form-section">
              <h2>📍 Delivery Details</h2>

              <label>Delivery Address</label>
              <textarea
                placeholder="Enter your complete delivery address"
                value={deliveryAddress}
                onChange={e => setDeliveryAddress(e.target.value)}
                required
              />

              <label>Phone Number</label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
                pattern="[0-9]{10,15}"
                title="Enter a phone number containing 10 to 15 digits"
                required
              />
            </div>

            <div className="form-section">
              <h2>💳 Payment Method</h2>

              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={e => setPaymentMethod(e.target.value)}
                />
                <span className="payment-icon">💵</span>
                <span>Cash on Delivery</span>
              </label>

              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="online"
                  checked={paymentMethod === 'online'}
                  onChange={e => setPaymentMethod(e.target.value)}
                />
                <span className="payment-icon">💳</span>
                <span>Online Payment</span>
              </label>

              <p className="payment-note">
                Online payment is currently a selection option; a payment
                gateway has not yet been connected.
              </p>
            </div>

            <button
              className="place-order-btn"
              type="submit"
              disabled={placingOrder}
            >
              {placingOrder ? 'Placing Order...' : 'Place Order →'}
            </button>
          </form>

          <div className="order-summary">
            <h2>🧾 Order Summary</h2>
            <p className="summary-subtitle">
              {totalItems} items in your order
            </p>

            {cart.map(item => (
              <div className="summary-item" key={item.id}>
                <span>{item.name} × {item.quantity}</span>
                <strong>
                  ₹{(Number(item.price) * item.quantity).toFixed(2)}
                </strong>
              </div>
            ))}

            <div className="summary-total">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            <div className="secure-note">
              ✓ Your order details will be securely submitted to our restaurant.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;
