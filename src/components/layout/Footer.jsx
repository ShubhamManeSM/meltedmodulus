import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer__main">
          {/* Brand Column */}
          <div className="footer__brand">
            <Link to="/" className="footer__brand-logo">
              <img src="/assets/images/logo.png" alt="MeltedModulus" />
              <span className="footer__brand-name"><span>Melted</span>Modulus</span>
            </Link>
            <p className="footer__brand-desc">Where ideas take shape. Premium 3D-printed products, custom designs, and maker supplies — crafted layer by layer with precision and passion.</p>
            <div className="footer__social">
              <a href="#" className="footer__social-link" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/></svg>
              </a>
              <a href="#" className="footer__social-link" aria-label="Twitter / X">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="#" className="footer__social-link" aria-label="YouTube">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"/></svg>
              </a>
              <a href="#" className="footer__social-link" aria-label="Discord">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div className="footer__column">
            <h4>Shop</h4>
            <div className="footer__links">
              <Link to="/products" className="footer__link">All Products</Link>
              <Link to="/custom" className="footer__link">Custom Prints</Link>
              <Link to="/products?new=true" className="footer__link">New Arrivals</Link>
              <Link to="/products?sale=true" className="footer__link">Sale</Link>
            </div>
          </div>

          {/* Company Column */}
          <div className="footer__column">
            <h4>Company</h4>
            <div className="footer__links">
              <Link to="/about" className="footer__link">About Us</Link>
              <Link to="/about#story" className="footer__link">Our Story</Link>
              <a href="#" className="footer__link">Blog</a>
              <a href="#" className="footer__link">Careers</a>
            </div>
          </div>

          {/* Support Column */}
          <div className="footer__column">
            <h4>Support</h4>
            <div className="footer__links">
              <a href="#" className="footer__link">Help Center</a>
              <a href="#" className="footer__link">Shipping Info</a>
              <a href="#" className="footer__link">Returns</a>
              <Link to="/contact" className="footer__link">Contact Us</Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer__bottom">
          <p className="footer__copy">© 2026 MeltedModulus. All rights reserved.</p>

          <div className="footer__legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Shipping Policy</a>
          </div>

          <div className="footer__payment">
            <span className="footer__payment-label">We accept:</span>
            <div className="footer__payment-icon">VISA</div>
            <div className="footer__payment-icon">MC</div>
            <div className="footer__payment-icon">UPI</div>
            <div className="footer__payment-icon">GPay</div>
          </div>
        </div>
      </div>
    </footer>
  );
};
