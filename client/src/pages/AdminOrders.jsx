
import { useEffect, useState } from 'react';

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        'http://localhost:5000/api/admin/orders',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to load orders');
      }

      const groupedOrders = Object.values(
        data.reduce((groups, item) => {
          if (!groups[item.order_id]) {
            groups[item.order_id] = {
              ...item,
              items: []
            };
          }

          if (item.item_name) {
            groups[item.order_id].items.push(item);
          }

          return groups;
        }, {})
      );

      setOrders(groupedOrders);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, status) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/orders/${orderId}/status`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ status })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update status');
      }

      setOrders(previousOrders =>
        previousOrders.map(order =>
          order.order_id === orderId
            ? { ...order, status }
            : order
        )
      );

      alert(data.message);
    } catch (err) {
      alert(err.message);
    }
  };

  const statusColors = {
    Pending: '#f59e0b',
    Confirmed: '#2563eb',
    Preparing: '#8b5cf6',
    'Out for Delivery': '#0891b2',
    Delivered: '#16a34a',
    Cancelled: '#dc2626'
  };
const summary = [
  {
    label: 'Total Orders',
    value: orders.length,
    color: '#2563eb',
    icon: '📦'
  },
  {
    label: 'Pending',
    value: orders.filter(o => o.status === 'Pending').length,
    color: '#d97706',
    icon: '⏳'
  },
  {
    label: 'Confirmed',
    value: orders.filter(o => o.status === 'Confirmed').length,
    color: '#2563eb',
    icon: '✔️'
  },
  {
    label: 'Delivered',
    value: orders.filter(o => o.status === 'Delivered').length,
    color: '#16a34a',
    icon: '✅'
  },
  {
    label: 'Cancelled',
    value: orders.filter(o => o.status === 'Cancelled').length,
    color: '#dc2626',
    icon: '❌'
  }
];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f4f6f9',
      padding: '30px'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '15px'
      }}>
        <div>
          <h1 style={{ margin: 0, color: '#222' }}>
            Order Management
          </h1>
          <p style={{ color: '#777' }}>
            Manage customer orders and track delivery status.
          </p>
        </div>

        <button
          onClick={() => {
            setLoading(true);
            fetchOrders();
          }}
          style={{
            padding: '12px 20px',
            background: '#e65c00',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          🔄 Refresh Orders
        </button>
      </div>

      {!loading && !error && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '18px',
          marginTop: '25px'
        }}>
          {summary.map(item => (
            <div key={item.label} style={{
              background: 'white',
              padding: '22px',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              borderLeft: `5px solid ${item.color}`
            }}>
              <p style={{ margin: 0, color: '#777' }}>
                {item.icon} {item.label}
              </p>
              <h2 style={{
                margin: '12px 0 0',
                fontSize: '30px',
                color: item.color
              }}>
                {item.value}
              </h2>
            </div>
          ))}
        </div>
      )}

      {loading ? (
        <p style={{ marginTop: '30px' }}>Loading orders...</p>
      ) : error ? (
        <p style={{ color: 'red', marginTop: '30px' }}>{error}</p>
      ) : orders.length === 0 ? (
        <div style={{
          background: 'white',
          padding: '40px',
          textAlign: 'center',
          borderRadius: '12px',
          marginTop: '25px'
        }}>
          <h2>No orders found</h2>
          <p style={{ color: '#777' }}>
            Customer orders will appear here.
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '22px',
          marginTop: '25px'
        }}>
          {orders.map(order => (
            <div key={order.order_id} style={{
              background: 'white',
              padding: '22px',
              borderRadius: '14px',
              boxShadow: '0 3px 12px rgba(0,0,0,0.07)',
              borderTop: `4px solid ${statusColors[order.status] || '#999'}`
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '10px',
                flexWrap: 'wrap'
              }}>
                <h2 style={{ margin: 0, color: '#222' }}>
                  Order #{order.order_id}
                </h2>

                <span style={{
                  background: `${statusColors[order.status] || '#999'}18`,
                  color: statusColors[order.status] || '#999',
                  padding: '7px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  {order.status}
                </span>
              </div>

              <hr style={{ border: 0, borderTop: '1px solid #eee', margin: '18px 0' }} />

              <h3 style={{ color: '#e65c00', fontSize: '16px' }}>
                Customer Details
              </h3>

              <p><strong>Name:</strong> {order.customer_name || 'Not available'}</p>
              <p><strong>Email:</strong> {order.customer_email || 'Not available'}</p>
              <p><strong>Phone:</strong> {order.phone_number || 'Not provided'}</p>
              <p><strong>Address:</strong> {order.delivery_address || 'Not provided'}</p>
              <p><strong>Payment:</strong> {order.payment_method || 'Not available'}</p>

              <hr style={{ border: 0, borderTop: '1px solid #eee', margin: '18px 0' }} />

              <h3 style={{ color: '#e65c00', fontSize: '16px' }}>
                🍽️ Ordered Items
              </h3>

              {order.items.map((item, index) => (
                <div key={index} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '10px',
                  padding: '9px 0',
                  borderBottom: '1px solid #f1f1f1'
                }}>
                  <span>
                    {item.item_name} × {item.quantity}
                  </span>
                  <strong>
                    ₹{(
                      Number(item.price) * Number(item.quantity)
                    ).toFixed(2)}
                  </strong>
                </div>
              ))}

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '18px',
                fontSize: '18px',
                fontWeight: 'bold'
              }}>
                <span>Total Amount</span>
                <span style={{ color: '#e65c00' }}>
                  ₹{Number(order.total_amount).toFixed(2)}
                </span>
              </div>

              <hr style={{ border: 0, borderTop: '1px solid #eee', margin: '18px 0' }} />

              <label style={{
                display: 'block',
                fontWeight: 'bold',
                marginBottom: '9px'
              }}>
                Update Order Status
              </label>

              <select
                value={order.status}
                onChange={e =>
                  updateStatus(order.order_id, e.target.value)
                }
                style={{
                  padding: '12px',
                  width: '100%',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  background: '#fff',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Preparing">Preparing</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>

              <p style={{
                color: '#888',
                fontSize: '13px',
                marginTop: '15px',
                marginBottom: 0
              }}>
                📅 Order Date:{' '}
                {order.created_at
                  ? new Date(order.created_at).toLocaleString()
                  : 'Not available'}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminOrders;
