
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const popularFoods = [
    {
      name: 'Chicken Burger',
      description: 'Juicy chicken patty with fresh vegetables and sauce.',
      price: 149,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600'
    },
    {
      name: 'Veg Pizza',
      description: 'Delicious cheesy pizza topped with fresh vegetables.',
      price: 199,
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600'
    },
    {
      name: 'French Fries',
      description: 'Crispy golden fries, freshly prepared and delicious.',
      price: 99,
      image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600'
    }
  ];

  return (
    <div className="home-page">
      <style>{`
        .home-page {
          color: #252525;
          background: #fff;
          overflow: hidden;
        }

        .hero-section {
          min-height: 490px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
          padding: 65px 8%;
          background: linear-gradient(120deg, #fff5eb, #ffead8);
          flex-wrap: wrap;
        }

        .hero-content {
          flex: 1;
          min-width: 280px;
        }

        .hero-label {
          display: inline-block;
          background: #ffe0c2;
          color: #d65e08;
          padding: 9px 16px;
          border-radius: 25px;
          font-weight: bold;
          font-size: 14px;
          margin-bottom: 15px;
        }

        .hero-content h1 {
          font-size: clamp(38px, 5vw, 58px);
          line-height: 1.18;
          margin: 0 0 20px;
        }

        .hero-content h1 span {
          color: #e87919;
        }

        .hero-content p {
          color: #666;
          font-size: 18px;
          line-height: 1.8;
          max-width: 500px;
        }

        .hero-image {
          flex: 1;
          min-width: 280px;
          max-width: 520px;
          width: 100%;
          height: 350px;
          object-fit: cover;
          border-radius: 24px;
          box-shadow: 0 15px 35px rgba(0,0,0,0.15);
        }

        .home-btn {
          background: #e87919;
          color: white;
          border: none;
          padding: 15px 28px;
          border-radius: 10px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          margin-top: 18px;
          transition: 0.3s ease;
        }

        .home-btn:hover {
          background: #c65e0c;
          transform: translateY(-3px);
          box-shadow: 0 7px 16px rgba(232,121,25,0.25);
        }

        .features-section {
          padding: 70px 7%;
          text-align: center;
        }

        .section-title {
          font-size: 36px;
          margin: 0 0 12px;
        }

        .section-subtitle {
          color: #777;
          margin-bottom: 40px;
          font-size: 17px;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 25px;
          max-width: 1100px;
          margin: auto;
        }

        .feature-card {
          background: white;
          padding: 35px 22px;
          border-radius: 17px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.07);
          transition: 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-7px);
          box-shadow: 0 12px 25px rgba(0,0,0,0.11);
        }

        .feature-icon {
          font-size: 45px;
          margin-bottom: 14px;
        }

        .feature-card h3 {
          margin-bottom: 12px;
          color: #252525;
          font-size: 20px;
        }

        .feature-card p {
          color: #777;
          line-height: 1.7;
        }

        .popular-section {
          background: #f8f8f8;
          padding: 70px 7%;
          text-align: center;
        }

        .popular-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 28px;
          max-width: 1050px;
          margin: 40px auto;
        }

        .popular-card {
          background: white;
          border-radius: 17px;
          overflow: hidden;
          box-shadow: 0 5px 18px rgba(0,0,0,0.07);
          text-align: left;
          transition: 0.3s ease;
        }

        .popular-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 14px 28px rgba(0,0,0,0.13);
        }

        .popular-card img {
          width: 100%;
          height: 210px;
          object-fit: cover;
          display: block;
        }

        .popular-card-content {
          padding: 20px;
        }

        .popular-card h3 {
          margin: 0 0 10px;
          font-size: 21px;
        }

        .popular-card p {
          color: #777;
          line-height: 1.6;
          min-height: 50px;
          margin: 0 0 15px;
        }

        .popular-price {
          color: #e65c00;
          font-size: 22px;
          font-weight: bold;
        }

        .popular-tag {
          display: inline-block;
          background: #fff0e5;
          color: #d65e08;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: bold;
          margin-bottom: 12px;
        }

        .cta-section {
          padding: 75px 20px;
          text-align: center;
          background: linear-gradient(120deg, #fff5eb, #ffead8);
        }

        .cta-section h2 {
          font-size: 32px;
          margin-bottom: 12px;
        }

        .cta-section p {
          color: #777;
          font-size: 17px;
        }

        @media (max-width: 650px) {
          .hero-section {
            padding: 40px 6%;
            gap: 25px;
          }

          .hero-content h1 {
            font-size: 38px;
          }

          .hero-image {
            height: 250px;
          }

          .features-section,
          .popular-section {
            padding: 50px 6%;
          }

          .section-title {
            font-size: 29px;
          }

          .popular-card img {
            height: 200px;
          }

          .cta-section h2 {
            font-size: 26px;
          }
        }
      `}</style>

      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-label">🍽️ Fresh Food, Happy Moments</span>

          <h1>
            Delicious Food,
            <br />
            Delivered <span>Fresh!</span>
          </h1>

          <p>
  Welcome to our restaurant! Enjoy delicious meals,
  fresh ingredients and amazing flavours delivered
  straight to your doorstep.
</p>

          <button
            className="home-btn"
            onClick={() => navigate('/menu')}
          >
            Explore Our Menu →
          </button>
        </div>

        <img
          className="hero-image"
          src="https://images.unsplash.com/photo-1547592180-85f173990554?w=900"
          alt="Delicious restaurant food"
        />
      </section>

      <section className="features-section">
        <h2 className="section-title">Why Choose Us?</h2>

        <p className="section-subtitle">
          Great food and great service, every time.
        </p>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🍔</div>
            <h3>Fresh Food</h3>
            <p>
              Delicious meals prepared with fresh ingredients.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3>Fast Delivery</h3>
            <p>
              Get your favourite food delivered to your doorstep.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⭐</div>
            <h3>Best Quality</h3>
            <p>
              Enjoy great taste and quality in every bite.
            </p>
          </div>
        </div>
      </section>

      <section className="popular-section">
        <h2 className="section-title">Popular Food</h2>

        <p className="section-subtitle">
          Discover some of our delicious favourites.
        </p>

        <div className="popular-grid">
          {popularFoods.map(food => (
            <div className="popular-card" key={food.name}>
              <img src={food.image} alt={food.name} />

              <div className="popular-card-content">
                <span className="popular-tag">⭐ Customer Favourite</span>
                <h3>{food.name}</h3>
                <p>{food.description}</p>
                <div className="popular-price">
                  ₹{food.price}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          className="home-btn"
          onClick={() => navigate('/menu')}
        >
          Order Now →
        </button>
      </section>

      <section className="cta-section">
        <h2>Ready to Enjoy Delicious Food?</h2>
        <p>Your favourite meals are just a few clicks away.</p>

        <button
          className="home-btn"
          onClick={() => navigate('/menu')}
        >
          Start Ordering
        </button>
      </section>
    </div>
  );
}

export default Home;
