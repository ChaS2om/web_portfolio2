import { Product, Review } from './types';
import review1Img from './assets/images/sereniq_review_toner_1780367167181.png';
import review2Img from './assets/images/regenerated_image_1780369793882.png';
import review3Img from './assets/images/regenerated_image_1780369791362.png';
import review4Img from './assets/images/regenerated_image_1780370109350.png';

export const BRAND_LOGO_DARK = "https://lh3.googleusercontent.com/aida-public/AB6AXuA-8d4BdyJruybd5vcY9uB6B3l-6eZR-hjCWMB41iQkNPbwDjIP8T4NXYnGwc1BedXBVywkqYNqt5yDa7XkpHJaig203G79pcryw8jFGVFAAIpd46EIHppcirVjKy42hEILP9W0ijNsjBJK9mqsvnCXpQjppH6YCucTK-RWAGUq6qpRCuIrnB6fSgD7zNp7qPwupfOAHx8n7SIY_s5JNrGktJ29f4KAMVK5oczaf-nQBDAFTnhBwMgz-fP4q_riVM0R-S4KxdpZbiVmAh8";

export const HERO_BACKGROUND = "https://lh3.googleusercontent.com/aida-public/AB6AXuBvyldNCYWe4GNbFBINgO_9a4ehFeoFHFJRnwfDcw48maoB_CJu6FsxBzXzDdW5Iep6t2iChuI7S_YV-T2dvrP6MbsuXSSrdQTDI1kjTqACnK8xkMcHt6V101T1BvHjbu07OS1qNaJSNczyjKpPTp7wLh-cpF1XKXzWbuqnAxRvb2GKAJhuizaxnn0wvR-usrA6IsANfgUrJZCSSdWmkb5RK4Dimjj3_szL3wnMwXsGgtuZ3WZdhWHcTKeGiKXB12V64kGUsv9m_HxH=s0";

