import React, { useState } from 'react';
import { Review, Product } from '../types';
import { Star, MessageSquarePlus, Check, Sparkles, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ReviewsProps {
  reviews: Review[];
  products: Product[];
  onAddReview: (review: Review) => void;
  onOpenProduct: (product: Product) => void;
}

export default function Reviews({ reviews, products, onAddReview, onOpenProduct }: ReviewsProps) {
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');
  const [filterProductId, setFilterProductId] = useState<string | 'all'>('all');

  // Review Form state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newAuthor, setNewAuthor] = useState('');
  const [newContent, setNewContent] = useState('');
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || '');
  const [uploadedImageIndex, setUploadedImageIndex] = useState<number>(0); // select 0-3 corresponding to product image

  const filteredReviews = reviews.filter((rev) => {
    const matchRating = filterRating === 'all' || (filterRating === 4 ? rev.rating <= 4 : rev.rating === filterRating);
    const matchProduct = filterProductId === 'all' || rev.productId === filterProductId;
    return matchRating && matchProduct;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newContent.trim()) {
      alert("이름과 후기 내용을 정확히 기재해 주세요.");
      return;
    }

    const matchedProduct = products.find((p) => p.id === selectedProductId);
    if (!matchedProduct) return;

    const today = new Date();
    const yearStr = String(today.getFullYear()).substring(2);
    const monthStr = String(today.getMonth() + 1).padStart(2, '0');
    const dateStr = String(today.getDate()).padStart(2, '0');

    const createdReview: Review = {
      id: `rev-custom-${Date.now()}`,
      productId: selectedProductId,
      productName: matchedProduct.name,
      rating: newRating,
      content: newContent,
      author: newAuthor,
      date: `${yearStr}.${monthStr}.${dateStr}`,
      image: products[uploadedImageIndex]?.image || matchedProduct.image,
      avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 99999)}?w=100&h=100&fit=crop`
    };

    onAddReview(createdReview);
    
    // Clear form
    setNewAuthor('');
    setNewContent('');
    setIsFormOpen(false);
  };

  return (
    <section id="reviews" className="py-20 md:py-24 bg-white font-sans border-b border-sereniq-rose/30" data-purpose="customer-reviews">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-[140px]">
        
        {/* Title */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl font-light text-center mb-4 font-maru text-sereniq-brown"
          >
            고객 후기
          </motion.h2>
          <p className="text-xs sm:text-sm text-sereniq-gray max-w-none mx-auto whitespace-nowrap break-keep">
            세레니크를 경험하신 실제 구매 고객분들이 작성증명해주신 투명하고 솔직한 기록입니다.
          </p>
        </div>

        {/* Filters and Review Submission Actions */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10 pb-6 border-b border-sereniq-rose/40 font-medium">
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
            {/* Filter by Product */}
            <div className="flex items-center gap-2 bg-sereniq-rose/20 rounded px-3 py-1.5 border border-sereniq-rose/50">
              <SlidersHorizontal className="w-3.5 h-3.5 text-sereniq-pink" />
              <select
                value={filterProductId}
                onChange={(e) => setFilterProductId(e.target.value)}
                className="bg-transparent border-none pr-6 focus:ring-0 text-[11px] cursor-pointer"
              >
                <option value="all">모든 제품 후기</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            {/* Filter by Rating */}
            <div className="flex items-center gap-2 bg-sereniq-rose/20 rounded px-3 py-1.5 border border-sereniq-rose/50">
              <Star className="w-3.5 h-3.5 text-sereniq-pink fill-sereniq-pink" />
              <select
                value={filterRating}
                onChange={(e) => setFilterRating(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                className="bg-transparent border-none pr-6 focus:ring-0 text-[11px] cursor-pointer"
              >
                <option value="all">모든 별점</option>
                <option value="5">★ 5점만</option>
                <option value="4">★ 4점 이하</option>
              </select>
            </div>
          </div>

          <button
            id="write-review-btn"
            onClick={() => setIsFormOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-sereniq-brown text-white hover:bg-sereniq-brown/90 transition-colors rounded text-xs focus:ring-1 focus:ring-sereniq-pink cursor-pointer"
          >
            <MessageSquarePlus className="w-4 h-4" />
            후기 작성하기
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredReviews.length > 0 ? (
              filteredReviews.map((rev) => {
                const correspondingProduct = products.find((p) => p.id === rev.productId);

                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    key={rev.id}
                    className="flex flex-col h-full bg-white border border-sereniq-rose/10 hover:border-sereniq-pink/30 hover:shadow-lg hover:shadow-sereniq-brown/5 p-4 rounded-xl transition-all"
                  >
                    {/* Visual Container */}
                    <div className="aspect-square overflow-hidden rounded-lg mb-4 bg-sereniq-rose/10 border border-sereniq-rose/20 relative">
                      <img
                        src={rev.image}
                        alt="Reviewed product appearance"
                        className="w-full h-full object-cover select-none"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Star Rating Rendering */}
                    <div className="flex text-[#4B3B3D] text-xs mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={`text-sm ${
                            i < rev.rating ? 'text-sereniq-pink font-semibold' : 'text-sereniq-rose'
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>

                    {/* Content text */}
                    <p className="text-[13px] text-sereniq-brown leading-relaxed mb-3 line-clamp-4 flex-grow font-normal">
                      {rev.content}
                    </p>

                    {/* Timestamp */}
                    <p className="text-[10px] text-sereniq-gray/60 mb-4 tracking-wider">
                      {rev.date} 작성 | 구매자 {rev.author}
                    </p>

                    {/* Linked product summary info strip */}
                    {correspondingProduct && (
                      <div
                        onClick={() => onOpenProduct(correspondingProduct)}
                        className="mt-auto pt-4 border-t border-sereniq-rose/50 flex items-center gap-3 cursor-pointer group"
                      >
                        <img
                          src={correspondingProduct.image}
                          alt={correspondingProduct.name}
                          className="w-8 h-8 rounded-full border border-sereniq-rose object-cover bg-sereniq-rose/30"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-[11px] font-bold text-sereniq-brown truncate group-hover:text-sereniq-pink transition-colors">
                            {correspondingProduct.name}
                          </p>
                          <div className="flex items-center gap-1 text-[9px] text-sereniq-gray">
                            <span className="text-sereniq-pink">★</span> 5.0 | 구매만족 99%
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })
            ) : (
              <div className="col-span-full py-16 text-center text-sm text-sereniq-gray bg-sereniq-rose/10 rounded-xl">
                지정한 조건에 매칭되는 고객 후기가 아직 존재하지 않습니다.
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* NEW REVIEW COMPOSITION DIALOG MODAL */}
        <AnimatePresence>
          {isFormOpen && (
            <>
              {/* Backing Sheet */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsFormOpen(false)}
                className="fixed inset-0 bg-black z-50 pointer-events-auto"
              />

              {/* Form Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="fixed inset-x-4 max-w-lg mx-auto top-[10%] bottom-[10%] my-auto h-fit bg-white rounded-xl shadow-2xl z-50 p-6 sm:p-8 font-sans border border-sereniq-rose overflow-y-auto"
              >
                <div className="flex justify-between items-center pb-4 mb-5 border-b border-sereniq-rose">
                  <h3 className="font-bold text-base flex items-center gap-2 text-sereniq-brown font-serif">
                    <Sparkles className="w-5 h-5 text-sereniq-pink" />
                    후기 남기기
                  </h3>
                  <button onClick={() => setIsFormOpen(false)} className="p-1.5 hover:bg-sereniq-rose rounded-full cursor-pointer">
                    <Check className="w-4 h-4 text-sereniq-gray rotate-45" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold">
                  <div>
                    <label className="text-sereniq-brown/80 mb-1.5 block">작성자 성함</label>
                    <input
                      type="text"
                      required
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      placeholder="예시: 이지안"
                      className="w-full bg-sereniq-rose/20 border border-sereniq-rose rounded px-3 py-2 text-sereniq-brown focus:ring-1 focus:ring-sereniq-pink font-medium text-xs focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-sereniq-brown/80 mb-1.5 block">제품 선택</label>
                    <select
                      value={selectedProductId}
                      onChange={(e) => setSelectedProductId(e.target.value)}
                      className="w-full bg-sereniq-rose/20 border border-sereniq-rose rounded px-3 py-2 text-sereniq-brown focus:ring-1 focus:ring-sereniq-pink font-medium text-xs focus:outline-none"
                    >
                      {products.map((p) => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sereniq-brown/80 mb-2 block">후기 인증 사진 첨부 선택</label>
                    <div className="grid grid-cols-4 gap-2">
                      {products.map((p, index) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setUploadedImageIndex(index)}
                          className={`relative aspect-square border rounded overflow-hidden p-1 bg-white cursor-pointer ${
                            uploadedImageIndex === index
                              ? 'border-sereniq-pink ring-2 ring-sereniq-pink/40'
                              : 'border-sereniq-rose/60 hover:opacity-80'
                          }`}
                        >
                          <img src={p.image} alt={p.name} className="w-full h-full object-cover rounded" />
                          {uploadedImageIndex === index && (
                            <span className="absolute bottom-1 right-1 p-0.5 bg-sereniq-pink text-sereniq-brown rounded-full">
                              <Check className="w-2.5 h-2.5 font-bold" />
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sereniq-brown/80 mb-1.5 block">피부 만족도 선택</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          className="p-1 hover:scale-110 transition-transform cursor-pointer"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= newRating
                                ? 'text-sereniq-pink fill-sereniq-pink'
                                : 'text-sereniq-rose/60'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sereniq-brown/80 mb-1.5 block">상세 리얼 리뷰 내용</label>
                    <textarea
                      required
                      value={newContent}
                      onChange={(e) => setNewContent(e.target.value)}
                      placeholder="제품 사용감, 수분 보습력, 피부결 진정 후 감정을 솔직하게 기재해 보세요..."
                      rows={4}
                      className="w-full bg-sereniq-rose/20 border border-sereniq-rose rounded px-3 py-2 text-sereniq-brown focus:ring-1 focus:ring-sereniq-pink font-medium text-xs focus:outline-none resize-none leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-sereniq-brown hover:bg-sereniq-brown/90 text-white rounded text-xs font-bold tracking-widest uppercase transition-colors pt-3.5 cursor-pointer"
                  >
                    소중한 기록 등록완료
                  </button>
                </form>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
