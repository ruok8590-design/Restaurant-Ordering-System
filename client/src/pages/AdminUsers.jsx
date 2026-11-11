
import { useEffect, useState } from 'react';

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await fetch(
          'http://localhost:5000/api/admin/users',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to load customers');
        }

        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const cardStyle = {
    background: 'white',
    padding: '22px',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f4f6f9',
      padding: '30px',
      boxSizing: 'border-box'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '15px',
        marginBottom: '28px'
      }}>
        <div>
          <h1 style={{
            margin: '0 0 8px',
            color: '#222',
            fontSize: '28px'
          }}>
            User Management
          </h1>

          <p style={{ margin: 0, color: '#777' }}>
            View and manage registered restaurant customers.
          </p>
        </div>

        <div style={{
          background: '#fff0e6',
          color: '#e65c00',
          padding: '12px 18px',
          borderRadius: '9px',
          fontWeight: 'bold'
        }}>
          👥 {users.length} Customers
        </div>
      </div>

      <div style={{
        ...cardStyle,
        display: 'flex',
        alignItems: 'center',
        gap: '18px',
        marginBottom: '25px',
        maxWidth: '300px'
      }}>
        <div style={{
          width: '55px',
          height: '55px',
          borderRadius: '12px',
          background: '#fff0e6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '27px'
        }}>
          👥
        </div>

        <div>
          <p style={{
            margin: '0 0 5px',
            color: '#777',
            fontSize: '14px'
          }}>
            Total Customers
          </p>

          <h2 style={{
            margin: 0,
            color: '#222',
            fontSize: '26px'
          }}>
            {users.length}
          </h2>
        </div>
      </div>

      <div style={{
        ...cardStyle,
        padding: '0',
        overflow: 'hidden'
      }}>
        <div style={{
          padding: '20px 22px',
          borderBottom: '1px solid #eee'
        }}>
          <h2 style={{
            margin: 0,
            fontSize: '19px',
            color: '#222'
          }}>
            Registered Customers
          </h2>
        </div>

        {loading ? (
          <p style={{ padding: '25px', color: '#777' }}>
            Loading customers...
          </p>
        ) : error ? (
          <p style={{ padding: '25px', color: '#dc2626' }}>
            {error}
          </p>
        ) : users.length === 0 ? (
          <p style={{ padding: '25px', color: '#777' }}>
            No customers registered yet.
          </p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              textAlign: 'left',
              minWidth: '0',
tableLayout: 'fixed'
            }}>
              <thead>
                <tr style={{
                  background: '#f8f9fb',
                  color: '#555'
                }}>
                  {['ID', 'Customer Name', 'Email', 'Registration Date'].map(
                    heading => (
                      <th key={heading} style={{
                        padding: '16px',
                        fontSize: '13px',
                        fontWeight: 'bold',
                        whiteSpace: 'nowrap'
                      }}>
                        {heading}
                      </th>
                    )
                  )}
                </tr>
              </thead>

              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td style={{
                      padding: '16px',
                      borderTop: '1px solid #eee',
                      color: '#777'
                    }}>
                      #{user.id}
                    </td>

                    <td style={{
                      padding: '16px',
                      borderTop: '1px solid #eee'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                      }}>
                        <div style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '50%',
                          background: '#fff0e6',
                          color: '#e65c00',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 'bold'
                        }}>
                          {user.name?.charAt(0).toUpperCase() || '?'}
                        </div>

                        <strong style={{ color: '#333' }}>
                          {user.name}
                        </strong>
                      </div>
                    </td>
                    <td style={{
  padding: '10px',
  borderTop: '1px solid #eee',
  color: '#666',
  overflowWrap: 'anywhere'
}}>
  {user.email}
</td>

                    

                    <td style={{
                      padding: '16px',
                      borderTop: '1px solid #eee',
                      color: '#666',
                      whiteSpace: 'nowrap'
                    }}>
                      {user.created_at
                        ? new Date(user.created_at).toLocaleDateString()
                        : 'Not available'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminUsers;