export const BRAND_STORY_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuD4zx4lte0HJ_4pNcIZkzJ4s7TyFV4pAKxy_211hDit8-tIAwn9lzCeEGMlYxsRdpKwAkE4gF5plWomaev8HTCb5sNkJCYaP_49DOzH9ujsIMVM4cgt2HQ74gFgqmcOikQqzPl3iGzNnW0fMRabpArpU69wuY78IFtPDYJx5LQqBzuYumYeY2ZkyEdw1ijXO-obST0TLh3tZRtAmANNeWANRl6F4a6F4NXQlMrTffZ1eoO3gy7T5MyPZ-7vNfknVs7-ox30yq147hdx";

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "sereniq-all-in-one",
    name: "세레니크 올인원 스킨케어 세트",
    price: 54000,
    originalPrice: 68000,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDHexWkswhg0JtsiqZ-VEjNyuJC9LeUAReN3fomqrnRGXOwnZuCedK2yXbvDE29WZ-WzMFjVHtIjCcxvnJ9gPo0PhFY7FVFIX4nElZVzn4qWTyDJdx89oN8MhBVvjLNdAEAJj2YGbGsNVa3TRTOkw_Wsza5C3xbZatu60qhhad_dJ8k2GUD3a4W_rflC6uv16cfRJgKagvEqwhpiRtrj_le0R4MU-GqMnxsOQice86iQjM_7OR9TUfbvoWTZzQzpAJ5dRJXfOYO1Xbvnww",
    category: "skincare",
    volume: "클렌저 120ml + 토너 150ml + 앰플 30ml + 크림 50ml 구성",
    description: "클렌저, 토너, 앰플, 크림이 완벽하게 조화된 세레니크만의 프리미엄 스킨케어 패키지입니다. 민감해진 피부 장벽을 복구하여 고유한 광빛과 부드러움을 남깁니다.",
    ingredients: ["병풀잎추출물 (Centella Asiatica)", "판테놀 (Panthenol)", "세라마이드NP", "녹차추출물", "아데노신", "히알루론산"],
    benefits: ["피부 근본 저자극 진정 및 장벽 강화", "건조한 탄력 저하 집중 개선", "유수분 밸런스 정상화"],
    howToUse: "1. 수딩 클렌저로 피부 불순물을 부드럽게 세안합니다.\n2. 토너를 취해 피부결을 가볍게 닦아 정돈합니다.\n3. 카밍 앰플 2-3방울을 고루 떨어뜨려 밀도있게 마사지하여 흡수시킵니다.\n4. 배리어 크림을 올려 영양 보습 쉴드를 밀착 고정시킵니다."
  },
  {
    id: "sereniq-balancing-set",
    name: "밸런싱 토너 + 배리어 크림 세트",
    price: 36000,
    originalPrice: 42000,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0egX9-CpYA8_rrTl83TgD-Rxd2XLImSacxX4EFgJwLjjN_7J4NpV4ZcKHWMxAdr6hz-ONw6zlvNhjnZVfbWC0kv0KU2UbmI0d9sqTJxpC8kwplPf7MbQ-xzFBh4cm-mAGPagRp7RZmcluupt8AZ1DuPYEfg5w8u0djJFA39Mk-ehFTgmo-zIUfnRU8WPYET1sC6gs3A7VMYf91zD8xf08APXAQC1o18Ya8teANXXlXPF_Q-X7Pceq9BS5n0pea_Alls2TRZrg65zY-Gk",
    category: "cream",
    volume: "토너 150ml + 크림 50ml",
    description: "속건조와 거친 피부결 고민을 단 한 번에 복구하는 강력 유수분 레이어링 듀오 세트입니다.",
    ingredients: ["스쿠알란", "세라마이드NP", "베타-글루칸", "알란토인", "편백수"],
    benefits: ["결 개선 및 영양 수분 공급", "자극 없이 하루종일 유지되는 철벽 보습", "붉은기 진정 시너지"],
    howToUse: "토너 흡수 후, 스킨 케어 마지막 크림 단계에서 골고루 펴 바르고 체온으로 지그시 눌러 줍니다."
  },
  {
    id: "sereniq-soothing-cleanser",
    name: "수딩 클렌저 120ml",
    price: 21000,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDyFmG6rzb3RRFvr-RAJe4TFoyOz5O85pH-ZeELMyjcdyRgI7__sHQtGKSBrpudGVXAFjsNJouvlSHTzceZG_SyyCbW98nQ0nTGHXAkeCMR21zEGn7nYlbJNu1AEqPOECBAQ7zue6T_lpMjJVwDLasitRZXc8qWeYAmq6JvzfzvUKj9saMlj3yqXowpLVSfW3-iDopyCbH29zw2Sm76fo7KiTIl6d4ATu_5EGLSdabnyPK6cG0_ZBYX2m3jfvVHD9-CcVtdmBGSIuNqgg4",
    category: "cleanser",
    volume: "120ml",
    description: "약산성이 주는 부드러운 순함에 풍부한 밀포뮬라 세정력을 추가하여 당김 없는 맑은 피부를 연출해 줍니다.",
    ingredients: ["코코-베타인", "글리세린", "판테놀", "알로에베라잎즙", "녹차수"],
    benefits: ["초미세 모공 노폐물 및 유해균 완벽 클레이 세정", "세안 직후 당김을 제어하는 마일드 보호막"],
    howToUse: "적당량을 미온수와 섞어 미세한 거품을 고르게 내준 후 가볍게 페이셜 롤링한 후 맑게 헹구어 냅니다."
  },
  {
    id: "sereniq-calming-ampoule",
    name: "카밍 앰플 30ml",
    price: 19000,
    originalPrice: 24000,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDv6mfqLFSbQxzQQ1R3N6w7uuGpo4jHpXgwkNUplDoec_lYYZq1i0gwnn8gn6HQs2Sc_TLAcyAkSwEPpzcPOrmtWQRdVMCk7svDxkKMNjT2oSQiABwicjbaTZjAxhSvDh3l_tfHn4p12-5m048YQmxRRZb25_JdoAeWpR_ysa25UuRRKNE1U_o9QNZYsXC3KT9leG8Y2RGw4ZhHFAqUBa9bndrpNvAbv3L5uOSCUDBsdQB1PJ830x8GrB9UjCte02CDxPDbVgYiUg2nlS8",
    category: "ampoule",
    volume: "30ml",
    description: "병풀추출물을 물 대신 채우고 고농축 판테놀을 더해 단 한 방울만으로도 민감함이 내려앉는 퀵 수딩 부스터 맑은 앰플입니다.",
    ingredients: ["병풀 추출물 (Centella Asiatica Extract 84%)", "판테놀 (Panthenol 10,000ppm)", "마데카소사이드", "어성초추출물"],
    benefits: ["울긋불긋 예민해진 스팟 즉각 수딩 쿨링", "맑고 정 정돈된 피부 장벽 수분 홀딩 능구 향상"],
    howToUse: "일일 2회, 아침과 저녁 토너 사용 직후 고르게 점적하여 볼과 얼굴 전체에 지그시 스며들듯 늘려 세팅합니다."
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: "rev-1",
    productId: "sereniq-all-in-one",
    productName: "세레니크 올인원 스킨케어 세트",
    rating: 5,
    content: "환절기마다 피부가 쉽게 뒤집어지고, 조금만 독한 제품을 써도 바로 트러블 올라오는 개복치 피부입니다. 이 세트 쓰고 나서는 진짜 자극이 하나도 없고 하루종일 속건조 없이 촉촉하게 피부가 진정되는 게 바로 체감되었어요! 패키징도 오브제처럼 너무 예쁘고 선물용으로도 강추합니다.",
    author: "김민지",
    date: "2026.02.10",
    image: review1Img,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop"
  },
  {
    id: "rev-2",
    productId: "sereniq-balancing-set",
    productName: "밸런싱 토너 + 배리어 크림 세트",
    rating: 5,
    content: "토너와 크림을 세트로 함께 사용해보니 보습 시너지가 정말 사기급으로 뛰어나요! 아침까지도 매끈하고 촉촉한 피부결이 보존되는 걸 경험하고 세레니크에 무한 입덕하였습니다. 수부지 강력 구원템 인정합니다.",
    author: "박서윤",
    date: "2026.02.20",
    image: review2Img,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop"
  },
  {
    id: "rev-3",
    productId: "sereniq-soothing-cleanser",
    productName: "수딩 클렌저 120ml",
    rating: 5,
    content: "포장 진짜 친환경 고급스럽고 디테일 충만하게 안전 배송 완료되었습니다. 향도 자극적이지 않고 풀잎향처럼 은은하게 고급 마사지샵 스파 느낌이 솔솔 풍깁니다. 약산성인데도 세정력 뛰어나고 피부 붉은기가 차분하게 가라앉아요.",
    author: "최재석",
    date: "2026.02.24",
    image: review3Img,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
  },
  {
    id: "rev-4",
    productId: "sereniq-calming-ampoule",
    productName: "카밍 앰플 30ml",
    rating: 5,
    content: "피부가 워낙 민감해서 스킨케어도 유목민 생활만 수년째였는데, 세레니크 카밍 앰플 마침내 정착했습니다! 어쩜 이렇게 자극이 하나도 없고 물보다 부드럽게 사르르 흡수되는지 모르겠어요. 끈적임 0%이고 완전 맑음 그 자체!",
    author: "이지연",
    date: "2025.11.15",
    image: review4Img,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop"
  }
];
