import React, { useState } from 'react';
import { Product, ProductCategory } from '../types';
import { Eye, ShoppingBag, ArrowUpDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProductsProps {
  products: Product[];
  onOpenProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

type SortOption = 'default' | 'price-asc' | 'price-desc';

const CATEGORY_LABELS: Record<ProductCategory | 'all', string> = {
  all: '전체 상품',
  skincare: '올인원 세트',
  cleanser: '수딩 클렌저',
  ampoule: '카밍 앰플',
  cream: '토너 & 크림'
};

export default function Products({ products, onOpenProduct, onAddToCart }: ProductsProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [sortOption, setSortOption] = useState<SortOption>('default');

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter((p) => p.category === selectedCategory);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'price-asc') return a.price - b.price;
    if (sortOption === 'price-desc') return b.price - a.price;
    return 0; // default (initial sequence)
  });

  return (
    <section id="products" className="py-20 md:py-28 bg-sereniq-rose/20 font-sans border-b border-sereniq-rose/50" data-purpose="best-sellers">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-[140px]">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl font-light tracking-wide text-sereniq-brown font-maru"
            >
              베스트 상품
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xs sm:text-sm text-sereniq-gray mt-2"
            >
              가장 많은 사랑을 받은 세레니크의 시그니처 라인을 만나보세요
            </motion.p>
          </div>

          {/* Sort selection option */}
          <div className="flex items-center gap-2 text-xs text-sereniq-brown bg-white border border-sereniq-rose/60 rounded px-2.5 py-1.5 self-end">
            <ArrowUpDown className="w-3.5 h-3.5 text-sereniq-pink" />
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="bg-transparent border-none pr-6 focus:outline-none focus:ring-0 text-[11px] font-semibold tracking-wider cursor-pointer"
            >
              <option value="default">추천 순</option>
              <option value="price-asc">가격 낮은 순</option>
              <option value="price-desc">가격 높은 순</option>
            </select>
          </div>
        </div>



        {/* Products Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {sortedProducts.map((product) => {
              const hasDiscount = product.originalPrice && product.originalPrice > product.price;
              const discountRate = hasDiscount
                ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
                : 0;

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  key={product.id}
                  className="group relative flex flex-col bg-white border border-sereniq-rose/20 rounded h-full transition-shadow hover:shadow-xl hover:shadow-sereniq-brown/5 overflow-hidden"
                >
                  {/* Image Container */}
                  <div className="aspect-square bg-white relative overflow-hidden flex items-center justify-center p-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none rounded bg-sereniq-rose/5"
                    />

                    {/* Elegant Discount Badge */}
                    {hasDiscount && (
                      <span className="absolute top-3.5 left-3.5 px-2 py-0.5 bg-sereniq-pink text-sereniq-brown text-[10px] font-bold tracking-widest uppercase rounded">
                        {discountRate}% Off
                      </span>
                    )}

                    {/* Quick Access Overlay on Hover */}
                    <div className="absolute inset-0 bg-sereniq-brown/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                      <button
                        onClick={() => onOpenProduct(product)}
                        className="p-3 bg-white hover:bg-sereniq-rose text-sereniq-brown rounded-full shadow-lg transition-transform hover:scale-105 cursor-pointer flex items-center justify-center"
                        title="상세 보기"
                      >
                        <Eye className="w-5.5 h-5.5 stroke-[1.8]" />
                      </button>
                      <button
                        onClick={() => onAddToCart(product)}
                        className="p-3 bg-sereniq-brown hover:bg-sereniq-brown/90 text-white rounded-full shadow-lg transition-transform hover:scale-105 cursor-pointer flex items-center justify-center"
                        title="장바구니 담기"
                      >
                        <ShoppingBag className="w-5.5 h-5.5 stroke-[1.8]" />
                      </button>
                    </div>
                  </div>

                  {/* Information block */}
                  <div className="p-5 flex flex-col justify-between flex-grow">
                    <div>
                      <span className="text-[10px] font-bold text-sereniq-pink tracking-widest uppercase mb-1 block">
                        {product.category}
                      </span>
                      <h3
                        onClick={() => onOpenProduct(product)}
                        className="text-sm md:text-[15px] font-medium text-sereniq-brown mb-2 group-hover:text-sereniq-pink transition-colors cursor-pointer line-clamp-1"
                      >
                        {product.name}
                      </h3>
                      <p className="text-xs text-sereniq-gray/80 line-clamp-2 mb-4 leading-relaxed font-light">
                        {product.description}
                      </p>
                    </div>

                    <div className="flex items-baseline gap-2 pt-2 border-t border-sereniq-rose/40 mt-auto">
                      <span className="font-bold text-sereniq-brown text-[15px]">
                        ₩{product.price.toLocaleString()}
                      </span>
                      {hasDiscount && (
                        <span className="text-xs text-sereniq-gray/50 line-through">
                          ₩{product.originalPrice!.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
