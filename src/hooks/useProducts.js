import { useState, useEffect } from 'react';
import productsData from '../assets/data/products.json';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate network delay if needed, or just set it immediately
    setProducts(productsData);
    setLoading(false);
  }, []);

  return { products, loading };
};
