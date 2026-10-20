// ============================================================================
// 🌸 FILE CẤU HÌNH THÔNG ĐIỆP QUÀ TẶNG 20/10 (DỄ DÀNG CHỈNH SỬA) 🌸
// Bạn chỉ cần sửa nội dung chữ trong dấu ngoặc kép "..." bên dưới rồi lưu lại!
// Hoặc mở trang ./chinh-sua.html trên trình duyệt để sửa trực quan và xuất mã QR.
// ============================================================================

window.CAU_HINH_QUA_TANG = {
  // 0. MÀN MỞ ĐẦU: KHÓA MẬT KHẨU 4 SỐ & 2 CHÚ GẤU CHẠY LẠI ÔM NHAU
  passcode: {
    enabled: true,
    pin: "2010",
    title: "Nhập mật khẩu tình yêu 💖",
    subtitle: "Nhập đúng 4 chữ số đặc biệt để 2 chú gấu gặp nhau và mở bó hoa nhé!",
    hint: "Gợi ý: Ngày Phụ nữ Việt Nam (4 chữ số: 2010)"
  },

  // 1. Bật/tắt các màn hiệu ứng
  enableRain: true,       // Màn 2: Không gian 3D chữ & ảnh bay
  enableLetter: true,     // Màn 3: Phong bì & bức thư tình 20/10
  flyingHearts: true,     // Trái tim 3D màu đỏ bay cùng chữ
  palette: "hongdon",     // Màu chữ 3D: "hongdon" (Hồng), "hong" (Hồng xanh chuyển sắc), "vang" (Vàng ấm)

  // 2. CÁC CÂU CHÚC BAY TRONG KHÔNG GIAN 3D (Màn 2)
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
    envelope: {
      topLine: "Dành tặng em",
      headline: "20/10",
      bottomLine: "Một chút yêu thương"
    },
    text: `Gửi cô gái bé nhỏ của anh 🤍

Anh chúc em ngày 20/10 lúc nào cũng xinh đẹp, may mắn, nhiều sức khỏe và lúc nào cũng vui vẻ. Anh mong rằng em sẽ đồng hành cùng anh trên chặng đường phía trước.

Cảm ơn em vì tất cả. 🫶
Anh yêu em bé của anh.`,
    photo: "./assets/sample/bouquet-4.webp"
  },

  // 4. HỘP QUÀ BÍ MẬT CUỐI BỨC THƯ — BỐC THĂM "VOUCHER TÌNH YÊU"
  vouchers: {
    enabled: true,
    buttonText: "🎁 Mở Hộp Quà Bí Mật 20/10",
    modalTitle: "🎁 Bốc Thăm Hộp Quà Bí Mật 20/10",
    modalSubtitle: "Chạm vào 1 trong 3 hộp quà bên dưới để nhận phần thưởng đặc quyền từ anh nhé!",
    items: [
      "🎟️ Voucher Ăn Tối Lãng Mạn: 1 buổi đi ăn đồ nướng / lẩu bất kỳ do em chọn, anh bao trọn gói 100%!",
      "🧋 Thẻ Quyền Lực Trà Sữa & Đồ Ngọt: Miễn phí trà sữa full topping + bánh ngọt suốt cả tuần lễ 20/10!",
      "👗 Phiếu Mua Sắm Công Chúa: Chốt đơn ngay 1 món đồ bất kỳ trong giỏ hàng Shopee / TikTok Shop của em!"
    ]
  },

  // 5. ẢNH NỞ RA TRONG BÓ HOA (Màn 1 - Tối đa 6 ảnh)
  bouquetImages: [
    "./assets/sample/bouquet-1.webp",
    "./assets/sample/bouquet-2.webp",
    "./assets/sample/bouquet-3.webp",
    "./assets/sample/bouquet-4.webp",
    "./assets/sample/bouquet-5.webp",
    "./assets/sample/bouquet-6.webp"
  ],
  bouquetCutouts: [true, true, true, true, true, true],

  // 6. ẢNH KỶ NIỆM BAY TRONG KHÔNG GIAN 3D (Màn 2 - Tối đa 10 ảnh)
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

  // 7. NHẠC NỀN PHÁT TỰ ĐỘNG KHI MỞ HOA
  bgMusic: "./assets/music/tiktok-20-10.mp3",

  showWatermark: false
};
