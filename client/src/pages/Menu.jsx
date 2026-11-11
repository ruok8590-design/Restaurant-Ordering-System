
import { useEffect, useState } from 'react';

function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetch('http://localhost:5000/api/menu')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch menu');
        }
        return response.json();
      })
      .then(data => {
        setMenuItems(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const getFoodImage = (item) => {
    const name = item.name.toLowerCase();

    if (name.includes('burger')) {
      return 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600';
    }
    if (name.includes('pizza')) {
      return 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600';
    }
    if (name.includes('fries')) {
      return 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600';
    }
    if (name.includes('biryani')) {
      return 'https://media-assets.swiggy.com/swiggy/image/upload/f_auto%2Cq_auto%2Cfl_lossy/RX_THUMBNAIL/IMAGES/VENDOR/2026/1/18/0e36e3ef-b309-4e00-a9bd-82112656f36d_1309977.jpg';
    }
    if (name.includes('sandwich')) {
      return 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600';
    }
    if (name.includes('coffee')) {
      return 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600';
    }
    if (name.includes('milkshake')) {
      return 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600';
    }
    if (name.includes('garlic bread')) {
      return 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy%2Cf_auto%2Cq_auto%2Cw_300%2Ch_300%2Cc_fit/FOOD_CATALOG/IMAGES/CMS/2025/12/25/4a6f5ea9-2216-4ab4-a988-46f2868ffd5a_0bb55d63-f883-4a89-8526-0639b90ed6ac.jpg';
    }

    return 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600';
  };

  const addToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingItem = cart.find(
      cartItem => cartItem.id === item.id
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(item.name + ' added to cart!');
  };

  const categories = [
    'All',
    ...new Set(
      menuItems
        .map(item => item.category)
        .filter(Boolean)
    )
  ];

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' ||
      item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return <h2 style={{ textAlign: 'center', padding: '50px' }}>Loading menu...</h2>;
  }

  if (error) {
    return <h2 style={{ textAlign: 'center', padding: '50px', color: 'red' }}>{error}</h2>;
  }

  return (
    <div className="menu-page">
      <style>{`
        .menu-page {
          padding: 45px 6%;
          background: #f8f8f8;
          min-height: 70vh;
        }

        .menu-heading {
          text-align: center;
          margin-bottom: 35px;
        }

        .menu-label {
          display: inline-block;
          background: #fff0e5;
          color: #e87919;
          padding: 8px 16px;
          border-radius: 25px;
          font-weight: bold;
          font-size: 13px;
          margin-bottom: 12px;
        }

        .menu-heading h1 {
          font-size: 38px;
          color: #252525;
          margin: 0 0 12px;
        }

        .menu-heading p {
          color: #777;
          font-size: 17px;
        }

        .menu-tools {
          max-width: 1100px;
          margin: 0 auto 35px;
        }

        .search-box {
          width: 100%;
          max-width: 550px;
          display: block;
          margin: 0 auto 25px;
          padding: 15px 20px;
          border: 1px solid #ddd;
          border-radius: 12px;
          font-size: 15px;
          box-sizing: border-box;
          outline: none;
          background: white;
        }

        .search-box:focus {
          border-color: #e87919;
          box-shadow: 0 0 0 3px rgba(232,121,25,0.12);
        }

        .category-list {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .category-btn {
          border: 1px solid #eee;
          background: white;
          color: #555;
          padding: 10px 19px;
          border-radius: 25px;
          cursor: pointer;
          font-size: 14px;
          font-weight: bold;
          transition: 0.25s;
        }

        .category-btn:hover,
        .category-btn.active {
          background: #e87919;
          color: white;
          border-color: #e87919;
        }

        .menu-count {
          max-width: 1100px;
          margin: 0 auto 20px;
          color: #777;
          font-size: 14px;
        }

        .menu-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 27px;
          max-width: 1100px;
          margin: auto;
        }

        .food-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0,0,0,0.07);
          transition: 0.3s ease;
        }

        .food-card:hover {
          transform: translateY(-7px);
          box-shadow: 0 12px 25px rgba(0,0,0,0.13);
        }

        .food-image {
          width: 100%;
          height: 205px;
          object-fit: cover;
          display: block;
        }

        .food-details {
          padding: 20px;
        }

        .food-details h2 {
          font-size: 21px;
          color: #252525;
          margin: 0 0 10px;
        }

        .food-description {
          color: #777;
          min-height: 45px;
          line-height: 1.6;
          font-size: 14px;
        }

        .food-category {
          display: inline-block;
          background: #fff0e5;
          color: #e87919;
          font-size: 12px;
          font-weight: bold;
          padding: 6px 12px;
          border-radius: 20px;
          margin: 8px 0;
        }

        .food-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          margin-top: 15px;
        }

        .food-price {
          font-size: 21px;
          font-weight: bold;
          color: #252525;
          white-space: nowrap;
        }

        .add-cart-btn {
          background: #e87919;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 11px 14px;
          cursor: pointer;
          font-weight: bold;
          transition: 0.25s;
        }

        .add-cart-btn:hover {
          background: #c65e0c;
          transform: scale(1.04);
        }

        .empty-menu {
          text-align: center;
          color: #777;
          font-size: 18px;
          padding: 40px 10px;
        }

        @media (max-width: 600px) {
          .menu-page {
            padding: 35px 5%;
          }

          .menu-heading h1 {
            font-size: 30px;
          }

          .menu-grid {
            grid-template-columns: 1fr;
          }

          .food-image {
            height: 220px;
          }
        }
      `}</style>

      <div className="menu-heading">
        <span className="menu-label">🍽️ FRESHLY PREPARED</span>
        <h1>Our Delicious Menu</h1>
        <p>Fresh Food • Great Taste • Fast Delivery</p>
      </div>

      <div className="menu-tools">
        <input
          className="search-box"
          type="text"
          placeholder="🔍 Search your favourite food..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <div className="category-list">
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <p className="menu-count">
        Showing {filteredItems.length} food items
      </p>

      {filteredItems.length === 0 ? (
        <p className="empty-menu">
          No food items found. Try another search or category.
        </p>
      ) : (
        <div className="menu-grid">
          {filteredItems.map(item => (
            <div className="food-card" key={item.id}>
              <img
                className="food-image"
                src={getFoodImage(item)}
                alt={item.name}
              />

              <div className="food-details">
                <h2>{item.name}</h2>

                <p className="food-description">
                  {item.description}
                </p>

                <span className="food-category">
                  {item.category || 'Other'}
                </span>

                <div className="food-bottom">
                  <span className="food-price">
                    ₹{Number(item.price).toFixed(2)}
                  </span>

                  <button
                    className="add-cart-btn"
                    onClick={() => addToCart(item)}
                  >
                    + Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Menu;
