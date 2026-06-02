import React from 'react';
import { motion } from 'motion/react';

export default function Philosophy() {
  return (
    <section id="philosophy" className="py-20 md:py-28 bg-white font-sans border-b border-sereniq-rose/30" data-purpose="philosophy">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-[140px] text-center">
        <div className="max-w-2xl mx-auto">
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-xs tracking-[0.25em] text-sereniq-pink sm:text-[11px] font-bold uppercase mb-4"
          >
            Serenity + Unique
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-sans text-2xl sm:text-3xl md:text-4xl font-light tracking-wide leading-relaxed text-sereniq-brown mb-8"
          >
            고요함과 고유함,<br />
            <span className="font-semibold text-sereniq-brown/95">어디서도 느끼지 못한 맑은 스킨케어</span>
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '4rem' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-[1.5px] bg-sereniq-pink/80 mx-auto mb-8"
          />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-[13px] sm:text-sm md:text-[15px] text-sereniq-brown/80 leading-loose font-medium px-4 md:px-0 break-keep text-center"
          >
            우리는 자연의 가장 순수한 성분만을 선별하여 당신의 피부에 평온함을 선물합니다.<br />
            복잡한 과정을 과감히 덜어내고 본질에 깊숙이 집중하는 것,<br className="hidden sm:inline" /> 그것이 세레니크가 추구하는 뉴 클래식 프리미엄의 기준입니다.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
