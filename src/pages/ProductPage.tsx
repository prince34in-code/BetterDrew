import React from 'react';
import ProductDetail from '@/sections/ProductDetail';
import Footer from '@/sections/Footer';

const ProductPage: React.FC = () => {
  return (
    <div className="pt-24">
      <ProductDetail />
      <Footer />
    </div>
  );
};

export default ProductPage;
