import React from 'react';

export const AdminSidebar = ({ activePanel, setActivePanel }) => {
  return (
    <aside className="admin-sidebar" id="admin-sidebar">
      <div className="admin-sidebar__header">
        <h3>🛠️ Admin</h3>
        <p>Dashboard</p>
      </div>
      <nav className="admin-nav">
        <button 
          className={`admin-nav__item ${activePanel === 'overview' ? 'active' : ''}`} 
          onClick={() => setActivePanel('overview')}
        >
          <span>📊</span> Overview
        </button>
        <button 
          className={`admin-nav__item ${activePanel === 'products' ? 'active' : ''}`} 
          onClick={() => setActivePanel('products')}
        >
          <span>📦</span> Products
        </button>
        <button 
          className={`admin-nav__item ${activePanel === 'orders' ? 'active' : ''}`} 
          onClick={() => setActivePanel('orders')}
        >
          <span>🧾</span> Orders
        </button>
        <button 
          className={`admin-nav__item ${activePanel === 'customers' ? 'active' : ''}`} 
          onClick={() => setActivePanel('customers')}
        >
          <span>👥</span> Customers
        </button>
        <button 
          className={`admin-nav__item ${activePanel === 'settings' ? 'active' : ''}`} 
          onClick={() => setActivePanel('settings')}
        >
          <span>⚙️</span> Settings
        </button>
      </nav>
    </aside>
  );
};
