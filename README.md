# 🌸 Web Quà Tặng 3D 20/10 & Bộ Tạo Mã QR Trái Tim ("Tim Dệt")

Dự án trang web quà tặng tương tác 3D nhân ngày Phụ Nữ Việt Nam 20/10 (tương thích 100% với **GitHub Pages**, **Vercel**, **Netlify**), gồm 3 màn hiệu ứng nối tiếp:
1. **Màn 1 — Bó Hoa Ảnh Tách Nền**: Chạm vào bó hoa hồng để 6 bức ảnh nở bung ra.
2. **Màn 2 — Vũ Trụ 3D Lời Chúc & Ảnh Bay**: Ấn giữ bó hoa để bay vào không gian 3D (`Three.js`) với lời chúc neon, trái tim 3D và ảnh kỷ niệm xoay $360^\circ$.
3. **Màn 3 — Phong Bì & Thư Tình 20/10**: Bấm vào biểu tượng phong bì góc trên bên phải để mở lá thư hoa hồng viết tay kèm nhạc nền.

---

## 🛠️ Cách tuỳ chỉnh lời chúc, bức thư, hình ảnh & nhạc nền

Bạn có **2 cách** cực dễ để chỉnh sửa nội dung:

### Cách 1: Sửa trực tiếp file `cauhinh.js`
Mở file [`cauhinh.js`](./cauhinh.js) bằng bất kỳ trình soạn thảo nào (hoặc sửa trực tiếp trên giao diện web của GitHub):
- **`flyingTexts`**: Sửa các câu chúc bay lơ lửng trong không gian 3D.
- **`letter.envelope`**: Sửa 3 dòng chữ ngoài vỏ phong bì (`topLine`, `headline`, `bottomLine`).
- **`letter.text`**: Sửa nội dung bức thư (dòng đầu bắt đầu bằng `"Gửi..."` sẽ tự động in bằng font chữ ký lớn).
- **`bouquetImages` & `flyingImages`**: Thay ảnh của bạn vào thư mục `assets/sample/` hoặc dán link ảnh trực tiếp.
- **`bgMusic`**: Đổi nhạc nền trong `assets/music/`.

### Cách 2: Sửa trực quan bằng trang `chinh-sua.html` & Xuất Thiệp QR Trái Tim
Truy cập đường dẫn `/chinh-sua.html` (trên máy hoặc sau khi đẩy lên GitHub Pages):
1. Sửa nội dung ở cột bên trái và xem thử trực tiếp ở khung điện thoại bên phải.
2. Bấm **`💾 Tải file cauhinh.js`** để lưu lại file cấu hình mới.
3. Chuyển sang tab **`💖 Thiệp QR Trái Tim`**, dán link GitHub Pages của bạn vào ô đường dẫn và bấm **`⬇️ Tải ảnh Thiệp QR (PNG nét cao)`**.

---

## 🚀 Hướng dẫn đẩy lên GitHub & Bật GitHub Pages miễn phí

Dự án đã được khởi tạo sẵn Git (`main` branch) và cấu hình toàn bộ đường dẫn tương đối (`./`) kèm file `.nojekyll` để chạy mượt trên GitHub Pages.

1. Tạo một Repository mới trên GitHub (ví dụ: `qua-tang-20-10`, để chế độ **Public**).
2. Mở Terminal tại thư mục dự án và chạy:
   ```bash
   git remote add origin https://github.com/<TEN_GITHUB_CUA_BAN>/qua-tang-20-10.git
   git push -u origin main
   ```
3. Trên GitHub, vào **Settings** $\rightarrow$ **Pages**:
   - Mục **Build and deployment** $\rightarrow$ **Source**: chọn **Deploy from a branch**.
   - Chọn nhánh **`main`** và thư mục **`/ (root)`** $\rightarrow$ bấm **Save**.
4. Đợi khoảng 1 phút, trang web của bạn sẽ hoạt động tại:
   - **Link tặng người thương (để gắn vào QR)**: `https://<TEN_GITHUB_CUA_BAN>.github.io/qua-tang-20-10/`
   - **Link trạm chỉnh sửa & tạo QR Trái Tim**: `https://<TEN_GITHUB_CUA_BAN>.github.io/qua-tang-20-10/chinh-sua.html`
