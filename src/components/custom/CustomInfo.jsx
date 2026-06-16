import React from 'react';
import { Link } from 'react-router-dom';
import { ScrollReveal } from '../common/ScrollReveal';

export const CustomInfo = () => {
  return (
    <ScrollReveal className="custom-info" delay={2}>
      <div className="custom-info-card">
        <h4>📦 What We Can Print</h4>
        <ul>
          <li>Prototypes & functional parts</li>
          <li>Cosplay props & armor</li>
          <li>Personalized gifts & decor</li>
          <li>Replacement parts & brackets</li>
          <li>Miniatures & figurines</li>
          <li>Custom phone cases & accessories</li>
          <li>Architectural models</li>
        </ul>
      </div>
      <div className="custom-info-card">
        <h4>⚡ Quick Facts</h4>
        <ul>
          <li>Free consultation & quote</li>
          <li>Turnaround: 3-7 business days</li>
          <li>Max print size: 256×256×256 mm</li>
          <li>Layer accuracy: 0.1mm – 0.3mm</li>
          <li>3 materials available</li>
          <li>Post-processing included</li>
        </ul>
      </div>
      <div className="custom-info-card">
        <h4>💬 Need Help?</h4>
        <p style={{ fontSize: 'var(--fs-small)', color: 'var(--clr-text-secondary)', marginBottom: 'var(--space-3)' }}>
          Not sure what you need? Our team is happy to help you figure it out.
        </p>
        <Link to="/contact" className="btn btn-ghost btn-sm">
          Contact Support →
        </Link>
      </div>
    </ScrollReveal>
  );
};
