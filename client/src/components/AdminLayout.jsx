
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import BrandLogo from '../components/BrandLogo';

function AdminLayout() {
  const navigate = useNavigate();

  const linkStyle = ({ isActive }) => ({
    display: 'block',
    padding: '14px 18px',
    marginBottom: '10px',
    borderRadius: '8px',
    textDecoration: 'none',
    color: 'white',
    background: isActive ? '#e65c00' : 'transparent',
    fontWeight: isActive ? 'bold' : 'normal'
  });

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
      <div style={{
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: '25px',
  gap: '6px'
}}>
  <BrandLogo size={45} />
  <span style={{ fontSize: '16px', color: 'white' }}>Admin</span>
</div>

        <nav className="admin-navigation">
          <NavLink to="/admin" end style={linkStyle}>
            🏠 Dashboard
          </NavLink>

          <NavLink to="/admin/menu" style={linkStyle}>
            🍔 Menu Management
          </NavLink>

          <NavLink to="/admin/orders" style={linkStyle}>
            📦 Order Management
          </NavLink>

          <NavLink to="/admin/users" style={linkStyle}>
            👥 User Management
          </NavLink>
        </nav>

        <button
          onClick={() => navigate('/')}
          className="admin-back-button"
        >
          🏠 Back to Website
        </button>
      </aside>

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
