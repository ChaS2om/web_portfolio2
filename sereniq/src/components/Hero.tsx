import React, { useState, useEffect, useRef } from 'react';
import { HERO_BACKGROUND, HERO_IMAGES, BRAND_STORY_IMAGE } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, X, Sparkles, ShieldCheck, Leaf, Heart, ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
}

export default function Hero({ onExploreClick }: HeroProps) {
  const [modalType, setModalType] = useState<'story' | 'guide' | null>(null);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 = next, -1 = prev

  const total = HERO_IMAGES.length;

  function handleNext(e?: React.MouseEvent) {
    if (e) { e.stopPropagation(); e.preventDefault(); }
    setDirection(1);
    setIndex((i) => (i + 1) % total);
    // reset progress when user navigates
    progressRef.current = 0;
    setProgress(0);
    setModalType(null);
  }

  function handlePrev(e?: React.MouseEvent) {
    if (e) { e.stopPropagation(); e.preventDefault(); }
    setDirection(-1);
    setIndex((i) => (i - 1 + total) % total);
    // reset progress when user navigates
    progressRef.current = 0;
    setProgress(0);
    setModalType(null);
  }

  // Auto-play progress (5s) and visual progress bar
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    // reset progress when index changes
    progressRef.current = 0;
    setProgress(0);

    // clear existing
    if (intervalRef.current) window.clearInterval(intervalRef.current);

    // only autoplay when more than one image
    if (total > 1) {
      intervalRef.current = window.setInterval(() => {
        progressRef.current += 100 / 50; // 100ms * 50 = 5000ms
        if (progressRef.current >= 100) {
          progressRef.current = 0;
          setProgress(0);
          // advance slide
          setDirection(1);
          setIndex((i) => (i + 1) % total);
        } else {
          setProgress(progressRef.current);
        }
      }, 100);
    }

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [index, total]);

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden bg-white mt-[76px] select-none"
      data-purpose="hero-banner"
    >
      {/* 
        CONTAINER for Hero Image.
        Renders the pristine original campaign banner exactly as uploaded by the user.
      */}
      <div className="w-full relative aspect-[1915/821] overflow-hidden bg-stone-50 animate-fade-in">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ x: direction >= 0 ? 80 : -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction >= 0 ? -80 : 80, opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="w-full h-full absolute inset-0"
          >
            <img
              src={HERO_IMAGES[index]}
              alt={`SERENIQ Luxurious Campaign ${index + 1}`}
              className="w-full h-full object-cover object-center select-none animate-scale-subtle"
              style={{
                imageRendering: '-webkit-optimize-contrast',
                filter: 'contrast(1.02) saturate(1.02)',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
              }}
              referrerPolicy="no-referrer"
            />

            {/* Floating "자세히 보기" Buttons - moved inside motion.div to animate with image */}
            {index === 0 && (
              <div className="absolute bottom-[17.5%] left-[calc(6.2%-2px)] z-20 flex justify-start items-center w-auto">
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setModalType('story');
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-[30px] py-[9px] bg-[#E3D7FA] hover:bg-[#D5C2F7] text-[#3C2D4D] text-[9px] sm:text-xs md:text-sm font-semibold tracking-wider rounded-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
                >
                  <span>자세히 보기</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </motion.button>
              </div>
            )}
            {index === 1 && (
              <div
                className="absolute z-20 flex justify-start items-center w-auto"
                style={{ bottom: 'calc(17.5% - 12px)', left: 'calc(6.2% + 28px)' }}
              >
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setModalType('guide');
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-[30px] py-[9px] bg-[#E3D7FA] hover:bg-[#D5C2F7] text-[#3C2D4D] text-[9px] sm:text-xs md:text-sm font-semibold tracking-wider rounded-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
                >
                  <span>자세히 보기</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </motion.button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Arrows */}
        <button
          onClick={handlePrev}
          aria-label="이전 슬라이드"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/80 hover:bg-white shadow-md transition"
        >
          <ChevronLeft className="w-6 h-6 text-sereniq-brown" />
        </button>

        {/* Indicators (center bottom) */}
        <div className="absolute left-0 right-0 bottom-6 z-30 flex justify-center items-center gap-2">
          {HERO_IMAGES.map((_, i) => (
            <div key={i} className="w-12 sm:w-16 h-1.5 bg-white/30 rounded-full overflow-hidden cursor-pointer" onClick={() => { setIndex(i); progressRef.current = 0; setProgress(0); }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: i === index ? `${progress}%` : '100%',
                  backgroundColor: i === index ? '#cd9cdc' : 'rgba(255,255,255,0.4)',
                }}
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleNext}
          aria-label="다음 슬라이드"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/80 hover:bg-white shadow-md transition"
        >
          <ChevronRight className="w-6 h-6 text-sereniq-brown" />
        </button>

        {/* Delicate premium shading scrim */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/5 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* FULLSTORY DETAIL DIALOG / BRAND DIALOG SPEC */}
      <AnimatePresence>
        {modalType && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative border border-sereniq-pink/10"
            >
              
              {/* Top Sticky Header */}
              <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-neutral-100 z-10">
                <div className="flex items-center gap-1.5">
                  <span className="font-serif tracking-[0.2em] text-xs text-sereniq-pink font-extrabold uppercase">
                    {modalType === 'story' ? 'SERENIQ PHILOSOPHY ARCHIVE' : '간편 제품 사용 가이드'}
                  </span>
                </div>
                <button
                  onClick={() => setModalType(null)}
                  className="p-1.5 rounded-full hover:bg-neutral-150 transition-colors text-sereniq-brown"
                  aria-label="닫기"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body Contents */}
              <div className="p-6 md:p-8 space-y-8 text-sereniq-brown">
                
                {/* Visual Banner */}
                <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-stone-50">
                  <img
                    src={BRAND_STORY_IMAGE}
                    alt="Sereniq brand aesthetic values"
                    className="w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-neutral-950/20" />
                </div>

                {modalType === 'story' ? (
                  <>
                    {/* Main Story Blocks */}
                    <div className="space-y-4">
                      <h3 className="font-maru text-xl md:text-2xl font-light text-sereniq-brown tracking-wide">
                        과한 것은 완벽히 비우고,<br />
                        <span className="font-semibold text-sereniq-pink">가장 깊고 평온한 고유함만</span>
                      </h3>
                      
                      <p className="text-xs md:text-sm text-sereniq-brown/80 leading-relaxed font-medium">
                        세레니크(SERENIQ)는 복잡하고 피로해진 현대 도시인들이 바라는 진정한 휴식과 내추럴 오라(Aura)를 완성하기 위해 탄생한 미니멀 프리미엄 뷰티 하우스입니다. 유기물이나 위험 성분이 될 수 있는 모든 화학적 가이드를 철저하게 최소화하고, 자연의 순수 진정 시너지 원천을 완벽하고 조화롭게 팽창시킵니다.
                      </p>
                    </div>

                    {/* Core Brand Manifesto Values Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                      <div className="p-4 bg-[#FFF8F8] rounded-2xl border border-sereniq-pink/10 space-y-2">
                        <Sparkles className="w-5 h-5 text-sereniq-pink" />
                        <h4 className="text-xs font-bold text-sereniq-brown tracking-wide">크리스탈 포뮬러</h4>
                        <p className="text-[11px] text-sereniq-brown/70 leading-relaxed">
                          병풀 추출물을 물 대신 풍부하게 함유하여, 가장 투명하고 차분한 피부 에센스를 구현합니다.
                        </p>
                      </div>

                      <div className="p-4 bg-[#FFF8F8] rounded-2xl border border-sereniq-pink/10 space-y-2">
                        <ShieldCheck className="w-5 h-5 text-sereniq-pink" />
                        <h4 className="text-xs font-bold text-sereniq-brown tracking-wide">철저한 안심 검증</h4>
                        <p className="text-[11px] text-sereniq-brown/70 leading-relaxed">
                          모든 스킨케어 품목은 저자극 임상 및 하이포알레르제닉 가이드 승인을 완료하였습니다.
                        </p>
                      </div>

                      <div className="p-4 bg-[#FFF8F8] rounded-2xl border border-sereniq-pink/10 space-y-2">
                        <Leaf className="w-5 h-5 text-sereniq-pink" />
                        <h4 className="text-xs font-bold text-sereniq-brown tracking-wide">에코 서스테이너블</h4>
                        <p className="text-[11px] text-sereniq-brown/70 leading-relaxed">
                          재활용 15등급 이상의 최고급 보틀과 콩기름 인쇄 패키지, 비유기 용기 순환 트랙을 도입합니다.
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-maru text-xl md:text-2xl font-light text-sereniq-brown tracking-wide">
                        세레니크 제품 사용 가이드
                      </h3>
                      <p className="text-xs md:text-sm text-sereniq-brown/80 leading-relaxed font-medium">
                        간단한 순서로 더 부드럽고 촉촉한 피부를 완성해 보세요.
                      </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="p-4 bg-[#FFF8F8] rounded-3xl border border-sereniq-pink/10">
                        <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-sereniq-pink mb-2">STEP 1</p>
                        <p className="text-[12px] text-sereniq-brown/80 leading-relaxed">
                          부드러운 클렌저로 메이크업과 노폐물을 말끔하게 세정합니다.
                        </p>
                      </div>
                      <div className="p-4 bg-[#FFF8F8] rounded-3xl border border-sereniq-pink/10">
                        <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-sereniq-pink mb-2">STEP 2</p>
                        <p className="text-[12px] text-sereniq-brown/80 leading-relaxed">
                          토너로 피부 결을 정돈하고 다음 단계 흡수를 돕습니다.
                        </p>
                      </div>
                      <div className="p-4 bg-[#FFF8F8] rounded-3xl border border-sereniq-pink/10">
                        <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-sereniq-pink mb-2">STEP 3</p>
                        <p className="text-[12px] text-sereniq-brown/80 leading-relaxed">
                          앰플을 소량 덜어 피부결을 따라 부드럽게 펴 발라 흡수시킵니다.
                        </p>
                      </div>
                      <div className="p-4 bg-[#FFF8F8] rounded-3xl border border-sereniq-pink/10">
                        <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-sereniq-pink mb-2">STEP 4</p>
                        <p className="text-[12px] text-sereniq-brown/80 leading-relaxed">
                          마지막으로 크림을 도톰하게 올려 촉촉한 보호막을 완성합니다.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Bottom interactive action button */}
                <div className="pt-4 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-neutral-100">
                  <p className="text-[11px] md:text-xs text-neutral-400 font-medium">
                    © SERENIQ COSMETICS • Soft, Clean, Premium skincare.
                  </p>
                  <div className="flex gap-2 w-full md:w-auto">
                    <button
                      onClick={() => {
                        setModalType(null);
                        onExploreClick(); // Scroll directly to products
                      }}
                      className="px-5 py-2.5 bg-sereniq-brown hover:bg-sereniq-pink text-white text-xs font-bold tracking-wider rounded-xl transition-all w-full md:w-auto text-center"
                    >
                      전체 컬렉션 쇼핑하기
                    </button>
                    <button
                      onClick={() => setModalType(null)}
                      className="px-5 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-600 text-xs font-bold tracking-wider rounded-xl transition-all w-full md:w-auto text-center"
                    >
                      창 닫기
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

