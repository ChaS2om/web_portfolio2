import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, X, Droplet, Package, Leaf, Recycle, Box } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import videoSrc from '../assets/images/SERENIQ Green Recycle.mp4';

export default function CtaSection() {
  const [isOpen, setIsOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;
    if (isOpen) {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      // save current scroll and inline styles
      body.dataset.scrollY = String(scrollY);
      const prevPosition = body.style.position;
      const prevTop = body.style.top;
      const prevWidth = body.style.width;
      const prevOverflow = html.style.overflow;

      body.style.position = 'fixed';
      body.style.top = `-${scrollY}px`;
      body.style.left = '0';
      body.style.right = '0';
      body.style.width = '100%';
      html.style.overflow = 'hidden';

      return () => {
        // restore inline styles
        body.style.position = prevPosition;
        body.style.top = prevTop;
        body.style.width = prevWidth;
        html.style.overflow = prevOverflow;
        const saved = body.dataset.scrollY ? parseInt(body.dataset.scrollY, 10) : 0;
        window.scrollTo(0, saved);
        delete body.dataset.scrollY;
      };
    }
    return;
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      // try to play the video when modal opens; since the modal is opened by a user click,
      // browsers usually allow autoplay with sound. Ensure volume and unmute before play.
      try {
        if (videoRef.current) {
          videoRef.current.muted = false;
          videoRef.current.volume = 0.8;
          videoRef.current.loop = true;
          void videoRef.current.play();
        }
      } catch (e) {
        // ignore play errors
      }
    } else {
      videoRef.current?.pause();
      if (videoRef.current) videoRef.current.currentTime = 0;
    }
  }, [isOpen]);

  return (
    <section
      id="green-recycle"
      className="py-24 bg-sereniq-rose/5 font-sans"
      data-purpose="green-recycle-cta"
    >
      <div className="max-w-[1440px] mx-auto px-4 lg:px-[140px]">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-[2rem] border border-sereniq-rose/30 bg-white/95 shadow-[0_30px_80px_-50px_rgba(180,99,130,0.35)] p-8 md:p-12"
        >
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs uppercase tracking-[0.35em] font-bold text-[#629540] mb-4">
              세레니크 그린 리사이클
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-sereniq-brown leading-tight mb-5">
              고객과 함께 만드는 화장품 용기 수거 참여 캠페인
            </h2>
            <p className="text-sm sm:text-base text-sereniq-brown/80 leading-relaxed max-w-2xl mx-auto">
              세레니크 그린 리사이클은 사용 후 비어 있는 화장품 용기를 다시 보내주시면
              안전하게 세척·재생산하여 새로운 품의 제품을 만드는 고객 참여형 친환경 프로그램입니다.
              작은 용기 한 개가 모여 더 큰 변화가 됩니다.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3 text-left">
              <div className="rounded-3xl border border-sereniq-rose/20 bg-sereniq-rose/10 p-6">
                <p className="text-sm font-bold text-sereniq-brown mb-2">Step 1</p>
                <p className="text-[13px] text-sereniq-brown/75 leading-6">
                  비운 용기를 깨끗이 헹군 뒤 가까운 수거함이나 매장에 기부해 주세요.
                </p>
              </div>
              <div className="rounded-3xl border border-sereniq-rose/20 bg-sereniq-rose/10 p-6">
                <p className="text-sm font-bold text-sereniq-brown mb-2">Step 2</p>
                <p className="text-[13px] text-sereniq-brown/75 leading-6">
                  수거된 용기는 재활용 파트너와 함께 세척, 분류, 재생 과정을 거쳐 새 용기로 재탄생합니다.
                </p>
              </div>
              <div className="rounded-3xl border border-sereniq-rose/20 bg-sereniq-rose/10 p-6">
                <p className="text-sm font-bold text-sereniq-brown mb-2">Step 3</p>
                <p className="text-[13px] text-sereniq-brown/75 leading-6">
                  참여 고객에게는 다음 구매 시 사용할 수 있는 감사 혜택과 친환경 리워드를 드립니다.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-sereniq-brown px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-sereniq-brown/90"
              onClick={() => setIsOpen(true)}
            >
              지금 참여하기
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Modal overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 min-h-screen">
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-xs cursor-pointer"
            />

            {/* Modal Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.4 }}
              className="relative bg-white rounded-xl shadow-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col text-sereniq-brown font-sans border border-sereniq-rose"
            >
              <div className="w-full bg-white overflow-hidden mb-4 rounded-3xl mt-4 max-h-[36vh] md:max-h-[46vh] flex items-center justify-center px-6">
                <video
                  ref={videoRef}
                  src={videoSrc}
                  autoPlay
                  loop
                  playsInline
                  className="w-full max-w-full h-full object-cover rounded-3xl"
                />
              </div>
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 z-40 p-2 bg-white/80 hover:bg-sereniq-rose text-[#4B3B3D] hover:opacity-100 rounded-full cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden flex-1 min-h-0 bg-white">
                {/* Left Side: Icons Showcase */}
                <div className="relative bg-sereniq-rose/10 flex flex-col items-center p-8 md:p-10 border-b border-sereniq-rose/30 md:border-b-0 md:border-r border-transparent justify-center gap-8 overflow-y-auto min-h-0">
                  <h4 className="text-sm font-bold text-sereniq-pink tracking-widest uppercase">수거 가능 품목</h4>
                  <div className="grid grid-cols-2 gap-6 w-full">
                    <div className="flex flex-col items-center gap-2">
                      <Box className="w-12 h-12 text-sereniq-pink" strokeWidth={1.5} />
                      <p className="text-xs text-center font-medium">용기</p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <Package className="w-12 h-12 text-sereniq-pink" strokeWidth={1.5} />
                      <p className="text-xs text-center font-medium">뚜껑</p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <Droplet className="w-12 h-12 text-sereniq-pink" strokeWidth={1.5} />
                      <p className="text-xs text-center font-medium">펌프</p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <Leaf className="w-12 h-12 text-sereniq-pink" strokeWidth={1.5} />
                      <p className="text-xs text-center font-medium">패키징</p>
                    </div>
                  </div>
                </div>

                {/* Right Side: Information Panel */}
                <div className="p-6 md:p-10 overflow-y-auto flex flex-col justify-between min-h-0">
                  <div>
                    <span className="text-[10px] font-bold text-[#629540] tracking-[0.2em] uppercase mb-2 block">
                      세레니크 그린 리사이클
                    </span>

                    <h3 className="text-xl md:text-2xl font-light text-sereniq-brown mb-6 leading-snug">
                      참여 방법 가이드
                    </h3>

                    {/* Steps */}
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-sereniq-pink text-white font-bold text-sm">
                            1
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-1">깨끗하게 세척하기</h4>
                          <p className="text-xs text-sereniq-brown/70">
                            사용 후 남은 제품을 제거하고 깨끗한 물로 헹궈주세요.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-sereniq-pink text-white font-bold text-sm">
                            2
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-1">배송하기</h4>
                          <p className="text-xs text-sereniq-brown/70">
                            배송 안내에 따라 세척된 용기를 우편으로 발송해주세요.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-sereniq-pink text-white font-bold text-sm">
                            3
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-1">재생되기</h4>
                          <p className="text-xs text-sereniq-brown/70">
                            재활용 파트너와 협력해 안전하게 재생산된 새로운 용기로 거듭납니다.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-sereniq-pink text-white font-bold text-sm">
                            4
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-1">리워드 받기</h4>
                          <p className="text-xs text-sereniq-brown/70">
                            참여 감사 혜택과 친환경 포인트 리워드가 적립됩니다.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="mt-6 w-full px-4 py-3 bg-sereniq-brown text-white font-bold rounded-lg hover:bg-sereniq-brown/90 transition-colors"
                  >
                    확인했어요
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
