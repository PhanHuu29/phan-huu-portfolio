import {createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode} from 'react';

/** Add another language code here, add its dictionary and the corresponding CMS translations. */
export const supportedLanguages = [
  {code:'vi', label:'Tiếng Việt', short:'VI'},
  {code:'en', label:'English', short:'EN'},
] as const;
export type Locale = typeof supportedLanguages[number]['code'];

export const messages: Record<Locale,Record<string,string>> = {
  vi: {
    'nav.home':'Trang chủ','nav.projects':'Dự án','nav.about':'Giới thiệu','nav.contact':'Liên hệ','nav.explore':'KHÁM PHÁ',
    'nav.talk':'LIÊN HỆ NGAY','nav.collaborate':'HỢP TÁC CÙNG TÔI','nav.menuOpen':'Mở menu','nav.menuClose':'Đóng menu',
    'nav.skip':'Chuyển đến nội dung chính',
    'nav.brandTagline':'LẬP TRÌNH SÁNG TẠO ✦ THIẾT KẾ',
    'footer.idea':'BẠN CÓ Ý TƯỞNG MỚI?', 'footer.build1':'CÙNG TẠO NÊN','footer.build2':'ĐIỀU TUYỆT VỜI.',
    'footer.copyright':'THIẾT KẾ VỚI TÂM HUYẾT.','footer.discipline':'THIẾT KẾ × LẬP TRÌNH', 'footer.admin':'QUẢN TRỊ',
    'hero.pill':'KHÔNG GIAN SÁNG TẠO', 'hero.title1':'Biến ý tưởng thành hiện thực.','hero.title2':'Kiến tạo tương lai.',
    'hero.subtitle':'Tôi là Phan Hữu — lập trình viên sáng tạo và nhà thiết kế hình ảnh, kết nối công nghệ và thẩm mỹ để tạo nên những trải nghiệm số đáng nhớ.',
    'hero.viewWork':'Khám phá dự án','hero.collaborate':'Hợp tác với tôi','hero.available':'SẴN SÀNG CHO DỰ ÁN MỚI','hero.based':'TẠI VIỆT NAM',
    'showcase.welcome':'CHÀO MỪNG ĐẾN VỚI THẾ GIỚI CỦA TÔI','showcase.where':'Nơi', 'showcase.design':'thiết kế','showcase.meets':'gặp gỡ','showcase.code':'công nghệ.',
    'showcase.description':'Không gian dành cho giao diện, nhận diện thương hiệu và những ý tưởng ở giữa. Chỉn chu từng chi tiết. Sáng tạo trong từng trải nghiệm.',
    'showcase.development':'LẬP TRÌNH','showcase.visual':'THIẾT KẾ HÌNH ẢNH','showcase.creative':'SÁNG TẠO','showcase.view':'XEM CÁC DỰ ÁN TIÊU BIỂU',
    'showcase.online':'● HỆ THỐNG HOẠT ĐỘNG','hero.scroll':'CUỘN ĐỂ KHÁM PHÁ DỰ ÁN',
    'home.curated':'01 / DỰ ÁN TIÊU BIỂU','home.selected':'Dự án', 'home.selectedAccent':'nổi bật.',
    'home.intro':'Nơi mã nguồn, thẩm mỹ và trải nghiệm số giao thoa.','home.all':'XEM TẤT CẢ DỰ ÁN',
    'home.sample':'Đang xem 12 dự án mẫu với biểu tượng công nghệ, viền LED động và nội dung có thể chỉnh sửa. Kết nối Supabase để quản lý trực tiếp từ trang Admin.',
    'home.noProjects':'Chưa có dự án được xuất bản.', 'home.marqueeA':'THIẾT KẾ CÓ MỤC ĐÍCH', 'home.marqueeB':'SÁNG TẠO VỚI ĐAM MÊ',
    'home.story':'02 / CÂU CHUYỆN', 'home.storyTitle1':'MỘT TƯ DUY.', 'home.storyTitle2':'HAI THẾ GIỚI.', 'home.storyTitle3':'VÔ VÀN', 'home.storyTitle4':'KHẢ NĂNG.',
    'home.storyBody':'Từ hệ thống frontend tinh gọn tới câu chuyện thị giác giàu cảm xúc, tôi tin những sản phẩm tốt nhất được tạo nên khi logic gặp trí tưởng tượng.',
    'home.meet':'TÌM HIỂU VỀ TÔI', 'home.skillA':'REACT & FULL-STACK', 'home.skillB':'BRANDING & UI/UX', 'home.skillC':'THIẾT KẾ ĐỒ HỌA & MOTION',
    'home.expertise':'03 / THẾ MẠNH', 'home.create':'Tôi', 'home.createAccent':'sáng tạo.',
    'home.serviceA':'Phát triển phần mềm sáng tạo','home.serviceB':'Thiết kế số & UI/UX','home.serviceC':'Kể chuyện bằng hình ảnh',
    'home.serviceDescA':'React · TypeScript · API · Full-stack','home.serviceDescB':'Sản phẩm số · Giao diện · Thương hiệu','home.serviceDescC':'Đồ họa · Motion · Dựng video',
    'work.eyebrow':'01 / THƯ VIỆN DỰ ÁN','work.title':'TẤT CẢ', 'work.titleAccent':'DỰ ÁN.', 'work.subtitle':'Những sản phẩm tôi đã lập trình, thiết kế và biến thành hiện thực.',
    'work.all':'TẤT CẢ','work.development':'LẬP TRÌNH','work.design':'THIẾT KẾ','work.search':'TÌM KIẾM DỰ ÁN','work.noResults':'Không tìm thấy dự án phù hợp. Hãy thử bộ lọc khác.',
    'card.development':'LẬP TRÌNH', 'card.design':'THIẾT KẾ', 'card.open':'Xem dự án',
    'detail.loading':'Đang tải dự án...', 'detail.notFound':'Không tìm thấy dự án.', 'detail.back':'QUAY VỀ TẤT CẢ DỰ ÁN',
    'detail.story':'CÂU CHUYỆN', 'detail.projectLabel':'VỀ DỰ ÁN', 'detail.live':'XEM WEBSITE', 'detail.source':'MÃ NGUỒN',
    'detail.category':'DANH MỤC','detail.role':'VAI TRÒ','detail.client':'KHÁCH HÀNG','detail.year':'NĂM','detail.technology':'CÔNG CỤ & CÔNG NGHỆ',
    'detail.more':'← XEM THÊM DỰ ÁN', 'detail.personal':'Dự án cá nhân',
    'gallery.heading':'THƯ VIỆN', 'gallery.headingAccent':'HÌNH ẢNH.', 'gallery.eyebrow':'HÌNH ẢNH DỰ ÁN','gallery.files':'TỆP',
    'gallery.empty':'Thư viện hình ảnh đang được cập nhật.','gallery.viewLive':'Xem website đang chạy','gallery.enlarge':'XEM LỚN',
    'gallery.open':'Mở hình ảnh','gallery.close':'Đóng','gallery.prev':'Ảnh trước','gallery.next':'Ảnh tiếp theo','gallery.image':'ảnh',
    'about.eyebrow':'02 / PHÍA SAU DỰ ÁN','about.heading1':'KHÔNG CHỈ', 'about.heading2':'MỘT LĨNH VỰC.',
    'about.hello':'XIN CHÀO, TÔI LÀ HỮU.','about.design':'TÒ MÒ TỪ', 'about.design2':'TƯ DUY THIẾT KẾ.',
    'about.p1':'Tôi là lập trình viên sáng tạo và nhà thiết kế, yêu thích biến các ý tưởng táo bạo thành trải nghiệm hữu ích, chỉn chu. Công việc của tôi nằm ở giao điểm giữa kỹ thuật, thiết kế hình ảnh và kể chuyện.',
    'about.p2':'Tôi thích xây dựng giao diện hiện đại, giải quyết thử thách công nghệ và kiến tạo những câu chuyện hình ảnh khiến mọi người ghi nhớ.',
    'about.collaborate':'HỢP TÁC VỚI TÔI','about.toolkit':'BỘ CÔNG CỤ', 'about.technical':'KỸ THUẬT', 'about.creative':'SÁNG TẠO',
    'contact.eyebrow':'03 / KẾT NỐI','contact.heading1':'BẠN CÓ Ý TƯỞNG?','contact.heading2':'CÙNG BIẾN NÓ','contact.heading3':'THÀNH HIỆN THỰC.',
    'contact.description':'Bạn có dự án, câu hỏi hay đơn giản là muốn kết nối? Tôi luôn sẵn sàng lắng nghe những lời đề nghị hợp tác thú vị.',
    'notFound.eyebrow':'404 / KHÔNG TÌM THẤY', 'notFound.title':'BẠN ĐÃ ĐI LẠC', 'notFound.accent':'TRONG SÁNG TẠO.', 'notFound.home':'← VỀ TRANG CHỦ',
    'showcase.3dLabel':'Biểu tượng PHAN HỮU 3D giữa các vòng sáng xanh', 'showcase.online3d':'HỆ THỐNG THIẾT KẾ ĐANG HOẠT ĐỘNG', 'intro.open':'Đang mở Portfolio PHAN HỮU', 'intro.crafting':'ĐANG KIẾN TẠO TRẢI NGHIỆM', 'tech.notUpdated':'Chưa cập nhật công nghệ', 'loading.projects':'Đang tải dự án...','loading.error':'Không thể tải dữ liệu:', 'art.preview':'Xem hình ảnh dự án',
  },
  en: {
    'nav.skip':'Skip to main content', 'nav.home':'Home','nav.projects':'Projects','nav.about':'About','nav.contact':'Contact','nav.explore':'EXPLORE',
    'nav.talk':"LET'S TALK",'nav.collaborate':"LET'S COLLABORATE",'nav.menuOpen':'Open menu','nav.menuClose':'Close menu',
    'nav.brandTagline':'CREATIVE DEVELOPER ✦ DESIGNER',
    'footer.idea':'HAVE AN IDEA IN MIND?', 'footer.build1':"LET'S BUILD",'footer.build2':'THE NEXT THING.',
    'footer.copyright':'MADE WITH INTENTION.','footer.discipline':'DESIGN × DEVELOPMENT','footer.admin':'ADMIN',
    'hero.pill':'THE CREATIVE UNIVERSE','hero.title1':'Designing ideas.','hero.title2':'Building the future.',
    'hero.subtitle':"I'm Phan Hữu — a creative developer & visual designer turning thoughtful ideas into memorable digital experiences.",
    'hero.viewWork':'Explore my work','hero.collaborate':"Let's collaborate",'hero.available':'AVAILABLE FOR CREATIVE PROJECTS','hero.based':'BASED IN VIETNAM',
    'showcase.welcome':'WELCOME TO MY WORLD','showcase.where':'Where','showcase.design':'design','showcase.meets':'meets','showcase.code':'code.',
    'showcase.description':'A space for interfaces, identities, and everything in between. Thoughtfully built. Beautifully delivered.',
    'showcase.development':'DEVELOPMENT','showcase.visual':'VISUAL DESIGN','showcase.creative':'CREATIVE WORK','showcase.view':'VIEW SELECTED PROJECTS',
    'showcase.online':'● SYSTEM ONLINE','hero.scroll':'SCROLL TO EXPLORE THE WORK',
    'home.curated':'01 / CURATED COLLECTION','home.selected':'Selected','home.selectedAccent':'work.',
    'home.intro':'An intersection of code, aesthetics and memorable experiences.','home.all':'ALL PROJECTS',
    'home.sample':'Previewing 12 curated projects with interactive tech logos, animated LED borders and editable starter content. Connect Supabase to manage projects live through Admin.',
    'home.noProjects':'No published projects yet.', 'home.marqueeA':'DESIGN WITH PURPOSE', 'home.marqueeB':'BUILD WITH PASSION',
    'home.story':'02 / THE STORY','home.storyTitle1':'ONE MIND.','home.storyTitle2':'TWO WORLDS.','home.storyTitle3':'ENDLESS','home.storyTitle4':'POSSIBILITIES.',
    'home.storyBody':'From meticulous frontend systems to bold visual stories, I believe the best work happens when logic and imagination connect.',
    'home.meet':'GET TO KNOW ME','home.skillA':'REACT & FULL-STACK','home.skillB':'BRANDING & UI/UX','home.skillC':'GRAPHIC & MOTION DESIGN',
    'home.expertise':'03 / EXPERTISE','home.create':'What I','home.createAccent':'create.',
    'home.serviceA':'Creative Development','home.serviceB':'Digital & UI/UX Design','home.serviceC':'Visual Storytelling',
    'home.serviceDescA':'React · TypeScript · APIs · Full-stack','home.serviceDescB':'Digital products · Interfaces · Branding','home.serviceDescC':'Graphics · Motion · Video editing',
    'work.eyebrow':'01 / ARCHIVE','work.title':'ALL','work.titleAccent':'PROJECTS.','work.subtitle':"A selection of things I've built, designed, and brought to life.",
    'work.all':'ALL','work.development':'DEVELOPMENT','work.design':'DESIGN','work.search':'SEARCH PROJECTS','work.noResults':'No projects found. Try another filter.',
    'card.development':'DEVELOPMENT','card.design':'DESIGN','card.open':'View project',
    'detail.loading':'Loading project...','detail.notFound':'Project not found.','detail.back':'BACK TO ALL WORK',
    'detail.story':'THE STORY', 'detail.projectLabel':'THE PROJECT', 'detail.live':'LIVE PROJECT', 'detail.source':'SOURCE CODE',
    'detail.category':'CATEGORY','detail.role':'ROLE','detail.client':'CLIENT','detail.year':'YEAR','detail.technology':'TOOLS & TECHNOLOGIES',
    'detail.more':'← EXPLORE MORE WORK','detail.personal':'Personal project',
    'gallery.heading':'IMAGE','gallery.headingAccent':'GALLERY.','gallery.eyebrow':'PROJECT VISUALS','gallery.files':'FILES',
    'gallery.empty':'The image gallery is being updated.','gallery.viewLive':'View live website','gallery.enlarge':'VIEW LARGE',
    'gallery.open':'Open image','gallery.close':'Close','gallery.prev':'Previous image','gallery.next':'Next image','gallery.image':'image',
    'about.eyebrow':'02 / BEHIND THE WORK','about.heading1':'MORE THAN','about.heading2':'ONE DISCIPLINE.',
    'about.hello':"HELLO, I'M HUU.",'about.design':'CURIOUS BY','about.design2':'DESIGN.',
    'about.p1':"I'm a creative developer and designer who loves turning ambitious ideas into thoughtful, functional experiences. My work sits at the intersection of engineering, visual design and storytelling.",
    'about.p2':'I enjoy building modern interfaces, solving tricky technical challenges, and shaping visual narratives that people remember.',
    'about.collaborate':"LET'S COLLABORATE",'about.toolkit':'MY TOOLKIT','about.technical':'TECHNICAL','about.creative':'CREATIVE',
    'contact.eyebrow':'03 / SAY HELLO','contact.heading1':'GOT AN IDEA?','contact.heading2':"LET'S MAKE IT",'contact.heading3':'HAPPEN.',
    'contact.description':'Have a project, a question, or just want to connect? My inbox is always open for interesting conversations.',
    'notFound.eyebrow':'404 / NOTHING HERE','notFound.title':'LOST IN THE','notFound.accent':'CREATIVE.','notFound.home':'← BACK HOME',
    'showcase.3dLabel':'3D PHAN HỮU emblem with glowing blue orbits', 'showcase.online3d':'DESIGN SYSTEM ONLINE', 'intro.open':'Opening the PHAN HỮU Portfolio', 'intro.crafting':'CRAFTING THE EXPERIENCE', 'tech.notUpdated':'Technologies not specified', 'loading.projects':'Loading projects...','loading.error':'Could not load projects:', 'art.preview':'View project visuals',
  }
};

