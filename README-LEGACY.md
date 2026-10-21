# PHAN HỮU Portfolio V9 — React + Tailwind CSS 4

This version adds official Tailwind CSS v4 + Vite to V8 while retaining the overlay header, 3D motion, bilingual project metadata and Supabase Admin.

See **CHANGELOG-V9.md** for the migration and setup notes.

---

# V8 — Fix dứt điểm vùng đen giữa Header và Hero (22/10/2026)

> **Quan trọng:** File HTML preview của V7 chỉ là bản dựng tĩnh, không giống hoàn toàn ứng dụng React chạy tại localhost. V8 sửa **trực tiếp mã nguồn React** và bỏ các CSS bố cục cũ đang ghi đè nhau.

- Header dùng `position: fixed` và đè trên nền trang, không có spacer.
- Toàn bộ hình nền phủ từ **y=0**, xuyên phía sau header, có gradient nối liền giữa các phần.
- Thay vòng sáng ellipse cũ bằng SVG arc + lớp ambient glow, tránh dải cắt ngang như ảnh lỗi.
- Text hero đặt ở khoảng an toàn phía dưới header nhưng trong màn hình đầu, tương thích desktop và mobile.
- Các trang `/work`, `/about`, `/contact`, `/work/:slug` và trang 404 sử dụng cùng nền toàn màn hình; khu vực Admin không thay đổi.
- Không thay đổi database, bản dịch, quyền truy cập, sản phẩm hay API.

## Chạy **đúng** bản mới trên Windows

1. **Dừng Vite cũ** bằng `Ctrl+C` tại cửa sổ Terminal đang chạy `localhost:5173`.
2. **Giải nén ZIP V8 mới** sang thư mục riêng, mở Terminal ngay trong thư mục con `phan-huu-portfolio` có `package.json`.
3. Chạy:

   ```powershell
   corepack enable
   pnpm install
   pnpm dev -- --force
   ```

4. Mở `http://localhost:5173` và nhấn **Ctrl+Shift+R** để tải lại mà không dùng cache.
5. Nếu vẫn thấy giao diện cũ, mở DevTools (`F12`) → Console và nhập:

   ```js
   document.querySelector('[data-layout-version]')?.dataset.layoutVersion
   ```

   Kết quả phải là `"v8-edge-to-edge"`. Nếu khác hoặc `undefined`, localhost của bạn vẫn đang chạy source cũ hoặc port của ứng dụng khác.

6. Kiểm tra thêm `document.querySelector('.neone-hero')?.getBoundingClientRect().top` khi cuộn ở vị trí đầu trang; kết quả mong muốn khoảng **0px**.

**Tệp sửa quan trọng:** `src/pages/Home.tsx`, `src/styles/viewport-shell-v8.css`, `src/styles/header-3d.css`, `src/main.tsx`, `src/components/Layout.tsx`.

---

> **V6 — Bố cục đồng bộ cho tất cả trang:** xem [CHANGELOG-V6.md](./CHANGELOG-V6.md). Trang công khai đã được rút ngắn vùng trống đầu trang, giữ header cố định và thêm ánh sáng nền. Không có thay đổi database so với V5.

# PHAN HỮU Portfolio V5 — Automatic Language Detection

**Bản V5 không có nút chọn ngôn ngữ.** Giao diện công khai tự chọn dựa trên *ngôn ngữ ưu tiên đầu tiên của trình duyệt* (`navigator.languages[0]`, hoặc `navigator.language`). Nếu là `vi`, hiển thị Tiếng Việt; với `en` hay các ngôn ngữ chưa hỗ trợ, hiển thị English. Không dựa trên IP, GPS hoặc vị trí khách hàng. Khi đổi ngôn ngữ trình duyệt, tải lại trang để thấy kết quả; nếu trình duyệt phát `languagechange`, trang cũng cập nhật tự động.

