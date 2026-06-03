import React, { useState } from 'react';
import { Menu, Search, User, ShoppingBag, X, Star, CreditCard, Compass } from 'lucide-react';
import { BRAND_LOGO_DARK } from '../data';
import { CartItem, Product } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
  onOpenProduct: (product: Product) => void;
  products: Product[];
  onScrollToSection: (id: string) => void;
  reviewsCount: number;
}

export default function Header({
  cartItems,
  onOpenCart,
  onOpenProduct,
  products,
  onScrollToSection,
  reviewsCount
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const cartCount = cartItems.reduce((acc, cur) => acc + cur.quantity, 0);

  const filteredProducts = searchQuery
    ? products.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleMenuClick = (sectionId: string) => {
    setIsMenuOpen(false);
    onScrollToSection(sectionId);
  };

  return (
    <>
      {/* HEADER MAIN BAR */}
      <header id="main-header" className="fixed top-0 left-0 w-full z-45 bg-white/95 backdrop-blur-md border-b border-sereniq-rose transition-all duration-300">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-[140px] h-[76px] flex items-center justify-between">
          
          {/* Menu Button */}
          <div className="flex items-center w-1/3">
            <button
              id="hamburger-btn"
              onClick={() => setIsMenuOpen(true)}
              className="p-2 -ml-2 text-sereniq-brown hover:opacity-60 transition-opacity cursor-pointer aria-label='Open Menu'"
            >
              <Menu className="h-6 w-6 stroke-[1.5]" />
            </button>
          </div>

          {/* Logo */}
          <div className="flex justify-center w-1/3">
            <a href="#" className="inline-block" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              <img
                src={BRAND_LOGO_DARK}
                alt="SERENIQ"
                className="w-auto object-contain h-[48px] md:h-[62px] optimized-image"
              />
            </a>
          </div>

          {/* Icon Controls */}
          <div className="flex items-center justify-end space-x-4 lg:space-x-6 w-1/3 text-sereniq-brown">
            {/* Search Icon */}
            <button
              id="search-toggle-btn"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`p-1.5 hover:opacity-60 transition-opacity cursor-pointer ${isSearchOpen ? 'text-sereniq-pink' : ''}`}
              aria-label="Toggle Search"
            >
              <Search className="h-5 w-5 stroke-[1.5]" />
            </button>

            {/* Account Icon */}
            <div className="relative">
              <button
                id="account-toggle-btn"
                onClick={() => setIsAccountOpen(!isAccountOpen)}
                className={`p-1.5 hover:opacity-60 transition-opacity cursor-pointer ${isAccountOpen ? 'text-sereniq-pink' : ''}`}
                aria-label="Toggle Account Info"
              >
                <User className="h-5 w-5 stroke-[1.5]" />
              </button>

              {/* User Account Dropdown */}
              <AnimatePresence>
                {isAccountOpen && (
                  <>
                    <div className="fixed inset-0 z-30" onClick={() => setIsAccountOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-3 w-80 bg-white border border-sereniq-rose rounded-lg shadow-xl z-40 p-6 font-sans text-sereniq-brown text-left"
                    >
                      <div className="border-b border-sereniq-rose pb-4 mb-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs uppercase tracking-widest text-sereniq-gray">Membership Grade</span>
                          <span className="px-2 py-0.5 bg-sereniq-rose text-sereniq-brown text-[10px] uppercase font-bold tracking-wider rounded">VIP</span>
                        </div>
                        <h4 className="font-semibold text-base">khk030811@gmail.com 님</h4>
                        <p className="text-[11px] text-sereniq-gray/80 mt-1">세레니크에 머무시는 매 순간 평온함이 가득하시길 바랍니다.</p>
                      </div>

                      <div className="space-y-3 text-xs border-b border-sereniq-rose pb-4 mb-4">
                        <div className="flex justify-between items-center bg-sereniq-rose/30 p-2.5 rounded">
                          <span className="text-sereniq-gray flex items-center gap-1.5"><Star className="w-3.5 h-3.5 text-sereniq-pink fill-sereniq-pink" /> 가용 적립 포인트</span>
                          <span className="font-bold">2,500 P</span>
                        </div>
                        <div className="flex justify-between items-center bg-sereniq-rose/30 p-2.5 rounded">
                          <span className="text-sereniq-gray flex items-center gap-1.5"><Compass className="w-3.5 h-3.5 text-sereniq-pink" /> 보유 할인 쿠폰</span>
                          <span className="font-bold">1 장</span>
                        </div>
                      </div>

                      <div className="bg-sereniq-rose/20 p-3 rounded-md text-[11px] text-sereniq-brown mb-4 border border-sereniq-rose/40">
                        <p className="font-semibold mb-1 text-sereniq-brown/90 flex items-center gap-1"><CreditCard className="w-3.5 h-3.5" /> 진행 중인 시크릿 프로모션</p>
                        <p className="text-sereniq-gray">첫 영입 웰컴 10% 쿠폰 코드</p>
                        <div className="flex items-center justify-between mt-1 pt-1.5 border-t border-sereniq-rose/20">
                          <code className="bg-white px-2 py-0.5 border border-sereniq-pink rounded font-mono text-[10px] text-sereniq-brown/80">SERENIQVIP10</code>
                          <span className="text-[9px] text-sereniq-gray font-medium">주문 시 입력</span>
                        </div>
                      </div>

                      <button
                        onClick={() => setIsAccountOpen(false)}
                        className="w-full text-center py-2 bg-sereniq-brown text-white hover:bg-sereniq-brown/90 transition-colors text-xs tracking-wider rounded font-medium"
                      >
                        닫기
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Cart Icon */}
            <button
              id="cart-toggle-btn"
              onClick={onOpenCart}
              className="p-1.5 hover:opacity-60 transition-opacity relative cursor-pointer"
              aria-label="Toggle Shopping Cart"
            >
              <ShoppingBag className="h-5 w-5 stroke-[1.5]" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-sereniq-pink text-sereniq-brown text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center border border-white"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>
          </div>
        </div>

        {/* SEARCH DROP-DOWN TRAY */}
        <AnimatePresence>
          {isSearchOpen && (
            <>
              {/* Back drop to close search when clicking outside */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-transparent z-20"
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery('');
                }}
              />
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="absolute left-0 w-full bg-white border-b border-sereniq-rose z-30 shadow-lg overflow-hidden"
                onClick={(e) => {
                  const target = e.target as HTMLElement;
                  const isInputArea = target.closest('input') || target.closest('.flex.items-center.border-b-2');
                  const isInteractive = target.closest('button') || target.closest('a') || target.closest('.cursor-pointer');
                  const isResultsContainer = target.closest('.search-results-container');
                  
                  if (!isInputArea && !isInteractive && !isResultsContainer) {
                    setIsSearchOpen(false);
                    setSearchQuery('');
                  }
                }}
              >
              <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="flex items-center border-b-2 border-sereniq-brown pb-2 mb-6">
                  <Search className="h-5 w-5 text-sereniq-gray/60 mr-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="맑고 고요한 스킨케어 제품을 검색해 보세요..."
                    className="w-full bg-transparent border-none focus:outline-none text-base text-sereniq-brown placeholder:text-sereniq-gray/40 focus:ring-0"
                    autoFocus
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="p-1 hover:text-sereniq-pink cursor-pointer">
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {searchQuery ? (
                  <div>
                    <h5 className="text-[11px] uppercase tracking-widest text-sereniq-gray mb-3 font-semibold">검색 결과 ({filteredProducts.length})</h5>
                    {filteredProducts.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[300px] overflow-y-auto pr-2 search-results-container">
                        {filteredProducts.map((product) => (
                          <div
                            key={product.id}
                            onClick={() => {
                              onOpenProduct(product);
                              setIsSearchOpen(false);
                              setSearchQuery('');
                            }}
                            className="flex items-center gap-4 p-2.5 rounded-lg hover:bg-sereniq-rose/30 transition-colors cursor-pointer group"
                          >
                            <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded bg-sereniq-rose/20 border border-sereniq-rose/50" />
                            <div>
                              <h6 className="text-[13px] font-semibold text-sereniq-brown group-hover:text-sereniq-pink transition-colors">{product.name}</h6>
                              <p className="text-xs text-sereniq-brown/80 font-medium">₩{product.price.toLocaleString()}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-sereniq-gray/60 py-6 text-center">검색 결과가 없습니다. 다른 검색어를 입력해 보세요.</p>
                    )}
                  </div>
                ) : (
                  <div>
                    <div className="mb-4">
                      <h5 className="text-[11px] uppercase tracking-widest text-sereniq-gray mb-3.5 font-semibold">인기 검색어</h5>
                      <div className="flex flex-wrap gap-2.5">
                        {['올인원 세트', '카밍 앰플', '약산성 클렌저', '보습 크림', '스킨케어 밸런싱'].map((tag) => (
                          <button
                            key={tag}
                            onClick={() => setSearchQuery(tag)}
                            className="px-3.5 py-1.5 text-xs bg-sereniq-rose/40 hover:bg-sereniq-rose/80 text-sereniq-brown/90 rounded-full transition-colors font-medium cursor-pointer"
                          >
                            #{tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      {/* LEFT NAVIGATION DRAWER */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black z-50 pointer-events-auto"
            />

            {/* Menu Content Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 left-0 w-full sm:w-[360px] h-full bg-white z-50 p-8 flex flex-col justify-between font-sans border-r border-sereniq-rose/40 shadow-2xl"
            >
              <div>
                <div className="flex justify-between items-center mb-10">
                  <span className="font-serif tracking-widest text-lg font-bold">SERENIQ</span>
                  <button onClick={() => setIsMenuOpen(false)} className="p-1.5 hover:opacity-60 transition-opacity cursor-pointer">
                    <X className="h-5 w-5 text-sereniq-brown" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="border-b border-sereniq-rose/50 pb-5">
                    <h5 className="text-[10px] uppercase tracking-[0.2em] text-sereniq-gray font-bold mb-3">Shop Categories</h5>
                    <ul className="space-y-3.5 text-sm font-medium">
                      <li>
                        <button onClick={() => handleMenuClick('products')} className="hover:text-sereniq-pink flex items-center justify-between w-full group text-left cursor-pointer">
                          <span>스킨케어 전체 컬렉션</span>
                          <span className="text-xs text-sereniq-gray font-light transform translate-x-0 group-hover:translate-x-1.5 transition-transform">→</span>
                        </button>
                      </li>
                      {['cleanser', 'ampoule', 'cream'].map((category) => (
                        <li key={category}>
                          <button onClick={() => handleMenuClick('products')} className="hover:text-sereniq-pink flex items-center justify-between w-full group text-left uppercase text-[13px] cursor-pointer">
                            <span>{category === 'cleanser' ? '클렌징 수딩 라인' : category === 'ampoule' ? '리미티드 수분 앰플' : '배리어 밀착 보호 크림'}</span>
                            <span className="text-xs text-sereniq-gray font-light transform translate-x-0 group-hover:translate-x-1.5 transition-transform">→</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2">
                    <h5 className="text-[10px] uppercase tracking-[0.2em] text-sereniq-gray font-bold mb-3">Brand Journal</h5>
                    <ul className="space-y-3 text-[13px] text-sereniq-brown/80 font-medium">
                      <li>
                        <button onClick={() => handleMenuClick('philosophy')} className="hover:text-sereniq-pink cursor-pointer">
                          브랜드 유산 & 철학
                        </button>
                      </li>
                      <li>
                        <button onClick={() => handleMenuClick('reviews')} className="hover:text-sereniq-pink cursor-pointer">
                          고객 리얼 리뷰 센터 ({reviewsCount})
                        </button>
                      </li>
                      <li>
                        <a href="#" onClick={(e) => { e.preventDefault(); alert("세레니크 소식지가 곧 론칭됩니다!"); }} className="hover:text-sereniq-pink cursor-pointer">
                          그린 이니셔티브 & 친환경 서스테이너빌리티
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-t border-sereniq-rose pt-6 text-[10px] text-sereniq-gray/70 tracking-widest">
                <p className="font-serif mb-2">SERENIQ BEAUTY LAB</p>
                <p>© 2026 SERENIQ. ALL RIGHTS RESERVED.</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