/** Browser preference only: never uses IP, geolocation, cookies, saved language or a visible selector. */
export function detectBrowserLanguage():Locale {
  if(typeof navigator==='undefined')return 'en';
  const browserLanguages = navigator.languages?.length ? navigator.languages : [navigator.language];
  const preferred = browserLanguages.find(Boolean) ?? 'en';
  // Use the visitor's FIRST preferred locale, not a secondary fallback that may not represent their choice.
  const primary = preferred.toLowerCase().split('-')[0];
  return primary==='vi' ? 'vi' : 'en';
}

type I18nContextValue={language:Locale;t:(key:string)=>string};
const I18nContext=createContext<I18nContextValue|null>(null);
export function LanguageProvider({children}:{children:ReactNode}) {
  const [language,setCurrentLanguage]=useState<Locale>(detectBrowserLanguage);
  // Browser language may change while a tab is still open.
  useEffect(()=>{
    const update=()=>setCurrentLanguage(detectBrowserLanguage());
    window.addEventListener('languagechange',update);
    return()=>window.removeEventListener('languagechange',update);
  },[]);
  useEffect(()=>{
    document.documentElement.lang=language;
    document.title = language==='vi'?'Phan Hữu | Lập trình & Thiết kế sáng tạo':'Phan Hữu | Creative Development & Design';
    const description=document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if(description)description.content=language==='vi'?'Portfolio Phan Hữu: website, lập trình sáng tạo và các dự án thiết kế thương hiệu.':'Phan Hữu creative portfolio: development, websites and visual design projects.';
  },[language]);
  const t=useCallback((key:string)=>messages[language][key]??messages.en[key]??key,[language]);
  const value=useMemo(()=>({language,t}),[language,t]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
export function useI18n(){const ctx=useContext(I18nContext);if(!ctx)throw new Error('useI18n requires LanguageProvider');return ctx;}
