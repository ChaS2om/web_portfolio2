import React, { useState, useEffect } from 'react';
import { CartItem } from '../types';
import { X, Trash2, ShieldCheck, Ticket, CreditCard, ChevronRight, Truck, CheckCircle, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'shipping' | 'payment' | 'completed'>('cart');
  
  // Coupon State
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0); // decimal multiply rate
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  // Shipping Form State
  const [recipient, setRecipient] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [requirements, setRequirements] = useState('');

  // Payment Form State
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isPaying, setIsPaying] = useState(false);
  
  // Generated Order Number for final complete screen
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Cart Subtotals
  const originalSubtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const discountTotal = originalSubtotal * appliedDiscount;
  const shippingFee = originalSubtotal >= 50000 || originalSubtotal === 0 ? 0 : 3000;
  const finalTotal = originalSubtotal - discountTotal + shippingFee;

  // Handle Coupon Submit
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');
    
    const codeNormalized = couponCode.trim().toUpperCase();
    if (codeNormalized === 'SERENIQVIP10') {
      setAppliedDiscount(0.10); // 10% off
      setCouponSuccess('VIP 10% 특별 시즌 할인 쿠폰이 적용되었습니다.');
    } else if (codeNormalized === 'SERENIQVIP' || codeNormalized === 'WELCOME') {
      setAppliedDiscount(0.05); // 5% off
      setCouponSuccess('세레니크 수딩 5% 웰컴 혜택이 적용되었습니다.');
    } else {
      setCouponError('유효하지 않은 쿠폰 코드입니다. 코드명을 다시 한 번 확인하세요.');
    }
  };

  // Card Number auto formatting handler
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/\D/g, '');
    const chunked = rawVal.match(/.{1,4}/g);
    const formatted = chunked ? chunked.join('-').substring(0, 19) : rawVal;
    setCardNumber(formatted);
  };

  // Process Checkout submission
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient || !address || !phone) {
      alert("배송 정보를 먼저 확인해 주세요.");
      setCheckoutStep('shipping');
      return;
    }

    setIsPaying(true);

    // Simulate luxury packaging/merchant gateway transaction step
    setTimeout(() => {
      setIsPaying(false);
      
      const randNum = Math.floor(1000 + Math.random() * 9000);
      const randHex = Math.floor(100000 + Math.random() * 899999);
      setOrderId(`SRN-20260601-${randNum}-${randHex}`);
      
      setCheckoutStep('completed');
    }, 2500);
  };

  const handleFinishCheckout = () => {
    onClearCart();
    setCheckoutStep('cart');
    setAppliedDiscount(0);
    setCouponCode('');
    setCouponSuccess('');
    setRecipient('');
    setPhone('');
    setAddress('');
    setRequirements('');
    setCardNumber('');
    setCardHolder('');
    setCardExpiry('');
    setCardCvv('');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden font-sans">
        
        {/* Dark blur backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          onClick={() => checkoutStep !== 'completed' && onClose()}
          className="fixed inset-0 bg-black cursor-pointer"
        />

        {/* Sliding Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween', duration: 0.35 }}
          className="absolute top-0 right-0 w-full sm:w-[460px] h-full bg-white shadow-2xl flex flex-col justify-between"
        >
          {/* HEADER HEADER SPAN */}
          <div className="p-6 border-b border-sereniq-rose flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-base text-sereniq-brown tracking-widest uppercase">
                {checkoutStep === 'cart' && "장바구니 SHOPPING BAG"}
                {checkoutStep === 'shipping' && "배송지 입력 SHIPPING"}
                {checkoutStep === 'payment' && "결제 정보 PAYMENT"}
                {checkoutStep === 'completed' && "오더 완료 ORDER COMPLETE"}
              </h3>
              {checkoutStep !== 'completed' && (
                <p className="text-[10px] text-sereniq-gray uppercase tracking-widest mt-0.5">
                  Step {checkoutStep === 'cart' ? '1/3' : checkoutStep === 'shipping' ? '2/3' : '3/3'}
                </p>
              )}
            </div>
            {checkoutStep !== 'completed' && (
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-sereniq-rose text-sereniq-brown rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* DYNAMIC SCROLLING BODY AREA */}
          <div className="flex-1 overflow-y-auto p-6">
            
            {/* STEP 1: CART LIST OVERVIEW */}
            {checkoutStep === 'cart' && (
              <div className="space-y-6">
                {cartItems.length > 0 ? (
                  <>
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div key={item.product.id} className="flex gap-4 p-3 bg-sereniq-rose/10 border border-sereniq-rose/50 rounded-lg">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-16 h-16 object-cover rounded bg-white border border-sereniq-rose/40"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold text-sereniq-brown truncate">{item.product.name}</h4>
                            <p className="text-[10px] text-sereniq-gray/70 mt-0.5 font-medium">{item.product.volume}</p>
                            
                            {/* Quantity buttons */}
                            <div className="flex items-center justify-between mt-2.5">
                              <div className="flex items-center border border-sereniq-rose/80 rounded bg-white overflow-hidden text-sereniq-brown">
                                <button
                                  onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                                  className="px-2 py-0.5 hover:bg-sereniq-rose/30 text-xs font-bold transition-colors cursor-pointer"
                                >
                                  -
                                </button>
                                <span className="px-2.5 text-[11px] font-bold font-mono">{item.quantity}</span>
                                <button
                                  onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                                  className="px-2 py-0.5 hover:bg-sereniq-rose/30 text-xs font-bold transition-colors cursor-pointer"
                                >
                                  +
                                </button>
                              </div>
                              
                              <span className="text-xs font-bold text-sereniq-brown">
                                ₩{(item.product.price * item.quantity).toLocaleString()}
                              </span>
                            </div>
                          </div>
                          
                          {/* Trash button */}
                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="p-1 self-start hover:text-red-500 hover:bg-red-50 text-sereniq-gray/60 rounded transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Promo Coupon Application Form */}
                    <div className="border-t border-b border-sereniq-rose/50 py-5 my-5 text-xs">
                      <form onSubmit={handleApplyCoupon} className="flex gap-2">
                        <div className="relative flex-1">
                          <Ticket className="w-4 h-4 absolute left-3 top-2.5 text-sereniq-gray/60" />
                          <input
                            type="text"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            placeholder="쿠폰 코드 입력 (예: SERENIQVIP10)"
                            className="w-full pl-9 pr-3 py-2 border border-sereniq-rose bg-sereniq-rose/10 text-sereniq-brown placeholder:text-sereniq-gray/40 font-medium rounded focus:outline-none focus:ring-1 focus:ring-sereniq-pink text-[11px]"
                          />
                        </div>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-sereniq-brown hover:bg-sereniq-brown/95 text-white font-bold tracking-wider rounded uppercase transition-colors cursor-pointer"
                        >
                          적용
                        </button>
                      </form>

                      {/* Coupon Status Message responses */}
                      {couponError && <p className="text-[11px] text-red-500 font-medium mt-2">{couponError}</p>}
                      {couponSuccess && <p className="text-[11px] text-[#4B3B3D] bg-sereniq-pink/30 border border-sereniq-pink p-2 rounded font-medium mt-2">{couponSuccess}</p>}
                    </div>
                  </>
                ) : (
                  <div className="py-20 text-center text-sereniq-gray">
                    <Package className="w-12 h-12 stroke-[1] mx-auto opacity-50 mb-4" />
                    <p className="text-sm font-medium">장바구니가 비어 있습니다.</p>
                  </div>
                )}
              </div>
            )}

            {/* STEP 2: SHIPPING DETAILS FORM */}
            {checkoutStep === 'shipping' && (
              <form className="space-y-4 text-xs font-semibold">
                <div>
                  <label className="text-sereniq-brown/80 mb-1.5 block">수령인 성함 (Recipient)</label>
                  <input
                    type="text"
                    required
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="수령인의 실명을 입력해 주세요."
                    className="w-full bg-sereniq-rose/20 border border-sereniq-rose rounded px-3 py-2 text-sereniq-brown focus:ring-1 focus:ring-sereniq-pink font-medium text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-sereniq-brown/80 mb-1.5 block">연락처 (Phone)</label>
                  <input
                    type="phone"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="예시: 010-1234-5678"
                    className="w-full bg-sereniq-rose/20 border border-sereniq-rose rounded px-3 py-2 text-sereniq-brown focus:ring-1 focus:ring-sereniq-pink font-medium text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-sereniq-brown/80 mb-1.5 block">배송지 주소 (Delivery Address)</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="도로명 주소 및 상세 호수를 입력해 주세요."
                    className="w-full bg-sereniq-rose/20 border border-sereniq-rose rounded px-3 py-2 text-sereniq-brown focus:ring-1 focus:ring-sereniq-pink font-medium text-xs focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setAddress('서울특별시 강남구 테헤란로 123 세레니크 타워 5층')}
                    className="mt-1.5 text-[10px] text-sereniq-pink text-right hover:underline font-bold block ml-auto cursor-pointer"
                  >
                    + 시뮬레이션 주소 자동 기입
                  </button>
                </div>

                <div>
                  <label className="text-sereniq-brown/80 mb-1.5 block">배송 요청 서항 (Memo)</label>
                  <input
                    type="text"
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                    placeholder="부재 시 경비실에 맡겨주세요 등..."
                    className="w-full bg-sereniq-rose/20 border border-sereniq-rose rounded px-3 py-2 text-sereniq-brown focus:ring-1 focus:ring-sereniq-pink font-medium text-xs focus:outline-none"
                  />
                </div>
              </form>
            )}

            {/* STEP 3: PAYMENT GATEWAY CREDIT CARD METHOD */}
            {checkoutStep === 'payment' && (
              <div className="space-y-6">
                {/* Virtual Bill Summary box */}
                <div className="bg-sereniq-rose/20 border border-sereniq-rose p-4 rounded-lg text-xs space-y-2">
                  <div className="flex justify-between font-medium">
                    <span className="text-sereniq-gray">배송 물건명</span>
                    <span className="font-bold text-[#4B3B3D] truncate max-w-[200px]">
                      {cartItems[0]?.product.name} {cartItems.length > 1 ? `외 ${cartItems.length - 1}건` : ''}
                    </span>
                  </div>
                  <div className="flex justify-between font-medium text-[11px]">
                    <span className="text-sereniq-gray">수령인 / 연락처</span>
                    <span className="text-sereniq-brown">{recipient} / {phone}</span>
                  </div>
                  <div className="flex justify-between font-medium text-[11px]">
                    <span className="text-sereniq-gray">수령 주소</span>
                    <span className="text-sereniq-brown text-right truncate max-w-[200px]">{address}</span>
                  </div>
                </div>

                {isPaying ? (
                  <div className="py-12 text-center space-y-4">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                      className="w-12 h-12 border-4 border-sereniq-pink border-t-sereniq-brown rounded-full mx-auto"
                    />
                    <p className="text-xs text-sereniq-gray font-bold tracking-widest uppercase">
                      세레니크 프리미엄 친환경 메신징 및 결제 진행 중...
                    </p>
                    <p className="text-[10px] text-sereniq-gray/70">안전한 카드 트랜잭션이 활성화되었습니다.</p>
                  </div>
                ) : (
                  <form onSubmit={handlePaymentSubmit} className="space-y-4 text-xs font-semibold">
                    <div className="bg-linear-to-tr from-sereniq-brown to-[#7F7374] p-5 h-[160px] text-white rounded-xl shadow-lg flex flex-col justify-between mb-2">
                      <div className="flex justify-between items-start">
                        <span className="font-serif italic tracking-widest text-sm font-bold">SERENIQ PLATINUM</span>
                        <CreditCard className="w-6 h-6 text-sereniq-pink stroke-[1.5]" />
                      </div>
                      <div>
                        <p className="font-mono tracking-widest text-[14px]">
                          {cardNumber || '•••• - •••• - •••• - ••••'}
                        </p>
                        <div className="flex justify-between items-end mt-4 text-[9px] uppercase tracking-widest font-mono text-white/80">
                          <div>
                            <p className="scale-75 origin-left mb-0.5 text-white/50">Card Holder</p>
                            <p>{cardHolder || 'NAME HERE'}</p>
                          </div>
                          <div>
                            <p className="scale-75 origin-right mb-0.5 text-white/50">Expiry</p>
                            <p>{cardExpiry || 'MM / YY'}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-sereniq-brown/80 mb-1.5 block">현용 카드주 이름 (Cardholder Name)</label>
                      <input
                        type="text"
                        required
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                        placeholder="예시: HONG GILDONG"
                        className="w-full bg-sereniq-rose/20 border border-sereniq-rose rounded px-3 py-2 text-sereniq-brown focus:ring-1 focus:ring-sereniq-pink font-medium text-xs focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-sereniq-brown/80 mb-1.5 block">일련 카드 번호 (Card Number)</label>
                      <input
                        type="text"
                        required
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder="0000-0000-0000-0000"
                        className="w-full bg-sereniq-rose/20 border border-sereniq-rose rounded px-3 py-2 text-sereniq-brown focus:ring-1 focus:ring-sereniq-pink font-medium text-xs focus:outline-none font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sereniq-brown/80 mb-1.5 block">만료 월/연 (Expiry Date)</label>
                        <input
                          type="text"
                          required
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/YY"
                          className="w-full bg-sereniq-rose/20 border border-sereniq-rose rounded px-3 py-2 text-sereniq-brown focus:ring-1 focus:ring-sereniq-pink font-medium text-xs focus:outline-none font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-sereniq-brown/80 mb-1.5 block">카드 뒷면 세자리 (CVV)</label>
                        <input
                          type="password"
                          required
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').substring(0, 3))}
                          placeholder="3-digit"
                          className="w-full bg-sereniq-rose/20 border border-sereniq-rose rounded px-3 py-2 text-sereniq-brown focus:ring-1 focus:ring-sereniq-pink font-medium text-xs focus:outline-none font-mono"
                        />
                      </div>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* STEP 4: ORDER SUITE COMPLETED DISPLAY */}
            {checkoutStep === 'completed' && (
              <div className="py-12 text-center text-xs space-y-6">
                <div className="w-16 h-16 bg-sereniq-rose rounded-full flex items-center justify-center mx-auto mb-4 border border-sereniq-pink text-sereniq-pink">
                  <CheckCircle className="w-10 h-10 stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-sereniq-brown">맑은 피부 오더가 접수되었습니다!</h4>
                  <p className="text-[11px] text-sereniq-gray/95 mt-1.5">세레니크 스킨랩에서 신선하게 포장하여 보내드리겠습니다.</p>
                </div>

                <div className="bg-sereniq-rose/20 border border-sereniq-rose p-5 rounded-lg space-y-3 mx-2 text-left">
                  <div className="flex justify-between items-center text-[10px] pb-2 border-b border-sereniq-rose/50">
                    <span className="text-sereniq-gray">오더 트랙킹 번호</span>
                    <span className="font-mono font-bold text-sereniq-brown">{orderId}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-sereniq-gray">체결 결제 금액</span>
                    <span className="font-bold">₩{finalTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-sereniq-gray">수령인 성함</span>
                    <span className="font-semibold">{recipient} 님</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-sereniq-gray border-b border-transparent">배송 주소</span>
                    <span className="text-sereniq-brown text-right truncate max-w-[200px]">{address}</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-3 justify-center mb-1 text-sereniq-pink text-[11px] font-bold">
                    <Truck className="w-4 h-4 text-sereniq-pink" /> 3일 이내 신속 친환경 포장 택배 도출
                  </div>
                  <p className="text-[10px] text-sereniq-gray">탄소 저감 크라프트 종이 포장이 원칙적으로 적용됩니다.</p>
                </div>
              </div>
            )}

          </div>

          {/* FOOTER TOTAL BILL & CTA ACTION PANEL */}
          {cartItems.length > 0 && checkoutStep !== 'completed' && (
            <div className="p-6 bg-sereniq-rose/30 border-t border-sereniq-rose space-y-4 font-semibold text-xs text-sereniq-brown">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sereniq-gray">발생 소계 금액</span>
                  <span className="font-bold">₩{originalSubtotal.toLocaleString()}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-sereniq-pink text-[11px]">
                    <span className="flex items-center gap-1">특별 쿠폰 제휴 할인 ({(appliedDiscount * 100)}%)</span>
                    <span>- ₩{discountTotal.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-sereniq-gray">안전 기밀 배송비 (5만원 이상 무료)</span>
                  <span>{shippingFee === 0 ? "무료" : `₩${shippingFee.toLocaleString()}`}</span>
                </div>
                <div className="border-t border-sereniq-rose/50 pt-2 flex justify-between items-center text-sm">
                  <span className="font-serif uppercase tracking-widest text-sereniq-brown font-bold text-xs">최종 승인 금액</span>
                  <span className="text-base font-extrabold text-sereniq-brown font-sans">
                    ₩{finalTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Step Navigation Button triggers */}
              {checkoutStep === 'cart' && (
                <button
                  id="checkout-step-1-btn"
                  onClick={() => setCheckoutStep('shipping')}
                  className="w-full py-4 bg-sereniq-brown hover:bg-sereniq-brown/95 text-white rounded text-xs font-bold tracking-widest uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  배송 정보 입력하기
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}

              {checkoutStep === 'shipping' && (
                <div className="flex gap-2">
                  <button
                    onClick={() => setCheckoutStep('cart')}
                    className="w-1/3 py-3.5 border border-sereniq-brown text-sereniq-brown bg-white hover:bg-sereniq-rose/10 rounded text-xs font-bold tracking-widest uppercase transition-colors cursor-pointer"
                  >
                    이전
                  </button>
                  <button
                    onClick={() => {
                      if (!recipient || !phone || !address) {
                        alert("배송 정보를 모두 바르게 입력해 주세요.");
                        return;
                      }
                      setCheckoutStep('payment');
                    }}
                    className="flex-1 py-3.5 bg-sereniq-brown hover:bg-sereniq-brown/95 text-white rounded text-xs font-bold tracking-widest uppercase transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    결제 단계 이동
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {checkoutStep === 'payment' && (
                <div className="flex gap-2">
                  <button
                    onClick={() => setCheckoutStep('shipping')}
                    className="w-1/3 py-3.5 border border-sereniq-brown bg-white hover:bg-sereniq-rose/10 rounded text-xs font-bold tracking-widest uppercase transition-colors cursor-pointer"
                  >
                    이전
                  </button>
                  <button
                    onClick={handlePaymentSubmit}
                    disabled={!cardNumber || !cardExpiry || !cardHolder || !cardCvv}
                    className="flex-1 py-3.5 bg-sereniq-brown hover:bg-sereniq-brown/95 text-white rounded text-xs font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    ₩{finalTotal.toLocaleString()} 결제 완료하기
                  </button>
                </div>
              )}
            </div>
          )}

          {checkoutStep === 'completed' && (
            <div className="p-6 bg-white border-t border-sereniq-rose">
              <button
                id="close-completed-btn"
                onClick={handleFinishCheckout}
                className="w-full py-4 bg-sereniq-brown hover:bg-sereniq-brown/95 text-white rounded text-xs font-bold tracking-widest uppercase transition-colors cursor-pointer"
              >
                계속해서 쇼핑하기
              </button>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
