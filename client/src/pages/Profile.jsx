import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user')) || {};
    } catch {
      return {};
    }
  });

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const isAdmin = user.role === 'admin';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    alert('Logged out successfully!');
    navigate('/login');
  };

  const handleSave = async (e) => {
    e.preventDefault();

    setMessage('');
    setError('');

    if (!name.trim() || !email.trim()) {
      setError('Please enter your name and email.');
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:5000/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim()
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Profile update failed');
      }

      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));

      setName(data.user.name);
      setEmail(data.user.email);

      setEditing(false);
      setMessage('Profile updated successfully!');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setName(user.name || '');
    setEmail(user.email || '');
    setEditing(false);
    setError('');
    setMessage('');
  };

  return (
    <div className="profile-page">
      <style>{`
        .profile-page {
          background: #f8f8f8;
          min-height: 70vh;
          padding: 45px 5%;
        }

        .profile-title {
          text-align: center;
          color: #252525;
          font-size: 34px;
          margin-bottom: 30px;
        }

        .profile-card {
          max-width: 550px;
          margin: auto;
          background: white;
          padding: 35px;
          border-radius: 16px;
          box-shadow: 0 4px 18px rgba(0,0,0,0.08);
          text-align: center;
        }

        .profile-avatar {
          width: 100px;
          height: 100px;
          background: #e87919;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 42px;
          font-weight: bold;
          margin: 0 auto 20px;
        }

        .profile-name {
          color: #252525;
          font-size: 25px;
          margin-bottom: 8px;
        }

        .profile-email {
          color: #777;
          margin-bottom: 28px;
        }

        .profile-role {
          display: inline-block;
          background: #fff0df;
          color: #c45c0a;
          padding: 7px 16px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: bold;
          margin-bottom: 20px;
        }

        .profile-info {
          text-align: left;
          background: #fafafa;
          padding: 18px;
          border-radius: 10px;
          margin-bottom: 25px;
        }

        .profile-info p {
          margin: 12px 0;
          color: #555;
          overflow-wrap: anywhere;
        }

        .profile-info strong {
          color: #252525;
        }

        .profile-buttons {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 12px;
        }

        .profile-buttons button {
          padding: 12px 20px;
          border: none;
          border-radius: 7px;
          font-weight: bold;
          cursor: pointer;
        }

        .main-btn {
          background: #e87919;
          color: white;
        }

        .logout-btn {
          background: #fff0f0;
          color: #d32f2f;
        }

        .cancel-btn {
          background: #eeeeee;
          color: #333;
        }

        .profile-buttons button:hover {
          opacity: 0.85;
        }

        .edit-form {
          text-align: left;
          margin-bottom: 25px;
        }

        .edit-form label {
          display: block;
          margin: 15px 0 7px;
          color: #333;
          font-weight: bold;
        }

        .edit-form input {
          width: 100%;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 7px;
          font-size: 15px;
          box-sizing: border-box;
        }

        .profile-message {
          color: green;
          margin-bottom: 15px;
        }

        .profile-error {
          color: #d32f2f;
          margin-bottom: 15px;
        }

        @media (max-width: 500px) {
          .profile-card {
            padding: 25px 18px;
          }

          .profile-title {
            font-size: 28px;
          }
        }
      `}</style>

      <h1 className="profile-title">My Profile</h1>

      <div className="profile-card">
        <div className="profile-avatar">
          {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
        </div>

        <h2 className="profile-name">
          {user.name || 'User'}
        </h2>

        <p className="profile-email">
          {user.email || 'No email available'}
        </p>

        <div className="profile-role">
          {isAdmin ? 'ADMIN ACCOUNT' : 'CUSTOMER ACCOUNT'}
        </div>

        {message && <p className="profile-message">{message}</p>}
        {error && <p className="profile-error">{error}</p>}

        {editing ? (
          <form className="edit-form" onSubmit={handleSave}>
            <label>Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="profile-buttons">
              <button
                type="submit"
                className="main-btn"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>

              <button
                type="button"
                className="cancel-btn"
                onClick={handleCancel}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="profile-info">
              <p>
                <strong>Full Name:</strong> {user.name || 'Not available'}
              </p>

              <p>
                <strong>Email Address:</strong> {user.email || 'Not available'}
              </p>

              <p>
                <strong>Account ID:</strong> {user.id || 'Not available'}
              </p>

              <p>
                <strong>Account Status:</strong> Active
              </p>
            </div>

            <div className="profile-buttons">
              {isAdmin ? (
                <button
                  className="main-btn"
                  onClick={() => navigate('/admin')}
                >
                  Admin Dashboard
                </button>
              ) : (
                <>
                  <button
                    className="main-btn"
                    onClick={() => {
                      setEditing(true);
                      setMessage('');
                      setError('');
                    }}
                  >
                    Edit Profile
                  </button>

                  <button
                    className="main-btn"
                    onClick={() => navigate('/orders')}
                  >
                    My Orders
                  </button>
                </>
              )}

              <button
                className="logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;