// ============================================================================
// 🌸 FILE CẤU HÌNH THÔNG ĐIỆP QUÀ TẶNG 20/10 (DỄ DÀNG CHỈNH SỬA) 🌸
// Bạn chỉ cần sửa nội dung chữ trong dấu ngoặc kép "..." bên dưới rồi lưu lại!
// Hoặc mở trang ./chinh-sua.html trên trình duyệt để sửa trực quan và xuất mã QR.
// ============================================================================

window.CAU_HINH_QUA_TANG = {
  // 1. Bật/tắt các màn hiệu ứng
  enableRain: true,       // Màn 2: Không gian 3D chữ & ảnh bay
  enableLetter: true,     // Màn 3: Phong bì & bức thư tình 20/10
  flyingHearts: true,     // Trái tim 3D màu đỏ bay cùng chữ
  palette: "hongdon",     // Màu chữ 3D: "hongdon" (Hồng), "hong" (Hồng xanh chuyển sắc), "vang" (Vàng ấm)

  // 2. CÁC CÂU CHÚC BAY TRONG KHÔNG GIAN 3D (Màn 2)
  // Thêm, bớt hoặc sửa bất kỳ câu nào bạn muốn:
  flyingTexts: [
    "Chúc em luôn vui vẻ và hạnh phúc",
    "Chúc em luôn xinh đẹp",
    "Chúc em luôn yêu đời",
    "Chúc mừng ngày phụ nữ Việt Nam",
    "20/10",
    "yêu em",
    "Chúc em thật nhiều may mắn",
    "mãi yêu em",
    "Mong mọi điều dịu dàng sẽ đến với em"
  ],

  // 3. NỘI DUNG PHONG BÌ & BỨC THƯ TÌNH (Màn 3 - Khi bấm vào icon Phong Bì góc phải)
  letter: {
    // 3 dòng chữ in bên ngoài nắp phong bì hồng:
    envelope: {
      topLine: "Dành tặng em",
      headline: "20/10",
      bottomLine: "Một chút yêu thương"
    },

    // Nội dung bức thư bên trong:
    // Lưu ý: Dòng đầu tiên bắt đầu bằng "Gửi...", "Thân gửi...", "Dear..." sẽ tự động
    // được làm tiêu đề chữ ký nghệ thuật lớn ở đầu trang thư.
    text: `Gửi cô gái bé nhỏ của anh 🤍

Anh chúc em ngày 20/10 lúc nào cũng xinh đẹp, may mắn, nhiều sức khỏe và lúc nào cũng vui vẻ. Anh mong rằng em sẽ đồng hành cùng anh trên chặng đường phía trước.

Cảm ơn em vì tất cả. 🫶
Anh yêu em bé của anh.`,

    // Ảnh nhỏ đính kèm ở góc dưới bên phải tờ thư:
    photo: "./assets/sample/bouquet-4.webp"
  },

  // 4. ẢNH NỞ RA TRONG BÓ HOA (Màn 1 - Tối đa 6 ảnh)
  // Bạn có thể thay ảnh trong thư mục ./assets/sample/ hoặc dán link ảnh bất kỳ
  bouquetImages: [
    "./assets/sample/bouquet-1.webp",
    "./assets/sample/bouquet-2.webp",
    "./assets/sample/bouquet-3.webp",
    "./assets/sample/bouquet-4.webp",
    "./assets/sample/bouquet-5.webp",
    "./assets/sample/bouquet-6.webp"
  ],
  // true = ảnh đã tách nền (hiển thị nổi khối trong bó hoa), false = hiển thị khung thẻ ảnh
  bouquetCutouts: [true, true, true, true, true, true],

  // 5. ẢNH KỶ NIỆM BAY TRONG KHÔNG GIAN 3D (Màn 2 - Tối đa 10 ảnh)
  flyingImages: [
    "./assets/sample/flying-1.webp",
    "./assets/sample/flying-2.webp",
    "./assets/sample/flying-3.webp",
    "./assets/sample/flying-4.webp",
    "./assets/sample/flying-5.webp",
    "./assets/sample/flying-6.webp",
    "./assets/sample/flying-7.webp",
    "./assets/sample/flying-8.webp",
    "./assets/sample/flying-9.webp",
    "./assets/sample/flying-10.webp"
  ],

  // 6. NHẠC NỀN PHÁT TỰ ĐỘNG KHI MỞ HOA
  // Có sẵn: "./assets/music/tiktok-20-10.mp3" (nhạc gốc trong video TikTok)
  // hoặc "./assets/music/bongtrang.mp3"
  bgMusic: "./assets/music/tiktok-20-10.mp3",

  showWatermark: false
};
