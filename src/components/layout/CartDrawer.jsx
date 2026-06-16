import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/helpers';

export const CartDrawer = () => {
  const { items, isDrawerOpen, closeDrawer, removeItem, updateQty, getTotal } = useCart();

  return (
    <>
      <div 
        className={`cart-overlay ${isDrawerOpen ? 'open' : ''}`} 
        onClick={closeDrawer}
      ></div>
      <div className={`cart-drawer ${isDrawerOpen ? 'open' : ''}`}>
        <div className="cart-drawer__header">
          <h3>Your Cart</h3>
          <button className="btn btn-icon" onClick={closeDrawer}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" width="20" height="20">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        <div className="cart-drawer__body">
          {items.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty__icon">🛒</div>
              <p>Your cart is empty</p>
              <Link to="/products" className="btn btn-primary" style={{ marginTop: 'var(--space-4)' }} onClick={closeDrawer}>
                Browse Products
              </Link>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="cart-drawer__item">
                <div className="cart-drawer__item-img">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-drawer__item-info">
                  <div className="cart-drawer__item-name">{item.name}</div>
                  <div className="cart-drawer__item-price">{formatPrice(item.price)}</div>
                  <div className="qty-selector" style={{ marginTop: 'var(--space-2)' }}>
                    <button onClick={() => updateQty(item.id, -1)} aria-label="Decrease quantity">−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)} aria-label="Increase quantity">+</button>
                  </div>
                </div>
                <button 
                  className="cart-drawer__item-remove" 
                  onClick={() => removeItem(item.id)} 
                  aria-label={`Remove ${item.name}`}
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>
        
        {items.length > 0 && (
          <div className="cart-drawer__footer" style={{ display: 'block' }}>
            <div className="cart-drawer__total">
              <span>Total</span>
              <span>{formatPrice(getTotal())}</span>
            </div>
            <button className="btn btn-primary" style={{ width: '100%' }}>Proceed to Checkout</button>
          </div>
        )}
      </div>
    </>
  );
};
