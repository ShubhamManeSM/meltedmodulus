import React, { useState, useMemo } from 'react';
import { PageHero } from '../components/common/PageHero';
import { FilterSidebar } from '../components/products/FilterSidebar';
import { ProductGrid } from '../components/products/ProductGrid';
import { useProducts } from '../hooks/useProducts';

export const ProductsPage = () => {
  const { products, loading } = useProducts();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [filters, setFilters] = useState({
    categories: [],
    materials: [],
    price: 'all'
  });

  const clearFilters = () => {
    setFilters({ categories: [], materials: [], price: 'all' });
    setSortBy('featured');
  };

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      if (filters.categories.length > 0 && !filters.categories.includes(p.category)) return false;
      if (filters.materials.length > 0 && !filters.materials.includes(p.material)) return false;
      if (filters.price !== 'all') {
        const [min, max] = filters.price.includes('+')
          ? [parseInt(filters.price), Infinity]
          : filters.price.split('-').map(Number);
        if (p.price < min || p.price > max) return false;
      }
      return true;
    });
  }, [products, filters]);

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    switch (sortBy) {
      case 'price-low': sorted.sort((a, b) => a.price - b.price); break;
      case 'price-high': sorted.sort((a, b) => b.price - a.price); break;
      case 'rating': sorted.sort((a, b) => b.rating - a.rating); break;
      case 'name': sorted.sort((a, b) => a.name.localeCompare(b.name)); break;
      default: break; // featured
    }
    return sorted;
  }, [filteredProducts, sortBy]);

  return (
    <>
      <PageHero 
        label="Shop"
        titleHighlight="All Products"
        description="From gaming miniatures to functional home decor — browse our collection of premium 3D printed items."
      />

      <section style={{ paddingTop: 'var(--space-4)' }}>
        <div className="container">
          <div className="products-layout">
            <FilterSidebar 
              isOpen={isSidebarOpen} 
              onClose={() => setIsSidebarOpen(false)}
              filters={filters}
              setFilters={setFilters}
            />
            
            <div>
              <div className="products-controls">
                <button 
                  className="btn btn-secondary btn-sm filter-toggle-mobile" 
                  id="filter-toggle-mobile"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                  {isSidebarOpen ? '✕ Close' : '☰ Filters'}
                </button>
                <span className="products-count" id="products-count">
                  Showing {sortedProducts.length} of {products.length} products
                </span>
                <select className="sort-select" id="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                  <option value="name">Name: A–Z</option>
                </select>
              </div>


              
              <ProductGrid 
                products={sortedProducts} 
                filters={filters}
                setFilters={setFilters}
                clearFilters={clearFilters}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
