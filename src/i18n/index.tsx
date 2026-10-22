import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

/** Add another language code here, add its dictionary and the corresponding CMS translations. */
export const supportedLanguages = [
  { code: 'vi', label: 'Tiếng Việt', short: 'VI' },
  { code: 'en', label: 'English', short: 'EN' },
] as const;
export type Locale = typeof supportedLanguages[number]['code'];

export const messages: Record<Locale, Record<string, string>> = {
  vi: {
    'nav.home': 'Trang chủ', 'nav.projects': 'Dự án', 'nav.about': 'Giới thiệu', 'nav.contact': 'Liên hệ', 'nav.explore': 'KHÁM PHÁ',
    'nav.talk': 'LIÊN HỆ NGAY', 'nav.collaborate': 'HỢP TÁC CÙNG TÔI', 'nav.menuOpen': 'Mở menu', 'nav.menuClose': 'Đóng menu',
    'nav.skip': 'Chuyển đến nội dung chính',
    'nav.brandTagline': 'LẬP TRÌNH ✦ THIẾT KẾ',
    'footer.idea': 'BẠN ĐANG ẤP Ủ MỘT Ý TƯỞNG?', 'footer.build1': 'CÙNG NHAU BIẾN NÓ', 'footer.build2': 'THÀNH HIỆN THỰC.',
    'footer.copyright': 'THIẾT KẾ VỚI TÂM HUYẾT.', 'footer.discipline': 'THIẾT KẾ × LẬP TRÌNH', 'footer.admin': 'QUẢN TRỊ',
    'hero.pill': 'KHÔNG GIAN SÁNG TẠO', 'hero.title1': 'Biến ý tưởng thành hiện thực.', 'hero.title2': 'Kiến tạo tương lai.',
    'hero.subtitle': 'Tôi là Phan Hữu — lập trình viên và nhà thiết kế hình ảnh, nơi tư duy công nghệ giao thoa cùng ngôn ngữ thị giác để kiến tạo những trải nghiệm số khác biệt, giàu cảm xúc và mang đậm dấu ấn riêng.',
    'hero.viewWork': 'Khám phá dự án', 'hero.collaborate': 'Hợp tác với tôi', 'hero.available': 'SẴN SÀNG CHO DỰ ÁN MỚI', 'hero.based': 'TẠI VIỆT NAM',
    'showcase.welcome': 'CHÀO MỪNG ĐẾN VỚI THẾ GIỚI CỦA TÔI', 'showcase.where': 'Nơi', 'showcase.design': 'thiết kế', 'showcase.meets': 'gặp gỡ', 'showcase.code': 'công nghệ.',
    'showcase.description': 'Không gian dành cho giao diện, nhận diện thương hiệu và những ý tưởng ở giữa. Chỉn chu từng chi tiết. Sáng tạo trong từng trải nghiệm.',
    'showcase.development': 'LẬP TRÌNH', 'showcase.visual': 'THIẾT KẾ HÌNH ẢNH', 'showcase.creative': 'SÁNG TẠO', 'showcase.view': 'XEM CÁC DỰ ÁN TIÊU BIỂU',
    'showcase.online': '● HỆ THỐNG HOẠT ĐỘNG', 'hero.scroll': 'CUỘN ĐỂ KHÁM PHÁ DỰ ÁN',
    'home.curated': '01 / DỰ ÁN TIÊU BIỂU', 'home.selected': 'Dự án', 'home.selectedAccent': 'nổi bật.',
    'home.intro': 'Nơi mã nguồn, thẩm mỹ và trải nghiệm số giao thoa.', 'home.all': 'XEM TẤT CẢ DỰ ÁN',
    'home.sample': 'Đang xem 12 dự án mẫu với biểu tượng công nghệ, viền LED động và nội dung có thể chỉnh sửa. Kết nối Supabase để quản lý trực tiếp từ trang Admin.',
    'home.noProjects': 'Chưa có dự án được xuất bản.', 'home.marqueeA': 'THIẾT KẾ CÓ MỤC ĐÍCH', 'home.marqueeB': 'SÁNG TẠO VỚI ĐAM MÊ',
    'home.story': '02 / CÂU CHUYỆN', 'home.storyTitle1': 'MỘT TƯ DUY.', 'home.storyTitle2': 'HAI THẾ GIỚI.', 'home.storyTitle3': 'VÔ VÀN', 'home.storyTitle4': 'KHẢ NĂNG.',
    'home.storyBody': 'Từ những dòng code kiến tạo trải nghiệm đến ngôn ngữ thiết kế khơi gợi cảm xúc, tôi tin rằng những sản phẩm thực sự khác biệt được sinh ra khi tư duy logic hòa quyện cùng trí tưởng tượng — nơi công nghệ không chỉ vận hành, mà còn kể nên những câu chuyện đầy dấu ấn.',
    'home.meet': 'TÌM HIỂU VỀ TÔI', 'home.skillA': 'REACT & FULL-STACK', 'home.skillB': 'BRANDING & UI/UX', 'home.skillC': 'THIẾT KẾ ĐỒ HỌA & MOTION',
    'home.expertise': '03 / THẾ MẠNH', 'home.create': 'Tôi', 'home.createAccent': 'sáng tạo.',
    'home.serviceA': 'Phát triển phần mềm sáng tạo', 'home.serviceB': 'Thiết kế số & UI/UX', 'home.serviceC': 'Kể chuyện bằng hình ảnh',
    'home.serviceDescA': 'React · TypeScript · API · Full-stack', 'home.serviceDescB': 'Sản phẩm số · Giao diện · Thương hiệu', 'home.serviceDescC': 'Đồ họa · Motion · Dựng video',
    'work.eyebrow': '01 / THƯ VIỆN DỰ ÁN', 'work.title': 'TẤT CẢ', 'work.titleAccent': 'DỰ ÁN.', 'work.subtitle': 'Những sản phẩm tôi đã lập trình, thiết kế và biến thành hiện thực.',
    'work.all': 'TẤT CẢ', 'work.development': 'LẬP TRÌNH', 'work.design': 'THIẾT KẾ', 'work.search': 'TÌM KIẾM DỰ ÁN', 'work.noResults': 'Không tìm thấy dự án phù hợp. Hãy thử bộ lọc khác.',
    'card.development': 'LẬP TRÌNH', 'card.design': 'THIẾT KẾ', 'card.open': 'Xem dự án',
    'detail.loading': 'Đang tải dự án...', 'detail.notFound': 'Không tìm thấy dự án.', 'detail.back': 'QUAY VỀ TẤT CẢ DỰ ÁN',
    'detail.story': 'CÂU CHUYỆN', 'detail.projectLabel': 'VỀ DỰ ÁN', 'detail.live': 'XEM WEBSITE', 'detail.source': 'MÃ NGUỒN',
    'detail.category': 'DANH MỤC', 'detail.role': 'VAI TRÒ', 'detail.client': 'KHÁCH HÀNG', 'detail.year': 'NĂM', 'detail.technology': 'CÔNG CỤ & CÔNG NGHỆ',
    'detail.more': '← XEM THÊM DỰ ÁN', 'detail.personal': 'Dự án cá nhân',
    'gallery.heading': 'THƯ VIỆN', 'gallery.headingAccent': 'HÌNH ẢNH.', 'gallery.eyebrow': 'HÌNH ẢNH DỰ ÁN', 'gallery.files': 'TỆP',
    'gallery.empty': 'Thư viện hình ảnh đang được cập nhật.', 'gallery.viewLive': 'Xem website', 'gallery.enlarge': 'XEM LỚN',
    'gallery.open': 'Mở hình ảnh', 'gallery.close': 'Đóng', 'gallery.prev': 'Ảnh trước', 'gallery.next': 'Ảnh tiếp theo', 'gallery.image': 'ảnh',
    'about.eyebrow': '02 / PHÍA SAU DỰ ÁN', 'about.heading1': 'KHÔNG CHỈ', 'about.heading2': 'MỘT LĨNH VỰC.',
    'about.hello': 'XIN CHÀO, MÌNH LÀ PHAN HỮU.',
    'about.p1': 'Là một người đam mê công nghệ, thiết kế và sáng tạo những trải nghiệm kỹ thuật số độc đáo. Mình kết hợp tư duy thiết kế với khả năng phát triển web để biến ý tưởng thành những sản phẩm trực quan, hiện đại và mang dấu ấn riêng. Từ thiết kế đồ họa, nhận diện thương hiệu đến xây dựng website và giao diện người dùng, mình luôn hướng đến sự cân bằng giữa thẩm mỹ, công năng và trải nghiệm. Với mình, mỗi dự án không chỉ là một sản phẩm hoàn thiện, mà còn là cơ hội để khám phá những giới hạn mới của sáng tạo và công nghệ.',
    'about.collaborate': 'HỢP TÁC VỚI TÔI', 'about.toolkit': 'BỘ CÔNG CỤ', 'about.technical': 'KỸ THUẬT', 'about.creative': 'SÁNG TẠO',
    'contact.eyebrow': '03 / KẾT NỐI', 'contact.heading1': 'BẠN CÓ Ý TƯỞNG?', 'contact.heading2': 'CÙNG BIẾN NÓ', 'contact.heading3': 'THÀNH HIỆN THỰC.',
    'contact.description': 'Bạn có dự án, câu hỏi hay đơn giản là muốn kết nối? Tôi luôn sẵn sàng lắng nghe những lời đề nghị hợp tác thú vị.',
    'notFound.eyebrow': '404 / KHÔNG TÌM THẤY', 'notFound.title': 'BẠN ĐÃ ĐI LẠC', 'notFound.accent': 'TRONG SÁNG TẠO.', 'notFound.home': '← VỀ TRANG CHỦ',
    'showcase.3dLabel': 'Biểu tượng PHAN HỮU 3D giữa các vòng sáng xanh', 'showcase.online3d': 'HỆ THỐNG THIẾT KẾ ĐANG HOẠT ĐỘNG', 'intro.open': 'Đang mở Portfolio PHAN HỮU', 'intro.crafting': 'ĐANG KIẾN TẠO TRẢI NGHIỆM', 'tech.notUpdated': 'Chưa cập nhật công nghệ', 'loading.projects': 'Đang tải dự án...', 'loading.error': 'Không thể tải dữ liệu:', 'art.preview': 'Xem hình ảnh dự án',
  },
  en: {
    'nav.home': 'Home',
    'nav.projects': 'Projects',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.explore': 'EXPLORE',
    'nav.talk': 'GET IN TOUCH',
    'nav.collaborate': 'LET’S COLLABORATE',
    'nav.menuOpen': 'Open menu',
    'nav.menuClose': 'Close menu',
    'nav.skip': 'Skip to main content',
    'nav.brandTagline': 'DEVELOPMENT ✦ DESIGN',
    'footer.idea': 'HAVE AN IDEA IN MIND?',
    'footer.build1': 'LET’S BRING IT',
    'footer.build2': 'TO LIFE.',
    'footer.copyright': 'CRAFTED WITH PASSION.',
    'footer.discipline': 'DESIGN × DEVELOPMENT',
    'footer.admin': 'ADMIN',
    'hero.pill': 'CREATIVE UNIVERSE',
    'hero.title1': 'Turning Ideas Into Reality.',
    'hero.title2': 'Shaping the Future.',
    'hero.subtitle': 'I’m Phan Huu — a software developer and visual designer, bringing together technology and visual storytelling to create distinctive digital experiences that inspire, connect, and leave a lasting impression.',
    'hero.viewWork': 'Explore Projects',
    'hero.collaborate': 'Work With Me',
    'hero.available': 'AVAILABLE FOR NEW PROJECTS',
    'hero.based': 'BASED IN VIETNAM',
    'showcase.welcome': 'WELCOME TO MY CREATIVE UNIVERSE',
    'showcase.where': 'Where',
    'showcase.design': 'design',
    'showcase.meets': 'meets',
    'showcase.code': 'technology.',
    'showcase.description': 'A creative space for digital interfaces, brand identities, and everything in between. Thoughtfully crafted details. Meaningful digital experiences.',
    'showcase.development': 'DEVELOPMENT',
    'showcase.visual': 'VISUAL DESIGN',
    'showcase.creative': 'CREATIVITY',
    'showcase.view': 'EXPLORE FEATURED PROJECTS',
    'showcase.online': '● SYSTEM ONLINE',
    'hero.scroll': 'SCROLL TO EXPLORE PROJECTS',
    'home.curated': '01 / FEATURED WORK',
    'home.selected': 'Selected',
    'home.selectedAccent': 'Projects.',
    'home.intro': 'Where code, aesthetics, and digital experiences come together.',
    'home.all': 'VIEW ALL PROJECTS',
    'home.sample': 'Currently displaying 12 sample projects featuring technology icons, animated LED borders, and editable content. Connect Supabase to manage projects directly from the Admin Dashboard.',
    'home.noProjects': 'No projects have been published yet.',
    'home.marqueeA': 'DESIGN WITH PURPOSE',
    'home.marqueeB': 'CREATE WITH PASSION',
    'home.story': '02 / MY STORY',
    'home.storyTitle1': 'ONE MINDSET.',
    'home.storyTitle2': 'TWO WORLDS.',
    'home.storyTitle3': 'ENDLESS',
    'home.storyTitle4': 'POSSIBILITIES.',
    'home.storyBody': 'From lines of code that shape seamless experiences to visual designs that spark emotions, I believe truly exceptional products emerge when logical thinking meets imagination — where technology does more than function; it tells stories that leave a lasting impression.',
    'home.meet': 'GET TO KNOW ME',
    'home.skillA': 'REACT & FULL-STACK',
    'home.skillB': 'BRANDING & UI/UX',
    'home.skillC': 'GRAPHIC DESIGN & MOTION',

    'home.expertise': '03 / EXPERTISE',
    'home.create': 'I',
    'home.createAccent': 'Create.',
    'home.serviceA': 'Creative Software Development',
    'home.serviceB': 'Digital Design & UI/UX',
    'home.serviceC': 'Visual Storytelling',
    'home.serviceDescA': 'React · TypeScript · APIs · Full-Stack',
    'home.serviceDescB': 'Digital Products · Interfaces · Branding',
    'home.serviceDescC': 'Graphics · Motion · Video Editing',

    'work.eyebrow': '01 / PROJECT ARCHIVE',
    'work.title': 'ALL',
    'work.titleAccent': 'PROJECTS.',
    'work.subtitle': 'A collection of ideas I have developed, designed, and brought to life.',
    'work.all': 'ALL',
    'work.development': 'DEVELOPMENT',
    'work.design': 'DESIGN',
    'work.search': 'SEARCH PROJECTS',
    'work.noResults': 'No matching projects found. Try a different filter.',

    'card.development': 'DEVELOPMENT',
    'card.design': 'DESIGN',
    'card.open': 'View Project',

    'detail.loading': 'Loading project...',
    'detail.notFound': 'Project not found.',
    'detail.back': 'BACK TO ALL PROJECTS',
    'detail.story': 'THE STORY',
    'detail.projectLabel': 'ABOUT THE PROJECT',
    'detail.live': 'VIEW LIVE WEBSITE',
    'detail.source': 'SOURCE CODE',
    'detail.category': 'CATEGORY',
    'detail.role': 'ROLE',
    'detail.client': 'CLIENT',
    'detail.year': 'YEAR',
    'detail.technology': 'TOOLS & TECHNOLOGIES',
    'detail.more': '← EXPLORE MORE PROJECTS',
    'detail.personal': 'Personal Project',

    'gallery.heading': 'IMAGE',
    'gallery.headingAccent': 'GALLERY.',
    'gallery.eyebrow': 'PROJECT GALLERY',
    'gallery.files': 'FILES',
    'gallery.empty': 'The image gallery is being updated.',
    'gallery.viewLive': 'View Live Website',
    'gallery.enlarge': 'ENLARGE',
    'gallery.open': 'Open Image',
    'gallery.close': 'Close',
    'gallery.prev': 'Previous Image',
    'gallery.next': 'Next Image',
    'gallery.image': 'image',

    'about.eyebrow': '02 / BEHIND THE WORK',
    'about.heading1': 'BEYOND',
    'about.heading2': 'ONE DISCIPLINE.',
    'about.hello': 'HELLO, I’M PHAN HUU.',
    'about.p1': 'I’m passionate about technology, design, and creating unique digital experiences. By combining creative thinking with web development expertise, I transform ideas into intuitive, modern, and distinctive digital products. From graphic design and brand identity to website development and user interface design, I strive to achieve the perfect balance between aesthetics, functionality, and user experience. For me, every project is more than just a finished product — it is an opportunity to explore new possibilities and push the boundaries of creativity and technology.',
    'about.collaborate': 'LET’S WORK TOGETHER',
    'about.toolkit': 'MY TOOLKIT',
    'about.technical': 'TECHNICAL',
    'about.creative': 'CREATIVE',

    'contact.eyebrow': '03 / LET’S CONNECT',
    'contact.heading1': 'GOT AN IDEA?',
    'contact.heading2': 'LET’S BRING IT',
    'contact.heading3': 'TO LIFE.',
    'contact.description': 'Have a project in mind, a question, or simply want to connect? I’m always open to exciting collaborations and meaningful conversations.',

    'notFound.eyebrow': '404 / PAGE NOT FOUND',
    'notFound.title': 'LOST IN',
    'notFound.accent': 'CREATIVITY.',
    'notFound.home': '← BACK TO HOME',

    'showcase.3dLabel': '3D PHAN HUU emblem surrounded by glowing blue rings',
    'showcase.online3d': 'DESIGN SYSTEM ONLINE',

    'intro.open': 'Opening PHAN HUU Portfolio',
    'intro.crafting': 'CRAFTING DIGITAL EXPERIENCES',

    'tech.notUpdated': 'Technologies not updated',
    'loading.projects': 'Loading projects...',
    'loading.error': 'Failed to load data:',
    'art.preview': 'Preview Project Image',
  }

};

