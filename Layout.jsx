import React from 'react';

const Layout = () => {
  return (
    <div>
      <header style={{ backgroundColor: '#f8f9fa', padding: '10px' }}>
        <h1>Logo</h1>
        <nav>
          <button>Men</button>
          <button>Women</button>
          <button>Kids</button>
        </nav>
      </header>

      <main style={{ padding: '20px' }}>
        <h2>Hello World</h2>
        <p>This is the home page</p>
      </main>

      <footer style={{ backgroundColor: '#f8f9fa', padding: '10px', marginTop: '20px' }}>
        Footer
      </footer>
    </div>
  );
};

export default Layout;
