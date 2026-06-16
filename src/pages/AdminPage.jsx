import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { AdminLoginGate } from '../components/admin/AdminLoginGate';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminOverview } from '../components/admin/AdminOverview';
import { useProducts } from '../hooks/useProducts';

// Placeholder components for the other panels
const AdminProducts = ({ products }) => (
  <div className="admin-panel active">
    <div className="admin-content__header">
      <h1>Manage <span className="text-gradient">Products</span></h1>
      <button className="btn btn-primary btn-sm">+ Add Product</button>
    </div>
    <div className="admin-table-wrapper">
      <div className="admin-table-header">
        <h3>All Products ({products.length})</h3>
        <input type="text" className="form-input" placeholder="Search products..." style={{ maxWidth: '250px', padding: 'var(--space-2) var(--space-4)', fontSize: 'var(--fs-small)' }} />
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Material</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>
                <div className="admin-table__product">
                  <div className="admin-table__product-img"><img src={p.image} alt={p.name} /></div>
                  <span style={{ fontWeight: 'var(--fw-medium)', color: 'var(--clr-text-primary)' }}>{p.name}</span>
                </div>
              </td>
              <td><span className="badge badge-brand">{p.category}</span></td>
              <td>{p.material}</td>
              <td style={{ fontWeight: 'var(--fw-semibold)' }}>₹{p.price.toLocaleString('en-IN')}</td>
              <td><span className="stars" style={{ fontSize: 'var(--fs-xs)' }}>★</span> {p.rating}</td>
              <td><span className="status-badge status-badge--active">{p.inStock ? '● In Stock' : '○ Out of Stock'}</span></td>
              <td className="admin-table__actions">
                <button title="Edit">✏️</button>
                <button className="delete" title="Delete">🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const AdminOrders = () => (
  <div className="admin-panel active">
    <div className="admin-content__header">
      <h1>Manage <span className="text-gradient">Orders</span></h1>
      <select className="sort-select" style={{ minWidth: '160px' }}>
        <option>All Orders</option>
        <option>Active</option>
        <option>Printing</option>
        <option>Shipped</option>
        <option>Delivered</option>
      </select>
    </div>
    <div className="admin-table-wrapper">
      <table className="admin-table">
        <thead><tr><th>Order ID</th><th>Customer</th><th>Email</th><th>Items</th><th>Total</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
        <tbody>
          <tr><td colSpan="8" style={{ textAlign: 'center', padding: 'var(--space-6)', color: 'var(--clr-text-muted)' }}>Load orders from backend...</td></tr>
        </tbody>
      </table>
    </div>
  </div>
);

const AdminCustomers = () => {
  const users = JSON.parse(localStorage.getItem('mm_users') || '[]');
  
  return (
    <div className="admin-panel active">
      <div className="admin-content__header">
        <h1>Manage <span className="text-gradient">Customers</span></h1>
      </div>
      <div className="admin-table-wrapper">
        <div className="admin-table-header"><h3>Registered Users</h3></div>
        <table className="admin-table">
          <thead><tr><th>Name</th><th>Email</th><th>Joined</th><th>Orders</th><th>Total Spent</th></tr></thead>
          <tbody>
            {users.length > 0 ? users.map(u => (
              <tr key={u.id}>
                <td style={{ color: 'var(--clr-text-primary)' }}>{u.name}</td>
                <td style={{ color: 'var(--clr-text-muted)' }}>{u.email}</td>
                <td>{new Date(u.createdAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</td>
                <td>0</td>
                <td style={{ fontWeight: 600 }}>₹0</td>
              </tr>
            )) : (
              <tr><td colSpan="5" style={{ textAlign: 'center', padding: 'var(--space-6)', color: 'var(--clr-text-muted)' }}>No customers found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AdminSettings = () => (
  <div className="admin-panel active">
    <div className="admin-content__header">
      <h1>Admin <span className="text-gradient">Settings</span></h1>
    </div>
    <div style={{ background: 'var(--clr-surface)', border: '1px solid var(--clr-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-8)', maxWidth: '600px' }}>
      <h3 style={{ marginBottom: 'var(--space-6)' }}>Store Settings</h3>
      <div className="form-group" style={{ marginBottom: 'var(--space-4)' }}>
        <label className="form-label">Store Name</label>
        <input type="text" className="form-input" defaultValue="MeltedModulus" />
      </div>
      <div className="form-group" style={{ marginBottom: 'var(--space-4)' }}>
        <label className="form-label">Store Email</label>
        <input type="email" className="form-input" defaultValue="hello@meltedmodulus.com" />
      </div>
      <div className="form-group" style={{ marginBottom: 'var(--space-4)' }}>
        <label className="form-label">Currency</label>
        <select className="form-input" defaultValue="INR (₹)"><option>INR (₹)</option><option>USD ($)</option></select>
      </div>
      <div className="form-group" style={{ marginBottom: 'var(--space-4)' }}>
        <label className="form-label">Free Shipping Threshold</label>
        <input type="number" className="form-input" defaultValue="2000" />
      </div>
      <button className="btn btn-primary" style={{ marginTop: 'var(--space-4)' }}>Save Changes</button>
    </div>
  </div>
);

export const AdminPage = () => {
  const { isAdmin } = useAuth();
  const [activePanel, setActivePanel] = useState('overview');
  const { products } = useProducts();

  if (!isAdmin) {
    return <AdminLoginGate />;
  }

  return (
    <div className="admin-layout" style={{ display: 'grid' }}>
      <AdminSidebar activePanel={activePanel} setActivePanel={setActivePanel} />
      
      <main className="admin-content">
        {activePanel === 'overview' && <AdminOverview />}
        {activePanel === 'products' && <AdminProducts products={products} />}
        {activePanel === 'orders' && <AdminOrders />}
        {activePanel === 'customers' && <AdminCustomers />}
        {activePanel === 'settings' && <AdminSettings />}
      </main>
    </div>
  );
};