/** Browser preference only: never uses IP, geolocation, cookies, saved language or a visible selector. */
export function detectBrowserLanguage(): Locale {
  if (typeof navigator === 'undefined') return 'en';
  const browserLanguages = navigator.languages?.length ? navigator.languages : [navigator.language];
  const preferred = browserLanguages.find(Boolean) ?? 'en';
  // Use the visitor's FIRST preferred locale, not a secondary fallback that may not represent their choice.
  const primary = preferred.toLowerCase().split('-')[0];
  return primary === 'vi' ? 'vi' : 'en';
}

type I18nContextValue = { language: Locale; t: (key: string) => string };
const I18nContext = createContext<I18nContextValue | null>(null);
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setCurrentLanguage] = useState<Locale>(detectBrowserLanguage);
  // Browser language may change while a tab is still open.
  useEffect(() => {
    const update = () => setCurrentLanguage(detectBrowserLanguage());
    window.addEventListener('languagechange', update);
    return () => window.removeEventListener('languagechange', update);
  }, []);
  useEffect(() => {
    document.documentElement.lang = language;
    document.title = language === 'vi' ? 'Phan Hữu | Lập trình & Thiết kế sáng tạo' : 'Phan Hữu | Creative Development & Design';
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description) description.content = language === 'vi' ? 'Portfolio Phan Hữu: website, lập trình sáng tạo và các dự án thiết kế thương hiệu.' : 'Phan Hữu creative portfolio: development, websites and visual design projects.';
  }, [language]);
  const t = useCallback((key: string) => messages[language][key] ?? messages.en[key] ?? key, [language]);
  const value = useMemo(() => ({ language, t }), [language, t]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
export function useI18n() { const ctx = useContext(I18nContext); if (!ctx) throw new Error('useI18n requires LanguageProvider'); return ctx; }
