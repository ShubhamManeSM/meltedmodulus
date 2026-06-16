import React from 'react';
import { formatPrice, generateStars } from '../../utils/helpers';
import { useCart } from '../../context/CartContext';

export const ProductCard = ({ product }) => {
  const { addItem } = useCart();

  const getBadgeClass = (badge) => {
    switch (badge) {
      case 'Best Seller':
      case 'Trending':
        return 'badge-brand';
      case 'New':
        return 'badge-accent';
      case 'Premium':
        return 'badge-warm';
      default:
        return 'badge-brand';
    }
  };

  const stars = generateStars(product.rating);

  return (
    <div className="card-product">
      <div className="card-product__image">
        {product.badge && (
          <span 
            className={`badge ${getBadgeClass(product.badge)}`} 
            style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 2 }}
          >
            {product.badge}
          </span>
        )}
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>
      <div className="card-product__body">
        <span className="card-product__category">{product.category}</span>
        <h4 className="card-product__title">{product.name}</h4>
        <div className="stars">
          {stars.map((star, index) => (
            <span key={index} className={`star ${star === 'empty' ? 'star-empty' : ''}`}>
              ★
            </span>
          ))}
          <span style={{ color: 'var(--clr-text-muted)', fontSize: 'var(--fs-xs)', marginLeft: '4px' }}>
            ({product.reviews})
          </span>
        </div>
        <div className="card-product__price">
          {formatPrice(product.price)}
          {product.originalPrice && (
            <span style={{ textDecoration: 'line-through', color: 'var(--clr-text-muted)', fontSize: 'var(--fs-small)', fontWeight: 'var(--fw-regular)', marginLeft: 'var(--space-2)' }}>
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
      <div className="card-product__footer">
        <span className="text-mono" style={{ fontSize: 'var(--fs-xs)', color: 'var(--clr-text-muted)' }}>
          {product.material}
        </span>
        <button 
          className="btn btn-primary btn-sm add-to-cart-btn" 
          aria-label={`Add ${product.name} to cart`}
          onClick={() => addItem(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
