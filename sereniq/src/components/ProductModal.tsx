import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { X, Sparkles, Droplet, Milestone, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export default function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'benefits' | 'ingredients' | 'howTo'>('benefits');
  const [isAddedSuccessfully, setIsAddedSuccessfully] = useState(false);

  useEffect(() => {
    if (product) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [product]);

  if (!product) return null;

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setIsAddedSuccessfully(true);
    setTimeout(() => {
      setIsAddedSuccessfully(false);
    }, 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 min-h-screen">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-xs cursor-pointer"
        />

        {/* Modal Window Sheet */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.4 }}
          className="relative bg-white rounded-xl shadow-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row text-sereniq-brown font-sans border border-sereniq-rose"
        >
          {/* Close button absolute top-right */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-40 p-2 bg-white/80 hover:bg-sereniq-rose text-[#4B3B3D] hover:opacity-100 rounded-full cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Side: Dynamic Showcase Image */}
          <div className="w-full md:w-1/2 relative bg-sereniq-rose/10 flex items-center justify-center p-6 md:p-10 border-r border-sereniq-rose/30">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto max-h-[400px] object-cover rounded-lg shadow-md select-none"
            />
          </div>

          {/* Right Side: Information Panel */}
          <div className="w-full md:w-1/2 p-6 md:p-10 overflow-y-auto flex flex-col justify-between max-h-[90vh]">
            <div>
              {/* Category */}
              <span className="text-[10px] font-bold text-sereniq-pink tracking-[0.2em] uppercase mb-1.5 block">
                {product.category}
              </span>

              {/* Title & Volume Spec */}
              <h3 className="text-xl md:text-2xl font-light font-sans text-sereniq-brown mb-2 leading-snug">
                {product.name}
              </h3>
              <p className="text-xs text-sereniq-gray/70 tracking-widest mb-4 uppercase">
                용량/규격: <span className="font-semibold text-sereniq-brown">{product.volume}</span>
              </p>

              {/* Price list */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-xl font-bold">₩{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-sm text-sereniq-gray/50 line-through">
                    ₩{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              {/* Short promo text */}
              <p className="text-sm text-sereniq-brown/85 leading-relaxed mb-6 font-medium">
                {product.description}
              </p>

              {/* TABS SELECTOR STRIP */}
              <div className="flex border-b border-sereniq-rose/50 mb-4 text-[11px] font-bold tracking-widest uppercase text-sereniq-gray">
                <button
                  onClick={() => setActiveTab('benefits')}
                  className={`py-2 px-3 border-b-2 hover:text-sereniq-pink transition-all cursor-pointer ${
                    activeTab === 'benefits' ? 'border-sereniq-brown text-sereniq-brown' : 'border-transparent'
                  }`}
                >
                  효능특징
                </button>
                <button
                  onClick={() => setActiveTab('ingredients')}
                  className={`py-2 px-3 border-b-2 hover:text-sereniq-pink transition-all cursor-pointer ${
                    activeTab === 'ingredients' ? 'border-sereniq-brown text-sereniq-brown' : 'border-transparent'
                  }`}
                >
                  전성분
                </button>
                <button
                  onClick={() => setActiveTab('howTo')}
                  className={`py-2 px-3 border-b-2 hover:text-sereniq-pink transition-all cursor-pointer ${
                    activeTab === 'howTo' ? 'border-sereniq-brown text-sereniq-brown' : 'border-transparent'
                  }`}
                >
                  사용방법
                </button>
              </div>

              {/* TAB CONTENT COMPONENT */}
              <div className="py-2.5 text-xs text-sereniq-brown/85 leading-relaxed font-semibold min-h-[120px]">
                {activeTab === 'benefits' && (
                  <ul className="space-y-2">
                    {product.benefits.map((b, idx) => (
                      <li key={idx} className="flex gap-2 items-start text-xs font-medium text-sereniq-brown bg-sereniq-rose/10 p-2 rounded">
                        <Sparkles className="w-3.5 h-3.5 text-sereniq-pink flex-shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {activeTab === 'ingredients' && (
                  <div className="flex flex-wrap gap-2.5">
                    {product.ingredients.map((ing, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-sereniq-rose/40 text-sereniq-brown/95 text-[11px] font-medium rounded border border-sereniq-rose/50"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                )}

                {activeTab === 'howTo' && (
                  <div className="text-xs text-sereniq-brown space-y-2 leading-loose p-2.5 bg-sereniq-rose/10 rounded font-normal">
                    {product.howToUse.split('\n').map((line, i) => (
                      <p key={i} className="mb-1">{line}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* LOWER CART AGENT CONTROLS */}
            <div className="mt-8 pt-6 border-t border-sereniq-rose/50">
              <div className="flex items-center justify-between mb-4 text-xs font-bold text-sereniq-gray uppercase tracking-widest">
                <span>구매 수량 선택</span>
                <div className="flex items-center border border-sereniq-rose/60 rounded bg-white overflow-hidden text-[#4B3B3D]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 py-1.5 hover:bg-sereniq-rose/30 text-sm font-semibold transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-4 text-xs font-bold font-mono">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3.5 py-1.5 hover:bg-sereniq-rose/30 text-sm font-semibold transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add and Close actions */}
              <div className="flex gap-3">
                <button
                  id="add-to-cart-modal-btn"
                  onClick={handleAddToCart}
                  className={`flex-1 py-3.5 rounded text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer outline-none ${
                    isAddedSuccessfully
                      ? 'bg-sereniq-pink text-sereniq-brown'
                      : 'bg-sereniq-brown text-white hover:bg-sereniq-brown/90'
                  }`}
                >
                  {isAddedSuccessfully ? (
                    <>
                      <Check className="w-4 h-4 text-sereniq-brown" strokeWidth={3} />
                      장바구니 담김 완료
                    </>
                  ) : (
                    "장바구니 담기"
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