- Từ điển giao diện: `src/i18n/index.tsx` (Tiếng Việt / English).
- Dữ liệu dự án song ngữ: `translations` lưu dạng JSONB theo slug trong bản ghi `projects`, gồm `title`, `subtitle`, `description`, `category`, `role`, `client`; ảnh, công nghệ, slug không thay đổi theo ngôn ngữ.
- Trên Admin `/admin/projects/new` hoặc `/admin/projects/:id/edit`, nhập hai phần **Localized content (VI / EN)**. Nếu một trường bản dịch bị bỏ trống, website hiển thị trường gốc của dự án, **không sử dụng dịch máy**.
- Với **Supabase V4 đang hoạt động**, **phải chạy** `supabase/migrate_v5_multilingual.sql` trong Supabase SQL Editor trước khi deploy mã nguồn V5. File này thêm cột `translations`, điền bản dịch mẫu cho 12 slug gốc (nếu có), không thay đổi ảnh/mô tả gốc hoặc quyền RLS; các bản dịch đã nhập được ưu tiên giữ lại.
- Với **Supabase mới**, chỉ cần chạy `supabase/schema.sql` vì cột `translations` đã có sẵn. Sau khi cấp quyền Admin, dùng nút `IMPORT 12 STARTER PROJECTS` trong quản trị để thêm các bản ghi mẫu có bản dịch.
- Khách hàng không thể thay đổi dự án; chính sách RLS hiện tại vẫn giới hạn thao tác ghi chỉ dành cho quản trị viên.
- Muốn hỗ trợ thêm `fr`, `ja`, `ko`..., cần bổ sung dictionary tương ứng, logic phát hiện ngôn ngữ và trường bản dịch trong Admin. Website **chưa tự dịch mọi ngôn ngữ trên thế giới**.

**Khởi chạy trên Windows:**

```powershell
corepack enable
corepack prepare pnpm@10.18.3 --activate
pnpm install
pnpm dev
```

**Kiểm thử thủ công:**

1. Trong Chrome, mở **Settings → Languages → Preferred languages**, chuyển **Tiếng Việt** lên đầu và tải lại Portfolio. Kết quả: menu “Trang chủ / Dự án / Giới thiệu / Liên hệ”, trang chủ và nội dung dự án tiếng Việt nếu có bản dịch.
2. Chuyển **English** lên đầu rồi tải lại. Kết quả: “Home / Projects / About / Contact”, giao diện và bản dịch tiếng Anh.
3. Chuyển sang ngôn ngữ chưa hỗ trợ (ví dụ Français): trang dùng English; không hiện dropdown.
4. Thử mở `/admin/projects/:id/edit` và sửa bản dịch một dự án. Sau khi lưu, ngôn ngữ khách truy cập quyết định phiên bản được hiển thị.

---

# PHAN HỮU — Floating Header & Spatial 3D Portfolio

A React + Vite + TypeScript + pnpm creative portfolio with a NEONE-inspired deep-navy theme, the PHAN HỮU logo, advanced animation effects, Supabase CRUD and Vercel deployment.

## Highlights

- Responsive public portfolio (`/`, `/work`, `/work/:slug`, `/about`, `/contact`) and protected Admin (`/admin/login`, `/admin/projects`).
- Twelve starter records: LihTech live website and eleven design / packaging showcases; a project can contain a cover, full gallery, video, links, software marks, status, order and featured flag.
- Admin: add / edit / delete / draft / publish projects; upload photos/videos and add multiple gallery URLs; controls guarded in Supabase Row Level Security.
- **Premium animations:** polished sticky glass header with scroll progress and a keyboard-accessible mobile menu, interactive layered 3D logo hero, one-time logo loading intro, glowing cursor on desktops, CSS star particles, route-enter transition, IntersectionObserver scroll reveals, 3D pointer tilt of cards, luminous tappable tool/software marks, floating logo and illuminated borders.
- **Accessibility & performance:** reduced-motion opt-out, no cursor glow or card 3D tilt on coarse/touch pointers, GPU-friendly transforms, lazy gallery assets, responsive from mobile to desktop.
- No third-party animation runtime required; all new motion features are built using React hooks, CSS and browser APIs.

## 1. Run locally — Windows PowerShell

Requirements: Node.js 20+, Corepack/pnpm. Run in the extracted `phan-huu-portfolio` directory:

```powershell
corepack enable
corepack prepare pnpm@10.18.3 --activate
pnpm install
pnpm dev
```

Open `http://localhost:5173`. Until Supabase is configured, **the public pages show 12 starter projects for UI evaluation**, and the Admin is intentionally inactive.

The standalone **animated HTML preview** is at `preview/phan-huu-header-3d-live-preview.html`; open it in a modern browser to see the motion effects without installing dependencies. This standalone HTML preview is **not** the React app and does not implement authentication or CRUD.

## 2. Supabase setup

1. Create a Supabase project at https://supabase.com/dashboard.
2. Use **SQL Editor** and run `supabase/schema.sql` on a new project.
3. In **Authentication → Users**, create your owner login (email/password).
4. Copy that authentication user's UUID and grant admin access in Supabase SQL Editor:

