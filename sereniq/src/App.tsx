import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import Products from './components/Products';
import Showcase from './components/Showcase';
import CtaSection from './components/CtaSection';
import Reviews from './components/Reviews';
import Footer from './components/Footer';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';

import { INITIAL_PRODUCTS, INITIAL_REVIEWS } from './data';
import { Product, Review, CartItem } from './types';

export default function App() {
  // Products definition
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);

  // Load reviews from localStorage or fall back to default reviews
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const persisted = localStorage.getItem('sereniq_reviews');
      if (persisted) {
        const migrated = persisted.replace(/세레니끄/g, '세레니크');
        const parsed = JSON.parse(migrated) as Review[];
        // Always sync default reviews to use the latest resolved images/content from INITIAL_REVIEWS
        return parsed.map((rev) => {
          const defaultRev = INITIAL_REVIEWS.find(r => r.id === rev.id);
          if (defaultRev) {
            return {
              ...rev,
              image: defaultRev.image
            };
          }
          return rev;
        });
      }
      return INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  // Load cart from localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const persisted = localStorage.getItem('sereniq_cart');
      if (persisted) {
        const migrated = persisted.replace(/세레니끄/g, '세레니크');
        return JSON.parse(migrated);
      }
      return [];
    } catch {
      return [];
    }
  });

  // UI state managers
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sync reviews to local storage on change
  useEffect(() => {
    localStorage.setItem('sereniq_reviews', JSON.stringify(reviews));
  }, [reviews]);

  // Sync cart to local storage on change
  useEffect(() => {
    localStorage.setItem('sereniq_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Smoother scrolling transition helper to jump to correct areas
  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 76;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Add review callback
  const handleAddReview = (newReview: Review) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  // Add to cart with designated quantity
  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex((item) => item.product.id === product.id);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      }
      return [...prev, { product, quantity }];
    });
  };

  // Direct card-add utility
  const handleDirectAdd = (product: Product) => {
    handleAddToCart(product, 1);
    setIsCartOpen(true); // open drawer immediately on direct click
  };

  // Update item counts inside the cart side panel
  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Remove single card block
  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Clear completed carts
  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="min-h-screen bg-white text-sereniq-brown selection:bg-sereniq-pink/30 flex flex-col justify-between">
      
      {/* Header Sticky */}
      <Header
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenProduct={(product) => setSelectedProduct(product)}
        products={products}
        onScrollToSection={handleScrollToSection}
        reviewsCount={reviews.length}
      />

      {/* Hero Block */}
      <main className="flex-grow">
        <Hero onExploreClick={() => handleScrollToSection('products')} />
        
        {/* Brand Theme Philosophy */}
        <Philosophy />

        {/* Product Grid selection */}
        <Products
          products={products}
          onOpenProduct={(product) => setSelectedProduct(product)}
          onAddToCart={handleDirectAdd}
        />

        {/* Big Spotlight story block */}
        <Showcase />

        {/* Customer Reviews section */}
        <Reviews
          reviews={reviews}
          products={products}
          onAddReview={handleAddReview}
          onOpenProduct={(product) => setSelectedProduct(product)}
        />

        {/* Green Recycle CTA section */}
        <CtaSection />
      </main>

      {/* Base footer */}
      <Footer />

      {/* PRODUCT SPOTLIGHT MODAL DETAILS */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(product, quantity) => {
            handleAddToCart(product, quantity);
            setSelectedProduct(null); // auto-close modal on action
            setIsCartOpen(true);      // immediately prompt cart drawer feedback
          }}
        />
      )}

      {/* SHOPPING BAG SLIDEOUT PANEL */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

    </div>
  );
}
