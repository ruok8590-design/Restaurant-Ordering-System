
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Orders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await fetch(
          'http://localhost:5000/api/orders/my-orders',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch orders.');
        }

        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const groupedOrders = Object.values(
    orders.reduce((groups, item) => {
      if (!groups[item.order_id]) {
        groups[item.order_id] = {
          ...item,
          items: []
        };
      }

      if (item.menu_id !== null) {
        groups[item.order_id].items.push(item);
      }

      return groups;
    }, {})
  );

  if (loading) {
    return <h2 className="orders-message">Loading your orders...</h2>;
  }

  if (error) {
    return <h2 className="orders-message">{error}</h2>;
  }

  return (
    <div className="orders-page">
      <style>{`
        .orders-page {
          background: #f8f8f8;
          min-height: 70vh;
          padding: 40px 5%;
        }

        .orders-title {
          text-align: center;
          font-size: 34px;
          color: #252525;
          margin-bottom: 10px;
        }

        .orders-subtitle {
          text-align: center;
          color: #777;
          margin-bottom: 35px;
        }

        .orders-container {
          max-width: 1000px;
          margin: auto;
        }

        .order-card {
          background: white;
          border-radius: 14px;
          padding: 25px;
          margin-bottom: 25px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.07);
        }

        .order-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          border-bottom: 1px solid #eee;
          padding-bottom: 18px;
        }

        .order-header h2 {
          color: #252525;
          margin: 0;
        }

        .order-status {
          background: #fff3df;
          color: #d97706;
          padding: 8px 15px;
          border-radius: 20px;
          font-weight: bold;
          font-size: 13px;
          text-transform: capitalize;
        }

        .order-details {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
          padding: 20px 0;
        }

        .detail-box {
          background: #fafafa;
          padding: 14px;
          border-radius: 8px;
        }

        .detail-label {
          color: #888;
          font-size: 13px;
          margin-bottom: 6px;
        }

        .detail-value {
          color: #333;
          font-weight: bold;
          overflow-wrap: anywhere;
        }

        .ordered-items {
          border-top: 1px solid #eee;
          padding-top: 18px;
        }

        .ordered-items h3 {
          color: #252525;
          margin-bottom: 15px;
        }

        .ordered-item {
          display: flex;
          justify-content: space-between;
          gap: 15px;
          padding: 12px 0;
          border-bottom: 1px solid #f1f1f1;
          color: #555;
        }

        .order-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 20px;
        }

        .order-date {
          color: #888;
          font-size: 13px;
        }

        .order-total {
          font-size: 23px;
          font-weight: bold;
          color: #e87919;
        }

        .empty-orders {
          background: white;
          text-align: center;
          padding: 50px 20px;
          border-radius: 14px;
        }

        .empty-orders button {
          background: #e87919;
          color: white;
          border: none;
          padding: 12px 22px;
          border-radius: 7px;
          cursor: pointer;
          font-weight: bold;
        }

        .orders-message {
          text-align: center;
          padding: 40px;
        }

        @media (max-width: 600px) {
          .order-details {
            grid-template-columns: 1fr;
          }

          .order-card {
            padding: 18px;
          }
        }
      `}</style>

      <h1 className="orders-title">My Orders</h1>
      <p className="orders-subtitle">
        Track and manage your food orders
      </p>

      <div className="orders-container">
        {groupedOrders.length === 0 ? (
          <div className="empty-orders">
            <h2>No Orders Yet!</h2>
            <p>Your delicious food journey starts here.</p>
            <button onClick={() => navigate('/menu')}>
              Explore Menu
            </button>
          </div>
        ) : (
          groupedOrders.map((order) => (
            <div className="order-card" key={order.order_id}>
              <div className="order-header">
                <h2>Order #{order.order_id}</h2>
                <span className="order-status">
                  {order.status}
                </span>
              </div>

              <div className="order-details">
                <div className="detail-box">
                  <div className="detail-label">Delivery Address</div>
                  <div className="detail-value">
                    {order.delivery_address}
                  </div>
                </div>

                <div className="detail-box">
                  <div className="detail-label">Phone Number</div>
                  <div className="detail-value">
                    {order.phone_number}
                  </div>
                </div>

                
                                <div className="detail-box">
                  <div className="detail-label">Payment Method</div>
                  <div className="detail-value">
                    {order.payment_method === 'cod'
                      ? 'Cash on Delivery'
                      : 'Online Payment'}
                  </div>
                </div>

                <div className="detail-box">
                  <div className="detail-label">Payment Status</div>
                  <div
                    className="detail-value"
                    style={{
                      color: order.payment_status === 'Paid' ? 'green' : '#d97706'
                    }}
                  >
                    {order.payment_status === 'Paid'
                      ? 'Paid (Demo)'
                      : order.payment_status || 'Pending'}
                  </div>
                </div>
              </div>

              <div className="ordered-items">
                <h3>Ordered Items</h3>

                {order.items.map((item, index) => (
                  <div
                    className="ordered-item"
                    key={`${item.menu_id}-${index}`}
                  >
                    <span>
                      {item.item_name} × {item.quantity}
                    </span>

                    <strong>
                      ₹{(
                        Number(item.price) * item.quantity
                      ).toFixed(2)}
                    </strong>
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <span className="order-date">
                  Ordered on: {new Date(order.created_at).toLocaleString()}
                </span>

                <span className="order-total">
                  ₹{Number(order.total_amount).toFixed(2)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Orders;