```sql
insert into public.portfolio_admins (user_id)
values ('YOUR-AUTH-USER-UUID');
```

5. Create `.env.local` by copying `.env.example` and filling in your Supabase project URL and **publishable/anon** key:

```dotenv
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_PUBLISHABLE_KEY
VITE_SITE_EMAIL=hello@yourdomain.com
VITE_GITHUB_URL=https://github.com/yourusername
VITE_LINKEDIN_URL=https://www.linkedin.com/in/yourusername
```

6. Restart `pnpm dev`, log in at `/admin/login`, and visit `/admin/projects`.
7. Press **IMPORT 12 STARTER PROJECTS** to add missing starter records. This does not overwrite projects you previously customized.
8. If you already imported design projects in an older release, press **SYNC DESIGN LOGOS** to update generic design-skill tags to the new software-chip examples and remove legacy Behance demo links from those known starter records. The sync **preserves media, title, descriptions, and customized software tags**. This is an explicit action and does not happen automatically on deployment.
9. Review the software tags for each record and modify them in Admin to reflect the **actual** applications/technologies you used. The default Photoshop/Illustrator/Figma and React/TypeScript/Vite chips are editable display examples, **not independent proof of the stack for a given real-world project**.

### Supabase security notes

- Never put your Supabase `service_role` key in `VITE_*` variables; these are included in the browser bundle. Only use the publishable/anon key in the frontend.
- Public visitors can query only published projects; unauthenticated users and signed-in non-admin accounts cannot modify records. RLS is the actual security boundary — hiding Admin routes is insufficient.
- `project-media` is a **public Storage bucket** in the included schema. Uploaded media URLs can be shared even for draft projects; do not upload confidential assets. For private media use a private bucket and signed URLs (not included).
- Removing a project or a gallery item deletes the database reference, not the underlying Storage object. Remove unused media in the Storage dashboard if needed.

## 3. Deploy to Vercel

