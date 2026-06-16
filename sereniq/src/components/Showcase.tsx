import React, { useState, useEffect } from 'react';
import { BRAND_STORY_IMAGE } from '../data';
import { Sparkles, Calendar, Heart, Shield, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Showcase() {
  const [isStoryOpen, setIsStoryOpen] = useState(false);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isStoryOpen) {
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      const scrollY = parseInt(document.body.style.top || '0', 10) * -1;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollY);
    }
    return () => {
      const scrollY = parseInt(document.body.style.top || '0', 10) * -1;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollY);
    };
  }, [isStoryOpen]);

  return (
    <>
      <section id="showcase" className="py-24 md:py-32 bg-white font-sans overflow-hidden border-b border-sereniq-rose/30" data-purpose="brand-mood">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-[140px] flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Large Creative Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, x: -20 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-3/5"
          >
            <div className="relative rounded overflow-hidden shadow-2xl group">
              <img
                src={BRAND_STORY_IMAGE}
                alt="Sereniq Calming Ampoule droplets essence splash campaign"
                className="w-full h-auto object-cover optimized-image select-none group-hover:scale-[1.02] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60 pointer-events-none" />
            </div>
          </motion.div>

          {/* Right Typography & Discovery block */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-2/5 text-left lg:pl-12"
          >
            <span className="text-[11px] font-bold text-sereniq-pink tracking-[0.25em] uppercase mb-4 block">
              Pure Ingredients, Deep Serenity
            </span>
            <h2 className="text-sereniq-brown text-4xl lg:text-[54px] font-light leading-snug tracking-tight mb-8 font-serif">
              The Essence <br />of <span className="italic font-normal">Purity</span>
            </h2>
            <p className="text-sereniq-brown/80 text-sm md:text-base mb-10 leading-relaxed font-medium">
              자연에서 온 가장 순수한 에너지가 피부 깊숙이 가감없이 전달되어, 복잡하던 스킨케어를 뒤로하고 본연의 맑고 고귀하며 깨끗한 빛을 되찾아줍니다.
            </p>
            
            <button
              id="discover-story-btn"
              onClick={() => setIsStoryOpen(true)}
              className="px-10 py-4 border border-sereniq-brown text-sereniq-brown text-xs tracking-[0.2em] font-bold hover:bg-sereniq-brown hover:text-white transition-all cursor-pointer rounded-sm"
            >
              DISCOVER THE STORY
            </button>
          </motion.div>

        </div>
      </section>

      {/* STORY DETAIL OVERLAY MODAL */}
      <AnimatePresence>
        {isStoryOpen && (
          <>
            {/* Dark blur backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsStoryOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 pointer-events-auto"
            />

            {/* Modal Body Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-4 sm:inset-x-10 sm:max-w-3xl sm:mx-auto my-auto h-fit max-h-[90vh] bg-white rounded-xl shadow-2xl z-50 p-6 sm:p-10 overflow-y-auto text-sereniq-brown font-sans border border-sereniq-rose"
            >
              {/* Header */}
              <div className="flex justify-between items-center border-b border-sereniq-rose pb-5 mb-6">
                <div>
                  <h3 className="text-lg font-bold font-serif uppercase tracking-widest text-sereniq-brown mb-0.5">THE PURE STORY</h3>
                  <p className="text-xs text-sereniq-gray">세레니크가 탄생하기까지의 깊은 평온의 기록</p>
                </div>
                <button
                  onClick={() => setIsStoryOpen(false)}
                  className="p-1.5 hover:bg-sereniq-rose/55 rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5 text-sereniq-brown" />
                </button>
              </div>

              {/* Story Grid Content */}
              <div className="space-y-6 text-sm text-sereniq-brown/90 leading-relaxed font-sans">
                
                {/* 1. Low temp extraction process */}
                <div className="flex gap-4 items-start bg-sereniq-rose/20 p-4 rounded-lg">
                  <div className="p-2 bg-white rounded-full border border-sereniq-pink text-sereniq-pink">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">저온 극세 병풀 추출 (Cold Decocting Process)</h4>
                    <p className="text-xs text-sereniq-gray leading-loose">
                      세레니크 연구소는 병풀의 유효성분이 열에 파괴되는 것을 극소화하기 위해 10°C 이하의 초진공 저온 환경에서 부드럽게 84시간 달여내는 유기 기법을 사용합니다. 이로써 자연의 생명 에너지가 고농축 앰플에 온전히 상주할 수 있게 됩니다.
                    </p>
                  </div>
                </div>

                {/* 2. Zero-Irritation Formulating */}
                <div className="flex gap-4 items-start bg-sereniq-rose/20 p-4 rounded-lg">
                  <div className="p-2 bg-white rounded-full border border-sereniq-pink text-sereniq-pink">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">향료 무첨가 및 전성분 EWG 그린 등급</h4>
                    <p className="text-xs text-sereniq-gray leading-loose">
                      민감한 피부일수록 작은 자극에도 쉽게 붉어지고 지치기 마련입니다. 세레니크는 인공향료, 합성 색소, 실리콘 오일을 철저히 배제하고 피부 저자극 테스트를 완료한 그린 등급 식물 원료만을 사용하여 무한한 안도감을 선물합니다.
                    </p>
                  </div>
                </div>

                {/* 3. Sustainable Nature Packaging */}
                <div className="flex gap-4 items-start bg-sereniq-rose/20 p-4 rounded-lg">
                  <div className="p-2 bg-white rounded-full border border-sereniq-pink text-sereniq-pink">
                    <Heart className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">생분해 친환경 기수재 및 프리벨 앰플</h4>
                    <p className="text-xs text-sereniq-gray leading-loose">
                      스킨케어를 담는 용기와 패키지는 숲을 지키는 FSC 인증 지류 조립물과 콩기름 잉크 인쇄로 기획되었습니다. 유리 용기는 100% 재활용 순도가 가득하여, 피부뿐 아니라 지구 환경의 흐름 속에도 깊은 휴식을 상기시킵니다.
                    </p>
                  </div>
                </div>

              </div>

              {/* Action */}
              <div className="flex justify-end pt-6 border-t border-sereniq-rose mt-8">
                <button
                  onClick={() => setIsStoryOpen(false)}
                  className="px-6 py-2.5 bg-sereniq-brown text-white text-xs font-semibold tracking-wider rounded cursor-pointer hover:bg-sereniq-brown/95 transition-colors"
                >
                  맑음의 가치 동참하기
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}