import BrandLogo from './BrandLogo';
function Footer() {
  return (
    <footer style={{
      background: '#222',
      color: 'white',
      textAlign: 'center',
      padding: '25px 15px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
  <BrandLogo size={45} />
</div>

      <p>Fresh Food. Happy Moments.</p>

      <p>Fresh Food | Fast Delivery | Best Quality</p>

      <p style={{
        fontSize: '13px',
        color: '#aaa',
        marginTop: '18px'
      }}>
        © 2026 Savoria. All Rights Reserved.
      </p>
    </footer>
  );
}

export default Footer;
