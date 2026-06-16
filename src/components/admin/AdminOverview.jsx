import React from 'react';

export const AdminOverview = () => {
  const currentDate = new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  
  // Dummy data for overview
  const recentOrders = [
    { id: '#MM-1047', name: 'Rahul Verma', product: 'Dragon Miniature Set', amount: '₹2,499', status: 'delivered', statusLabel: '✓ Delivered', date: 'Jun 10, 2026' },
    { id: '#MM-1046', name: 'Ananya Singh', product: 'Geometric Planter Set', amount: '₹2,799', status: 'shipped', statusLabel: '🚚 Shipped', date: 'Jun 9, 2026' },
    { id: '#MM-1045', name: 'Vikram Iyer', product: 'Cosplay Helmet — Warrior', amount: '₹7,499', status: 'pending', statusLabel: '⏳ Printing', date: 'Jun 8, 2026' },
    { id: '#MM-1044', name: 'Meera Joshi', product: 'Articulated Octopus ×3', amount: '₹3,597', status: 'delivered', statusLabel: '✓ Delivered', date: 'Jun 7, 2026' },
    { id: '#MM-1043', name: 'Arjun Patel', product: 'Custom Order — Phone Case', amount: '₹1,200', status: 'active', statusLabel: '● Active', date: 'Jun 6, 2026' }
  ];

  return (
    <div className="admin-panel active">
      <div className="admin-content__header">
        <div>
          <h1>Dashboard <span className="text-gradient">Overview</span></h1>
          <p style={{ color: 'var(--clr-text-muted)', fontSize: 'var(--fs-small)', marginTop: 'var(--space-1)' }}>
            Welcome back, Admin. Here's what's happening today.
          </p>
        </div>
        <span className="badge badge-accent">{currentDate}</span>
      </div>

      <div className="admin-stats">
        <div className="admin-stat-card">
          <div className="admin-stat-card__icon">💰</div>
          <div className="admin-stat-card__value">₹1,24,500</div>
          <div className="admin-stat-card__label">Total Revenue</div>
          <div className="admin-stat-card__change admin-stat-card__change--up">↑ 12.5% from last month</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-card__icon">📦</div>
          <div className="admin-stat-card__value">347</div>
          <div className="admin-stat-card__label">Total Orders</div>
          <div className="admin-stat-card__change admin-stat-card__change--up">↑ 8.2% from last month</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-card__icon">👥</div>
          <div className="admin-stat-card__value">1,253</div>
          <div className="admin-stat-card__label">Total Customers</div>
          <div className="admin-stat-card__change admin-stat-card__change--up">↑ 15.3% from last month</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-card__icon">🖨️</div>
          <div className="admin-stat-card__value">8</div>
          <div className="admin-stat-card__label">Active Products</div>
          <div className="admin-stat-card__change" style={{ color: 'var(--clr-text-muted)' }}>— No change</div>
        </div>
      </div>

      <div className="admin-table-wrapper">
        <div className="admin-table-header">
          <h3>Recent Orders</h3>
          <button className="btn btn-ghost btn-sm">View All →</button>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map(order => (
              <tr key={order.id}>
                <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--clr-brand)' }}>{order.id}</td>
                <td>{order.name}</td>
                <td>{order.product}</td>
                <td style={{ fontWeight: 'var(--fw-semibold)' }}>{order.amount}</td>
                <td><span className={`status-badge status-badge--${order.status}`}>{order.statusLabel}</span></td>
                <td>{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
