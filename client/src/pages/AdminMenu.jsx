
import { useEffect, useState } from 'react';

function AdminMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: ''
  });

  const [editingId, setEditingId] = useState(null);
  const token = localStorage.getItem('token');

  const inputStyle = {
    width: '100%',
    padding: '13px 15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '15px',
    boxSizing: 'border-box',
    outline: 'none',
    background: '#fff'
  };

  const primaryButton = {
    padding: '12px 22px',
    background: '#e65c00',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '14px'
  };

  const fetchMenu = async () => {
    try {
      const response = await fetch(
        'http://localhost:5000/api/admin/menu',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to load menu');
      }

      setMenuItems(data);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setForm({
      name: '',
      description: '',
      price: '',
      image: '',
      category: ''
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        editingId
          ? `http://localhost:5000/api/admin/menu/${editingId}`
          : 'http://localhost:5000/api/admin/menu',
        {
          method: editingId ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            ...form,
            price: Number(form.price),
            available: true
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Operation failed');
      }

      alert(data.message);
      resetForm();
      fetchMenu();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);

    setForm({
      name: item.name || '',
      description: item.description || '',
      price: item.price || '',
      image: item.image || '',
      category: item.category || ''
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to remove this food item?')) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/menu/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to remove item');
      }

      alert(data.message);
      fetchMenu();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f4f6f9',
      padding: '35px'
    }}>

      <h1 style={{
        color: '#222',
        fontSize: '32px',
        marginBottom: '8px'
      }}>
        Admin Menu Management
      </h1>

      <p style={{ color: '#666', marginBottom: '30px' }}>
        Add, edit and manage your restaurant food items.
      </p>

      <form
        onSubmit={handleSubmit}
        style={{
          background: 'white',
          padding: '30px',
          borderRadius: '15px',
          marginBottom: '35px',
          boxShadow: '0 3px 12px rgba(0,0,0,0.06)',
          maxWidth: '850px'
        }}
      >
        <h2 style={{
          marginTop: 0,
          marginBottom: '25px',
          color: '#333'
        }}>
          {editingId ? '✏️ Edit Food Item' : '🍔 Add New Food Item'}
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
          gap: '20px'
        }}>

          <div>
            <label>Food Name</label>
            <input
              style={inputStyle}
              name="name"
              placeholder="Enter food name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Price (₹)</label>
            <input
              style={inputStyle}
              name="price"
              type="number"
              placeholder="Enter price"
              min="0.01"
              step="0.01"
              value={form.price}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Category</label>
            <input
              style={inputStyle}
              name="category"
              placeholder="Example: Burger"
              value={form.category}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Image URL</label>
            <input
              style={inputStyle}
              name="image"
              placeholder="Paste image URL"
              value={form.image}
              onChange={handleChange}
            />
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <label>Food Description</label>
            <textarea
              style={{
                ...inputStyle,
                minHeight: '100px',
                resize: 'vertical'
              }}
              name="description"
              placeholder="Enter food description"
              value={form.description}
              onChange={handleChange}
            />
          </div>

        </div>

        <div style={{
          display: 'flex',
          gap: '12px',
          marginTop: '25px',
          flexWrap: 'wrap'
        }}>
          <button type="submit" style={primaryButton}>
            {editingId ? 'Update Food Item' : '+ Add Food Item'}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              style={{
                ...primaryButton,
                background: '#777'
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <h2 style={{
        color: '#222',
        marginBottom: '20px'
      }}>
        Existing Food Items ({menuItems.length})
      </h2>

      {loading ? (
        <p>Loading menu...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : menuItems.length === 0 ? (
        <p>No food items found.</p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '22px'
        }}>
          {menuItems.map((item) => (
            <div
              key={item.id}
              style={{
                background: 'white',
                borderRadius: '14px',
                overflow: 'hidden',
                boxShadow: '0 3px 12px rgba(0,0,0,0.07)'
              }}
            >

              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: '100%',
                    height: '180px',
                    objectFit: 'cover'
                  }}
                />
              )}

              <div style={{ padding: '20px' }}>

                <h3 style={{
                  marginTop: 0,
                  color: '#222',
                  fontSize: '20px'
                }}>
                  {item.name}
                </h3>

                <p style={{
                  color: '#666',
                  minHeight: '40px'
                }}>
                  {item.description}
                </p>

                <h3 style={{
                  color: '#e65c00',
                  fontSize: '22px'
                }}>
                  ₹{Number(item.price).toFixed(2)}
                </h3>

                <p>
                  <strong>Category:</strong> {item.category || 'Uncategorized'}
                </p>

                <span style={{
                  display: 'inline-block',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  background: item.available ? '#e5f7eb' : '#ffe8e8',
                  color: item.available ? '#188344' : '#c62828'
                }}>
                  {item.available ? 'Available' : 'Removed'}
                </span>

                <div style={{
                  display: 'flex',
                  gap: '10px',
                  marginTop: '20px'
                }}>
                  <button
                    onClick={() => handleEdit(item)}
                    style={{
                      ...primaryButton,
                      flex: 1,
                      background: '#2878c8'
                    }}
                  >
                    ✏️ Edit
                  </button>

                  {item.available && (
                    <button
                      onClick={() => handleDelete(item.id)}
                      style={{
                        ...primaryButton,
                        flex: 1,
                        background: '#dc3545'
                      }}
                    >
                      🗑 Remove
                    </button>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminMenu;
