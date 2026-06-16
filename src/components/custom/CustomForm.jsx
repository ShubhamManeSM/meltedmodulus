import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ScrollReveal } from '../common/ScrollReveal';

export const CustomForm = () => {
  const [status, setStatus] = useState('idle'); // idle, loading, success

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  if (status === 'success') {
    return (
      <div className="custom-form show" id="custom-success" style={{ display: 'block', opacity: 1, visibility: 'visible', animation: 'none' }}>
        <div className="form-success__icon">🎉</div>
        <h3>Quote Request Received!</h3>
        <p style={{ color: 'var(--clr-text-secondary)', marginTop: 'var(--space-3)' }}>
          We'll review your project and get back to you within 24-48 hours with a detailed quote. Check your email for a confirmation.
        </p>
        <Link to="/products" className="btn btn-secondary" style={{ marginTop: 'var(--space-6)', display: 'inline-block' }}>
          Browse Products While You Wait →
        </Link>
      </div>
    );
  }

  return (
    <ScrollReveal className="custom-form">
      <h3>Tell Us About Your Project</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="custom-name">Full Name *</label>
            <input type="text" className="form-input" id="custom-name" placeholder="Your name" required />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="custom-email">Email *</label>
            <input type="email" className="form-input" id="custom-email" placeholder="your@email.com" required />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="custom-phone">Phone</label>
            <input type="tel" className="form-input" id="custom-phone" placeholder="+91 XXXXX XXXXX" />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="custom-qty">Quantity</label>
            <input type="number" className="form-input" id="custom-qty" min="1" defaultValue="1" placeholder="1" />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="custom-desc">Project Description *</label>
          <textarea className="form-textarea" id="custom-desc" placeholder="Describe what you want printed — dimensions, purpose, reference images, any specific requirements..." required></textarea>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="custom-material">Material Preference</label>
            <select className="form-input" id="custom-material">
              <option value="">Not Sure — Recommend me</option>
              <option value="PLA">PLA — Easy to print, vibrant colors</option>
              <option value="PETG">PETG — Strong, chemical resistant</option>
              <option value="TPU">TPU — Flexible, elastic</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="custom-color">Color Preference</label>
            <select className="form-input" id="custom-color">
              <option value="">Select a color</option>
              <option value="Black">Black</option>
              <option value="White">White</option>
              <option value="Red">Red</option>
              <option value="Blue">Blue</option>
              <option value="Gold">Gold</option>
              <option value="Orange">Orange</option>
              <option value="Yellow">Yellow</option>
              <option value="Pink">Pink</option>
              <option value="Beige">Beige</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Reference Images</label>
          <div className="file-upload-disabled">
            <p style={{ color: 'var(--clr-text-muted)' }}>📎 Drag & drop files here or click to upload</p>
            <p className="file-upload-disabled__tooltip">⚡ Coming soon — for now, describe your idea in the text field above or email us images.</p>
          </div>
        </div>
        <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: 'var(--space-4)' }} disabled={status === 'loading'}>
          {status === 'loading' ? 'Submitting...' : 'Submit Quote Request'}
        </button>
      </form>
    </ScrollReveal>
  );
};
