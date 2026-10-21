# V7 — Header đè lên thân website / Full-screen viewport

- Xóa thẻ `.fixed-header-spacer` khỏi `Layout.tsx`. Header không còn chiếm không gian của phần thân.
- Header vẫn `position: fixed`, nổi đè lên nội dung với lớp nền kính mờ khi cuộn.
- Tất cả các trang công khai trải nền từ y=0, phủ toàn chiều rộng và tối thiểu một chiều cao màn hình (`100svh`).
- Giữ khoảng cách an toàn cho chữ/nút của hero và các trang con để không bị header che.
- Chỉnh ánh sáng của hero bắt đầu gần header hơn, đồng thời làm mờ rìa để tránh đường ngắt ngang.
- Responsive cho desktop, tablet và mobile. Không thay đổi phần Admin, Auth, dữ liệu và SQL.

Files: `src/components/Layout.tsx`, `src/main.tsx`, `src/styles/viewport-overlay-v7.css`.
