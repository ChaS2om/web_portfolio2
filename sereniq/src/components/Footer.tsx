import React, { useState } from 'react';
import { BRAND_LOGO_DARK } from '../data';
import { Send, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [newsJoined, setNewsJoined] = useState(false);

  const handleNewsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      alert("올바른 이메일 주소를 입력해 주세요.");
      return;
    }
    setNewsJoined(true);
    setTimeout(() => {
      setEmail('');
    }, 3000);
  };

  const scrollToGreenRecycle = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById('green-recycle');
    if (!target) return;

    const headerOffset = 76;
    const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
      top: elementPosition - headerOffset,
      behavior: 'smooth',
    });
  };

  return (
    <footer id="footer" className="bg-sereniq-rose py-16 md:py-20 font-sans border-t border-sereniq-pink/30 text-sereniq-brown" data-purpose="footer">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-[140px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand Info & Logo */}
          <div className="space-y-6">
            <div className="logo mb-4">
              <img
                src={BRAND_LOGO_DARK}
                alt="SERENIQ footer logo"
                className="h-10 md:h-12 w-auto object-contain optimized-image select-none"
              />
            </div>
            <p className="text-xs md:text-sm text-sereniq-brown/80 leading-loose font-medium">
              Soft, Clean, Premium.<br />
              진정한 본연의 투명함을 선사하는 미니멀 프리미엄 뷰티.
            </p>
          </div>

          {/* Column 2: Explore links */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold mb-6 text-sereniq-brown">
              Explore
            </h4>
            <ul className="space-y-4 text-xs md:text-sm font-semibold">
              <li>
                <a href="#philosophy" className="hover:text-sereniq-pink transition-colors cursor-pointer">
                  Our Story (브랜드 가치)
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-sereniq-pink transition-colors cursor-pointer">
                  Shop All (전체 스킨케어)
                </a>
              </li>
              <li>
                <a href="#showcase" className="hover:text-sereniq-pink transition-colors cursor-pointer">
                  Ingredients (착한 성분 도감)
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-sereniq-pink transition-colors cursor-pointer">
                  Review Center (솔직한 후기)
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Care links */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold mb-6 text-sereniq-brown">
              Care
            </h4>
            <ul className="space-y-4 text-xs md:text-sm font-semibold">
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); alert("1:1 온오프라인 스킨 진단 서비스가 론칭 준비 중입니다."); }} className="hover:text-sereniq-pink transition-colors">
                  Contact Us (고객 상담 접수)
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); alert("전 제품 우체국 안전 신속 안심 택배로 안전 배송됩니다."); }} className="hover:text-sereniq-pink transition-colors">
                  Shipping & Returns (배송 및 교환 안내)
                </a>
              </li>
              <li>
                <a href="#green-recycle" onClick={scrollToGreenRecycle} className="hover:text-sereniq-pink transition-colors">
                  Sustainability (그린 재생 아카이브)
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); alert("개인정보처리방침에 서명 동의가 상주 적용되어 있습니다."); }} className="hover:text-sereniq-pink transition-colors">
                  Privacy Policy (개인 정보 보호 방침)
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold mb-6 text-sereniq-brown">
              The Journal
            </h4>
            <p className="text-xs md:text-sm text-sereniq-brown/85 mb-6 leading-relaxed font-medium">
              뉴스레터 구독을 통해 세레니크의 신선한 소식과 비공개 프라이빗 할인 혜택을 수령해 보세요.
            </p>
            
            <AnimatePresence mode="wait">
              {newsJoined ? (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="bg-white/80 border border-sereniq-pink/60 px-4 py-3 rounded text-[11px] text-[#4B3B3D] flex items-center gap-2 font-bold"
                >
                  <Check className="w-4 h-4 text-sereniq-pink flex-shrink-0" strokeWidth={3} />
                  저널 구독 완료! 환영 기프트가 발송되었습니다.
                </motion.div>
              ) : (
                <form onSubmit={handleNewsSubmit} className="flex border-b border-sereniq-brown/30 pb-2 bg-transparent justify-between items-center mr-1">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="이메일 주소 입력"
                    className="bg-transparent border-none focus:ring-0 text-xs w-full placeholder:text-sereniq-brown/40 focus:outline-none focus:border-none font-medium px-1"
                  />
                  <button
                    type="submit"
                    className="text-xs uppercase tracking-widest font-bold ml-2 p-1.5 hover:text-sereniq-pink transition-colors cursor-pointer"
                    aria-label="Submit email to newsletter"
                  >
                    Join
                  </button>
                </form>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Outer bottom row */}
        <div className="pt-12 border-t border-sereniq-brown/10 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-sereniq-brown/50 gap-4">
          <p className="text-center md:text-left">
            © 2026 SERENIQ COSMETICS. ALL RIGHTS RESERVED.
          </p>
          <div className="flex space-x-6">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-sereniq-brown transition-colors">
              Instagram
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="hover:text-sereniq-brown transition-colors">
              Pinterest
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-sereniq-brown transition-colors">
              YouTube
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
