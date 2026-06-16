import React from 'react';
import { ScrollReveal } from '../common/ScrollReveal';

export const ContactInfo = () => {
  return (
    <ScrollReveal className="contact-info" delay={2}>
      <div className="contact-info-card">
        <div className="contact-info-card__icon">📧</div>
        <div>
          <h4>Email</h4>
          <p><a href="mailto:hello@meltedmodulus.com">hello@meltedmodulus.com</a></p>
        </div>
      </div>
      <div className="contact-info-card">
        <div className="contact-info-card__icon">📞</div>
        <div>
          <h4>Phone</h4>
          <p><a href="tel:+919876543210">+91 98765 43210</a></p>
        </div>
      </div>
      <div className="contact-info-card">
        <div className="contact-info-card__icon">📍</div>
        <div>
          <h4>Location</h4>
          <p style={{ color: 'var(--clr-text-secondary)' }}>Mumbai, Maharashtra, India</p>
        </div>
      </div>
      <div className="contact-info-card">
        <div className="contact-info-card__icon">🕐</div>
        <div>
          <h4>Business Hours</h4>
          <p style={{ color: 'var(--clr-text-secondary)' }}>Mon – Sat: 10:00 AM – 7:00 PM IST<br />Sunday: Closed</p>
        </div>
      </div>

      <div style={{ marginTop: 'var(--space-4)' }}>
        <h4 style={{ fontSize: 'var(--fs-small)', marginBottom: 'var(--space-4)', textTransform: 'uppercase', letterSpacing: 'var(--ls-wider)', fontFamily: 'var(--font-mono)' }}>Follow Us</h4>
        <div className="footer__social">
          <a href="#" className="footer__social-link" aria-label="Instagram">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" /></svg>
          </a>
          <a href="#" className="footer__social-link" aria-label="Twitter / X">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
          </a>
          <a href="#" className="footer__social-link" aria-label="YouTube">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" /></svg>
          </a>
        </div>
      </div>
    </ScrollReveal>
  );
};
