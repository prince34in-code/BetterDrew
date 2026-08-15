import React from 'react';
import { Helmet } from 'react-helmet-async';
import ProductDetail from '@/sections/ProductDetail';
import Footer from '@/sections/Footer';
import { betterdrewProduct } from '@/data/product';

const ProductPage: React.FC = () => {
  return (
    <div className="pt-24">
      <Helmet>
        <title>{`${betterdrewProduct.name} | Betterdrew`}</title>
        <meta name="description" content={`Shop ${betterdrewProduct.name}. ${betterdrewProduct.description}`} />
        <link rel="canonical" href="https://betterdrew.com/product" />
        <meta property="og:title" content={`${betterdrewProduct.name} | Betterdrew`} />
        <meta property="og:description" content={betterdrewProduct.description} />
        <meta property="og:url" content="https://betterdrew.com/product" />
      </Helmet>
      <ProductDetail />
      <Footer />
    </div>
  );
};

export default ProductPage;
