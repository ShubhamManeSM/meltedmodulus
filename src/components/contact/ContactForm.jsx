import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ScrollReveal } from '../common/ScrollReveal';

export const ContactForm = () => {
  const [status, setStatus] = useState('idle'); // idle, loading, success
  const [emailError, setEmailError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = document.getElementById('contact-email').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
      setEmailError(true);
      setTimeout(() => setEmailError(false), 3000);
      return;
    }

    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  if (status === 'success') {
    return (
      <div className="contact-form show" id="contact-success" style={{ display: 'block', opacity: 1, visibility: 'visible', animation: 'none' }}>
        <div className="form-success__icon">✅</div>
        <h3>Message Sent Successfully!</h3>
        <p style={{ color: 'var(--clr-text-secondary)', marginTop: 'var(--space-3)' }}>
          Thank you for reaching out. We'll get back to you within 24 hours. Check your email for a confirmation.
        </p>
        <Link to="/" className="btn btn-secondary" style={{ marginTop: 'var(--space-6)', display: 'inline-block' }}>
          Back to Home →
        </Link>
      </div>
    );
  }

  return (
    <ScrollReveal className="contact-form">
      <h3>Send Us a Message</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="contact-name">Full Name *</label>
          <input type="text" className="form-input" id="contact-name" placeholder="Your name" required />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="contact-email">Email Address *</label>
          <input 
            type="email" 
            className="form-input" 
            id="contact-email" 
            placeholder="your@email.com" 
            required 
            style={emailError ? { borderColor: 'var(--clr-error)' } : {}}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="contact-subject">Subject *</label>
          <select className="form-input" id="contact-subject" required>
            <option value="">Select a topic</option>
            <option value="general">General Inquiry</option>
            <option value="product">Product Question</option>
            <option value="custom">Custom Order</option>
            <option value="shipping">Shipping & Returns</option>
            <option value="feedback">Feedback</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="contact-message">Message *</label>
          <textarea className="form-textarea" id="contact-message" placeholder="Tell us how we can help you..." required></textarea>
        </div>
        <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }} disabled={status === 'loading'}>
          {status === 'loading' ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </ScrollReveal>
  );
};
