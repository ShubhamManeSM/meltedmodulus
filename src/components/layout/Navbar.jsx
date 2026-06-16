import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/images/logo.png';

export const Navbar = ({ onOpenAuth }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  const { getTotalItems, openDrawer } = useCart();
  const { currentUser, isLoggedIn, isAdmin, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
    document.body.style.overflow = '';
  }, [location]);

  // Handle click outside user menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.user-menu')) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const toggleMobileMenu = () => {
    const nextState = !isMobileMenuOpen;
    setIsMobileMenuOpen(nextState);
    document.body.style.overflow = nextState ? 'hidden' : '';
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="navbar__inner">
        <Link to="/" className="navbar__logo">
          <img src={logo} alt="MeltedModulus" className="navbar__logo-img" />
          <span className="navbar__logo-text"><span>Melted</span>Modulus</span>
        </Link>
        <div className="navbar__links">
          <NavLink to="/products" className={({ isActive }) => `navbar__link ${isActive ? 'active' : ''}`}>Products</NavLink>
          <NavLink to="/custom" className={({ isActive }) => `navbar__link ${isActive ? 'active' : ''}`}>Custom</NavLink>
          <NavLink to="/about" className={({ isActive }) => `navbar__link ${isActive ? 'active' : ''}`}>About</NavLink>
          <NavLink to="/contact" className={({ isActive }) => `navbar__link ${isActive ? 'active' : ''}`}>Contact Us</NavLink>
        </div>
        <div className="navbar__actions">
          {isLoggedIn ? (
            <div className="user-menu" onClick={(e) => e.stopPropagation()}>
              <button 
                className="user-menu__trigger" 
                id="user-menu-trigger"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <div className="user-menu__avatar">{getInitials(currentUser.name)}</div>
                <span>{currentUser.name.split(' ')[0]}</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" width="12" height="12">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
                </svg>
              </button>
              <div className={`user-menu__dropdown ${isUserMenuOpen ? 'open' : ''}`} id="user-dropdown">
                <div className="user-menu__dropdown-header">
                  <div className="user-menu__dropdown-name">{currentUser.name}</div>
                  <div className="user-menu__dropdown-email">{currentUser.email}</div>
                </div>
                <a className="user-menu__dropdown-item" href="#">👤 My Profile</a>
                <a className="user-menu__dropdown-item" href="#">📦 My Orders</a>
                <a className="user-menu__dropdown-item" href="#">❤️ Wishlist</a>
                {isAdmin && (
                  <Link className="user-menu__dropdown-item" to="/admin">🛠️ Admin Dashboard</Link>
                )}
                <div className="user-menu__dropdown-divider"></div>
                <button className="user-menu__dropdown-item user-menu__dropdown-item--danger" onClick={handleLogout}>
                  🚪 Sign Out
                </button>
              </div>
            </div>
          ) : (
            <button className="navbar__login-btn" onClick={onOpenAuth}>Sign In</button>
          )}

          <button className="navbar__cart-btn" aria-label="Open shopping cart" onClick={openDrawer}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>
            </svg>
            <span className="cart-badge">{getTotalItems() > 0 ? getTotalItems() : ''}</span>
          </button>
          <button 
            className={`navbar__toggle ${isMobileMenuOpen ? 'active' : ''}`} 
            aria-label="Toggle menu" 
            aria-expanded={isMobileMenuOpen}
            onClick={toggleMobileMenu}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>

      <div className={`navbar__mobile-menu ${isMobileMenuOpen ? 'open' : ''}`} id="mobile-menu">
        <NavLink to="/products" className="navbar__mobile-link">Products</NavLink>
        <NavLink to="/custom" className="navbar__mobile-link">Custom</NavLink>
        <NavLink to="/about" className="navbar__mobile-link">About</NavLink>
        <NavLink to="/contact" className="navbar__mobile-link">Contact Us</NavLink>
        
        {isLoggedIn ? (
          <div className="mobile-auth" style={{ marginTop: 'var(--space-4)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--clr-border)' }}>
            <div style={{ color: 'var(--clr-text-muted)', fontSize: 'var(--fs-xs)', textTransform: 'uppercase', letterSpacing: 'var(--ls-wide)', marginBottom: 'var(--space-2)' }}>
              Logged in as {currentUser.name.split(' ')[0]}
            </div>
            <a href="#" className="navbar__mobile-link">👤 My Profile</a>
            <a href="#" className="navbar__mobile-link">📦 My Orders</a>
            {isAdmin && (
              <Link to="/admin" className="navbar__mobile-link">🛠️ Admin Dashboard</Link>
            )}
            <button 
              className="navbar__mobile-link mobile-auth-logout" 
              style={{ color: 'var(--clr-error)', width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: 'var(--space-3) var(--space-4)', fontSize: '1.125rem' }}
              onClick={handleLogout}
            >
              🚪 Sign Out
            </button>
          </div>
        ) : (
          <div className="mobile-auth" style={{ marginTop: 'var(--space-4)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--clr-border)' }}>
            <button 
              className="btn btn-primary" 
              style={{ width: 'calc(100% - 2rem)', margin: '0 1rem' }}
              onClick={() => {
                toggleMobileMenu();
                onOpenAuth();
              }}
            >
              Sign In
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
