import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalMenuItems: 0,
    totalRevenue: 0
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await fetch(
          'http://localhost:5000/api/admin/dashboard',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to load dashboard');
        }

        setStats(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    { title: 'Total Customers', value: stats.totalUsers, icon: '👥' },
    { title: 'Total Orders', value: stats.totalOrders, icon: '📦' },
    { title: 'Menu Items', value: stats.totalMenuItems, icon: '🍔' },
    {
      title: 'Total Revenue',
      value: `₹${Number(stats.totalRevenue).toFixed(2)}`,
      icon: '💰'
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      padding: '30px',
      background: '#f4f6f9'
    }}>
      <h1 style={{ color: '#222' }}>Admin Dashboard</h1>
      <p>Welcome to the Restaurant Admin Panel</p>
      

      {loading ? (
        <p>Loading dashboard...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
          marginTop: '30px'
        }}>
          {cards.map((card) => (
            <div
              key={card.title}
              style={{
                background: 'white',
                padding: '25px',
                borderRadius: '12px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
              }}
            >
              <h2>{card.icon} {card.title}</h2>
              <h1 style={{ color: '#e65c00' }}>{card.value}</h1>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;