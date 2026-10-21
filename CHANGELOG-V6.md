# PHAN HỮU Portfolio V6 — Đồng bộ khoảng cách các trang công khai

## Thay đổi

- Áp dụng bộ quy tắc `src/styles/page-spacing-v6.css` trên toàn bộ public routes: `/`, `/work`, `/work/:slug`, `/about`, `/contact` và trang 404.
- Giữ header PHAN HỮU dạng fixed. Giảm vùng đệm giữa header và nội dung, tránh nội dung bị che.
- Thêm hiệu ứng ánh sáng nền nhẹ, đồng bộ trên các trang con thay cho khoảng trống tối lớn.
- Trang chi tiết dự án: giảm khoảng trống phía dưới liên kết quay lại; bố cục xuất hiện sớm hơn.
- Trang dự án, giới thiệu, liên hệ và 404: rút gọn phần đầu và khoảng cách headline.
- Trang chủ: đưa hero gần header hơn, tinh chỉnh vòng sáng để tránh mảng xanh quá lớn khi render.
- Responsive tại 1440px, 930px, 750px và 540px; hỗ trợ `prefers-reduced-motion`.
- Không thay đổi Supabase schema, dữ liệu dự án, quyền RLS hoặc tính năng Admin.

## Triển khai từ V5

Chỉ cần thay mã nguồn frontend V5 bằng V6, giữ nguyên `.env.local` và chạy:

```powershell
corepack enable
pnpm install
pnpm build
pnpm dev
```

Đối với Vercel, commit/push mã nguồn V6 lên repository đang liên kết để chạy deploy. **Không cần chạy migration SQL mới** cho riêng lần chỉnh giao diện V6.

## Kiểm tra

- Đã kiểm tra cấu trúc 34 file TS/TSX và 87 đường dẫn import tương đối, không phát hiện lỗi cú pháp hoặc đường dẫn.
- Kiểm tra trình duyệt với bản HTML demo ở kích thước desktop 1440×900 và mobile 390×844 cho 6 loại trang; không bị tràn ngang; header cố định.
- HTML demo trong `preview/all-pages-spacing-preview.html` chỉ minh họa giao diện, không kết nối Supabase hay React runtime.
- Chưa chạy build production do môi trường hiện thiếu các dependencies npm/pnpm.