1. Commit and push the project to your GitHub repository. `.env.local` is ignored by Git.
2. Go to https://vercel.com/new and import the repository.
3. Framework: **Vite**; root directory: repository root; install: `pnpm install`; build: `pnpm build`; output: `dist`.
4. Add `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, and optional social/email variables to Vercel Project Settings → Environment Variables.
5. Deploy. `vercel.json` rewrites client-side routes to `index.html`.
6. Manage projects via `/admin/login`; clients can read published items but cannot edit. New project database entries appear publicly after refresh; no redeploy is required.

## 4. Header and 3D animation architecture

- `src/components/Layout.tsx`: floating glass navigation, single-line PHAN HỮU wordmark, active-page indication, scroll progress, compact-on-scroll header, mobile menu with `aria-expanded`, Escape and click-outside dismissal.
- `src/components/HeroShowcase3D.tsx`: pointer-reactive depth scene built from the supplied logo, independent rotating orbit planes, glass depth frames and ambient glow. Pointer input is RAF-throttled and switches off for touch devices or reduced-motion preference.
- `src/styles/header-3d.css`: all new navigation and spatial-scene styles, responsive breakpoints and reduced-motion fallbacks. Loaded after `premium-motion.css` for targeted overrides.
- 3D styling is implemented with standard browser CSS perspective and transforms rather than a WebGL engine. The design intentionally avoids adding large dependencies.

## 5. Animation architecture

| Effect | Implementation | User interaction |
|---|---|---|
| Brand intro | `IntroLoader` | Plays once per tab for ~1.5s, skipped for reduced motion |
| Mouse-follow glow | `CursorGlow` | RAF-throttled move; desktop pointer only |
| Moving star particles | `ParticleField` | CSS keyframes with deterministic positions; pointer-events disabled |
| Route transitions | `AnimatedOutlet` | Fade/slide + glowing sweep on React Router navigation |
| Scroll reveal | `AnimatedOutlet` | IntersectionObserver and MutationObserver for dynamically fetched cards |
| Product 3D tilt | `ProjectCard.tsx` | Pointer movement rotates card in perspective and updates spotlight |
| Tap/hover tech logos | `TechnologyBadges.tsx` | Independent button chips with spring and luminous pulse |
| Branding/LED details | `premium-motion.css` | Shimmer buttons, floating logo, slow orbital accents |

The new effect components are located at `src/components/MotionExperience.tsx`. Style changes live in `src/styles/premium-motion.css`, imported **last** in `src/main.tsx` so older CSS remains intact.

### Adjust or disable effects

- Intro duration: `IntroLoader` timeouts `1050` and `1510` milliseconds.
- Particle count: `Array.from({length:34}` in `MotionExperience.tsx`.
- Tilt strength: multipliers `6` and `7` in `ProjectCard.tsx`.
- Glow size: `.cursor-glow` width/height in `premium-motion.css`.
- System **Reduce motion** accessibility setting disables loading, particle animation, 3D tilt, and other motion. The same behavior works automatically on supported mobile and desktop browsers.

## 6. Files, media, and software marks

| Path | Purpose |
|---|---|
| `src/data/demo.ts` | 12 editable starter projects |
| `src/components/TechnologyBadges.tsx` | Interactive chips |
| `src/components/TechnologyLogo.tsx` | Local technology/software SVG marks |
| `src/components/ProjectCard.tsx` | Project card, navigation and 3D tilt |
| `src/components/MotionExperience.tsx` | Intro, cursor, particles, route and scroll motion |
| `src/components/HeroShowcase3D.tsx` | Layered 3D logo stage and RAF pointer parallax |
| `src/styles/header-3d.css` | Floating header and spatial scene CSS |
| `src/styles/premium-motion.css` | New animation CSS |
| `src/pages/AdminProjects.tsx` | Import and explicit legacy logo sync |
| `src/lib/importBehance.ts` | Legacy-named starter import/sync helper (not a public Behance integration) |
| `public/favicon.png` | PH logo favicon |
| `public/images/phan-huu-logo.png` | Supplied PHAN HỮU logo |
| `supabase/schema.sql` | Database, RLS and public media bucket |
| `vercel.json` | SPA routing rewrite |

**Image limitation:** The design records still reference Behance-hosted image **CDN URLs** for covers. **Public outbound Behance project links have been removed**, but the image network requests are not yet local; some original cover URLs may stop working. Full multi-image galleries from each design project were not downloaded. Upload your owned originals through Admin → edit project → multiple media upload to make galleries complete and independent of the CDN. LihTech uses an illustrative SVG card, **not an actual website screenshot**.

## 7. Test checklist

```powershell
pnpm install
pnpm typecheck
pnpm build
pnpm dev
```

Check the Home view, Work filtering, project detail galleries, pressing technology logos (which must not navigate the card), mobile menu, and admin CRUD with Supabase. For motion behavior, try desktop hover, touch devices and reduced-motion preferences. The source-package environment allowed parsing/transpiling the TypeScript/TSX and a browser test of the independent standalone HTML preview at **1440px and 390px** without layout overflow or JavaScript page errors; **a production React build has not been verified**, because the npm registry was unreachable. Run `pnpm build` yourself before production deployment.

No account credentials, Supabase projects, GitHub repositories or Vercel deployments are created automatically by this package.

### Current verification

- Checked TypeScript/TSX syntax and all relative imports without installing packages.
- Validated CSS parser output.
- Rendered and inspected the standalone preview at desktop 1440px and mobile 390px. Confirmed no horizontal overflow, sticky header on scroll, working mobile navigation and pointer-induced 3D scene movement.
- `pnpm install`, `pnpm typecheck` and `pnpm build` could not run here because the npm registry is unreachable (`EAI_AGAIN`). Run them on your machine or Vercel before publishing.

**Existing Supabase projects:** This update does not migrate or overwrite any records. The Admin CRUD, RLS configuration and media fields are unchanged.


## V4 — Fixed header sát mép trên

- Header public có `position: fixed` và `top: 10px` trên desktop, `6px` trên mobile.
- Khi cuộn, header vẫn ở đỉnh màn hình và tự thu gọn.
- `.fixed-header-spacer` dành chỗ cho thanh điều hướng, tránh che hero.
- Các điểm neo và route được bù khoảng cuộn (`scroll-padding-top`).
- Quy tắc nằm cuối `src/styles/header-3d.css`, giao diện ở `src/components/Layout.tsx`.
- Chức năng Admin CRUD, Supabase, Vercel và animation 3D giữ nguyên.


## V7 — Header phủ lên website (full viewport)
Header được cố định phía trên, không chừa spacer; nền các trang chiếm toàn màn hình. File CSS ghi đè nằm ở `src/styles/viewport-overlay-v7.css`. Thay đổi không yêu cầu migration Supabase.
