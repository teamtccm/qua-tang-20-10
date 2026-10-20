import { t as loadConfig } from "./taiCauHinh-DjwS0AUQ.js";

const DEFAULT_PASSCODE = {
  enabled: true,
  pin: "2010",
  title: "Nhập mật khẩu tình yêu 💖",
  subtitle: "Nhập đúng 4 chữ số đặc biệt để 2 chú gấu gặp nhau và mở bó hoa nhé!",
  hint: "Gợi ý: Ngày Phụ nữ Việt Nam (4 chữ số: 2010)"
};

const DEFAULT_VOUCHERS = {
  enabled: true,
  buttonText: "🎁 Mở Hộp Quà Bí Mật 20/10",
  modalTitle: "🎁 Bốc Thăm Hộp Quà Bí Mật 20/10",
  modalSubtitle: "Chạm vào 1 trong 3 hộp quà bên dưới để nhận phần thưởng đặc quyền từ anh nhé!",
  items: [
    "🎟️ Voucher Ăn Tối Lãng Mạn: 1 buổi đi ăn đồ nướng / lẩu bất kỳ do em chọn, anh bao trọn gói 100%!",
    "🧋 Thẻ Quyền Lực Trà Sữa & Đồ Ngọt: Miễn phí trà sữa full topping + bánh ngọt suốt cả tuần lễ 20/10!",
    "👗 Phiếu Mua Sắm Công Chúa: Chốt đơn ngay 1 món đồ bất kỳ trong giỏ hàng Shopee / TikTok Shop của em!"
  ]
};

function injectExtraStyles() {
  if (document.getElementById("dlove-extra-features-css")) return;
  const style = document.createElement("style");
  style.id = "dlove-extra-features-css";
  style.textContent = `
    /* ==================== 1. MÀN KHÓA MẬT KHẨU 4 SỐ & 2 CHÚ GẤU ==================== */
    .dl-passcode-overlay {
      position: fixed;
      inset: 0;
      z-index: 99999;
      background: radial-gradient(ellipse at top, #2b102f 0%, #09040c 75%, #000000 100%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px 16px;
      color: #fff;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      user-select: none;
      transition: opacity 0.65s ease, transform 0.65s ease;
    }
    .dl-passcode-overlay.dl-unlocked {
      opacity: 0;
      transform: scale(1.08);
      pointer-events: none;
    }
    .dl-passcode-card {
      width: 100%;
      max-width: 360px;
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1.5px solid rgba(255, 105, 160, 0.32);
      border-radius: 28px;
      padding: 22px 18px 20px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), 0 0 35px rgba(255, 62, 128, 0.16);
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    .dl-bears-stage {
      width: 100%;
      height: 92px;
      background: linear-gradient(180deg, rgba(255, 182, 193, 0.1) 0%, rgba(255, 105, 160, 0.04) 100%);
      border: 1px solid rgba(255, 182, 193, 0.2);
      border-radius: 20px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 14px;
      overflow: hidden;
    }
    .dl-couple-avatar {
      width: 54px;
      height: 54px;
      border-radius: 50%;
      border: 2.5px solid #ff6b9d;
      object-fit: cover;
      box-shadow: 0 0 18px rgba(255, 62, 128, 0.55);
      z-index: 1;
      transition: transform 0.35s ease, opacity 0.35s ease;
    }
    .dl-bear-actor {
      position: absolute;
      bottom: 14px;
      font-size: 2.55rem;
      line-height: 1;
      transition: all 0.38s cubic-bezier(0.34, 1.56, 0.64, 1);
      z-index: 2;
      filter: drop-shadow(0 4px 10px rgba(0,0,0,0.4));
    }
    .dl-bear-heart-burst {
      position: absolute;
      top: 8px;
      font-size: 1.7rem;
      opacity: 0;
      transform: scale(0.4);
      transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
      z-index: 3;
    }
    .dl-bear-heart-burst.show {
      opacity: 1;
      transform: scale(1.25);
    }
    .dl-passcode-title {
      font-size: 1.12rem;
      font-weight: 800;
      color: #fff;
      margin: 0 0 5px;
      text-shadow: 0 2px 10px rgba(255, 62, 128, 0.45);
    }
    .dl-passcode-sub {
      font-size: 0.8rem;
      color: #e4c5d4;
      margin: 0 0 14px;
      line-height: 1.4;
      min-height: 2.2em;
    }
    .dl-pin-dots {
      display: flex;
      justify-content: center;
      gap: 14px;
      margin-bottom: 18px;
    }
    .dl-pin-dots.shake {
      animation: dlShake 0.4s ease;
    }
    @keyframes dlShake {
      0%, 100% { transform: translateX(0); }
      20%, 60% { transform: translateX(-8px); }
      40%, 80% { transform: translateX(8px); }
    }
    .dl-pin-dot {
      width: 15px;
      height: 15px;
      border-radius: 50%;
      border: 2px solid #ff6b9d;
      background: transparent;
      transition: all 0.2s ease;
    }
    .dl-pin-dot.filled {
      background: #ff3e80;
      box-shadow: 0 0 12px #ff3e80, 0 0 22px #ff6b9d;
      transform: scale(1.18);
    }
    .dl-keypad {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      max-width: 260px;
      margin: 0 auto;
    }
    .dl-key-btn {
      height: 52px;
      border-radius: 16px;
      border: 1px solid rgba(255, 130, 175, 0.3);
      background: rgba(255, 255, 255, 0.08);
      color: #fff;
      font-size: 1.22rem;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.15s, transform 0.12s, border-color 0.15s;
      -webkit-tap-highlight-color: transparent;
    }
    .dl-key-btn:hover {
      background: rgba(255, 62, 128, 0.24);
      border-color: #ff6b9d;
    }
    .dl-key-btn:active {
      background: #ff3e80;
      transform: scale(0.92);
    }
    .dl-key-btn.dl-key-small {
      font-size: 0.85rem;
      color: #ffb3cd;
    }

    /* ==================== 2. NÚT & MODAL HỘP QUÀ BÍ MẬT (VOUCHER CUỐI THƯ) ==================== */
    .dl-voucher-trigger-wrap {
      position: fixed;
      left: 50%;
      bottom: calc(env(safe-area-inset-bottom, 0px) + 18px);
      transform: translateX(-50%);
      z-index: 99990;
      display: none;
      pointer-events: auto;
    }
    .dl-voucher-trigger-wrap.visible {
      display: block;
      animation: dlPopUp 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    @keyframes dlPopUp {
      from { transform: translate(-50%, 30px) scale(0.8); opacity: 0; }
      to { transform: translate(-50%, 0) scale(1); opacity: 1; }
    }
    .dl-voucher-trigger-btn {
      border: 2px solid #ffe066;
      background: linear-gradient(135deg, #ff3e80 0%, #d91b5c 55%, #ff758f 100%);
      color: #fff;
      font-size: 0.95rem;
      font-weight: 800;
      padding: 12px 24px;
      border-radius: 999px;
      cursor: pointer;
      box-shadow: 0 8px 25px rgba(255, 62, 128, 0.55), 0 0 20px rgba(255, 224, 102, 0.45);
      display: inline-flex;
      align-items: center;
      gap: 8px;
      white-space: nowrap;
      animation: dlPulseBtn 1.8s infinite ease-in-out;
    }
    @keyframes dlPulseBtn {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.06); }
    }
    .dl-voucher-modal {
      position: fixed;
      inset: 0;
      z-index: 99998;
      background: rgba(12, 5, 16, 0.84);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      display: none;
      align-items: center;
      justify-content: center;
      padding: 20px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      color: #fff;
    }
    .dl-voucher-modal.open {
      display: flex;
    }
    .dl-voucher-dialog {
      width: 100%;
      max-width: 390px;
      background: linear-gradient(165deg, #2a112e 0%, #16081a 100%);
      border: 2px solid rgba(255, 120, 170, 0.45);
      border-radius: 28px;
      padding: 24px 20px;
      text-align: center;
      position: relative;
      box-shadow: 0 24px 60px rgba(0, 0, 0, 0.7), 0 0 40px rgba(255, 62, 128, 0.25);
    }
    .dl-voucher-close {
      position: absolute;
      top: 12px;
      right: 14px;
      width: 34px;
      height: 34px;
      border-radius: 50%;
      border: 1px solid rgba(255,255,255,0.2);
      background: rgba(255,255,255,0.08);
      color: #fff;
      font-size: 1.2rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .dl-voucher-boxes {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      margin: 18px 0;
    }
    .dl-gift-box {
      aspect-ratio: 1;
      border-radius: 20px;
      background: rgba(255, 95, 143, 0.14);
      border: 2px dashed rgba(255, 140, 180, 0.6);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.25s ease;
      padding: 8px;
    }
    .dl-gift-box:hover, .dl-gift-box.selected {
      background: rgba(255, 62, 128, 0.32);
      border-style: solid;
      border-color: #ffe066;
      transform: translateY(-5px) scale(1.05);
      box-shadow: 0 10px 25px rgba(255, 62, 128, 0.35);
    }
    .dl-gift-box-icon {
      font-size: 2.5rem;
      animation: dlWobble 2s infinite ease-in-out;
    }
    .dl-gift-box-label {
      font-size: 0.74rem;
      font-weight: 700;
      color: #ffc2d9;
      margin-top: 6px;
    }
    @keyframes dlWobble {
      0%, 100% { transform: rotate(0deg); }
      25% { transform: rotate(-7deg); }
      75% { transform: rotate(7deg); }
    }
    .dl-voucher-ticket {
      background: linear-gradient(135deg, #fff9db 0%, #ffe3ec 100%);
      color: #2b1025;
      border: 2.5px solid #f59f00;
      border-radius: 20px;
      padding: 16px 14px;
      margin-top: 10px;
      box-shadow: 0 10px 30px rgba(245, 159, 0, 0.25);
      display: none;
      animation: dlTicketReveal 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .dl-voucher-ticket.revealed {
      display: block;
    }
    @keyframes dlTicketReveal {
      from { transform: scale(0.75); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
    .dl-ticket-badge {
      display: inline-block;
      background: #d91b5c;
      color: #fff;
      font-size: 0.7rem;
      font-weight: 800;
      padding: 3px 10px;
      border-radius: 999px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      margin-bottom: 8px;
    }
    .dl-ticket-text {
      font-size: 0.94rem;
      font-weight: 800;
      color: #2b1025;
      line-height: 1.45;
      margin: 0 0 8px;
    }
    .dl-ticket-note {
      font-size: 0.75rem;
      color: #7a4b66;
      margin: 0;
      font-style: italic;
    }
  `;
  document.head.appendChild(style);
}

function setupPasscodeScreen(cfg) {
  const passCfg = Object.assign({}, DEFAULT_PASSCODE, cfg.passcode || {});
  if (!passCfg.enabled) return;

  const targetPin = String(passCfg.pin || "2010").trim();
  if (!targetPin) return;

  const avatarSrc =
    (cfg.letter && cfg.letter.photo) ||
    (Array.isArray(cfg.bouquetImages) && cfg.bouquetImages[0]) ||
    "./assets/sample/bouquet-4.webp";

  const overlay = document.createElement("div");
  overlay.className = "dl-passcode-overlay";
  overlay.innerHTML = `
    <div class="dl-passcode-card">
      <div class="dl-bears-stage">
        <span class="dl-bear-actor" id="dlBearLeft" style="left: 8%;">🐻‍❄️</span>
        <img class="dl-couple-avatar" id="dlCoupleAvatar" src="${avatarSrc}" alt="">
        <span class="dl-bear-heart-burst" id="dlBearHeart">💖</span>
        <span class="dl-bear-actor" id="dlBearRight" style="right: 8%;">🐻</span>
      </div>
      <h2 class="dl-passcode-title">${passCfg.title}</h2>
      <p class="dl-passcode-sub" id="dlPassSub">${passCfg.subtitle}</p>
      <div class="dl-pin-dots" id="dlPinDots">
        ${Array.from({ length: targetPin.length }).map(() => `<div class="dl-pin-dot"></div>`).join("")}
      </div>
      <div class="dl-keypad">
        ${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => `<button type="button" class="dl-key-btn" data-digit="${n}">${n}</button>`).join("")}
        <button type="button" class="dl-key-btn dl-key-small" data-action="clear">Xóa</button>
        <button type="button" class="dl-key-btn" data-digit="0">0</button>
        <button type="button" class="dl-key-btn dl-key-small" data-action="back">⌫</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  let entered = "";
  const len = targetPin.length;
  const bearL = overlay.querySelector("#dlBearLeft");
  const bearR = overlay.querySelector("#dlBearRight");
  const bearHeart = overlay.querySelector("#dlBearHeart");
  const coupleAvatar = overlay.querySelector("#dlCoupleAvatar");
  const subEl = overlay.querySelector("#dlPassSub");
  const dotsWrap = overlay.querySelector("#dlPinDots");
  const dots = overlay.querySelectorAll(".dl-pin-dot");

  function renderPinState() {
    dots.forEach((d, idx) => d.classList.toggle("filled", idx < entered.length));
    const ratio = len > 0 ? Math.min(1, entered.length / len) : 0;
    const offset = 8 + ratio * 28; // từ 8% tiến vào 36% (ôm nhau ở giữa)
    bearL.style.left = `${offset}%`;
    bearR.style.right = `${offset}%`;
  }

  function handleDigit(d) {
    if (entered.length >= len) return;
    entered += d;
    renderPinState();

    if (entered.length === len) {
      if (entered === targetPin) {
        bearHeart.classList.add("show");
        coupleAvatar.style.opacity = "0.25";
        coupleAvatar.style.transform = "scale(0.8)";
        subEl.textContent = "🎉 Mở khóa trái tim thành công! Chào mừng công chúa 💖";
        subEl.style.color = "#51cf66";
        setTimeout(() => {
          overlay.classList.add("dl-unlocked");
          setTimeout(() => overlay.remove(), 700);
        }, 850);
      } else {
        dotsWrap.classList.remove("shake");
        void dotsWrap.offsetWidth;
        dotsWrap.classList.add("shake");
        subEl.textContent = passCfg.hint || `Mật khẩu chưa đúng, thử lại nhé!`;
        subEl.style.color = "#ffd43b";
        setTimeout(() => {
          entered = "";
          renderPinState();
        }, 650);
      }
    }
  }

  overlay.querySelectorAll("[data-digit]").forEach(btn => {
    btn.addEventListener("click", () => handleDigit(btn.getAttribute("data-digit")));
  });
  overlay.querySelector('[data-action="clear"]').addEventListener("click", () => {
    entered = "";
    renderPinState();
  });
  overlay.querySelector('[data-action="back"]').addEventListener("click", () => {
    entered = entered.slice(0, -1);
    renderPinState();
  });

  window.addEventListener("keydown", e => {
    if (!document.body.contains(overlay)) return;
    if (/^[0-9]$/.test(e.key)) handleDigit(e.key);
    else if (e.key === "Backspace") {
      entered = entered.slice(0, -1);
      renderPinState();
    }
  });
}

function setupSecretVoucherFeature(cfg) {
  const vCfg = Object.assign({}, DEFAULT_VOUCHERS, cfg.vouchers || {});
  if (!vCfg.enabled) return;

  const items = Array.isArray(vCfg.items) && vCfg.items.length > 0
    ? vCfg.items
    : DEFAULT_VOUCHERS.items;

  // Tạo nút nổi ở cuối bức thư
  const triggerWrap = document.createElement("div");
  triggerWrap.className = "dl-voucher-trigger-wrap";
  triggerWrap.innerHTML = `
    <button type="button" class="dl-voucher-trigger-btn">
      ${vCfg.buttonText || DEFAULT_VOUCHERS.buttonText}
    </button>
  `;
  document.body.appendChild(triggerWrap);

  // Tạo Modal 3 Hộp Quà Bí Mật
  const modal = document.createElement("div");
  modal.className = "dl-voucher-modal";
  modal.innerHTML = `
    <div class="dl-voucher-dialog">
      <button type="button" class="dl-voucher-close" aria-label="Đóng">×</button>
      <h3 style="margin:0 0 6px;font-size:1.15rem;color:#ffd166;">${vCfg.modalTitle || DEFAULT_VOUCHERS.modalTitle}</h3>
      <p style="margin:0;font-size:0.82rem;color:#e4c5d4;line-height:1.4;">${vCfg.modalSubtitle || DEFAULT_VOUCHERS.modalSubtitle}</p>
      <div class="dl-voucher-boxes">
        <div class="dl-gift-box" data-box="0">
          <div class="dl-gift-box-icon">🎁</div>
          <div class="dl-gift-box-label">Hộp Quà 1</div>
        </div>
        <div class="dl-gift-box" data-box="1">
          <div class="dl-gift-box-icon">🎀</div>
          <div class="dl-gift-box-label">Hộp Quà 2</div>
        </div>
        <div class="dl-gift-box" data-box="2">
          <div class="dl-gift-box-icon">💝</div>
          <div class="dl-gift-box-label">Hộp Quà 3</div>
        </div>
      </div>
      <div class="dl-voucher-ticket" id="dlVoucherTicket">
        <span class="dl-ticket-badge">✨ VOUCHER ĐẶC QUYỀN 20/10 ✨</span>
        <p class="dl-ticket-text" id="dlTicketText"></p>
        <p class="dl-ticket-note">📸 Em hãy chụp màn hình chiếc thẻ này gửi cho anh để nhận quà ngay nhé!</p>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  triggerWrap.querySelector("button").addEventListener("click", () => {
    modal.classList.add("open");
  });
  modal.querySelector(".dl-voucher-close").addEventListener("click", () => {
    modal.classList.remove("open");
  });
  modal.addEventListener("click", e => {
    if (e.target === modal) modal.classList.remove("open");
  });

  const boxes = modal.querySelectorAll(".dl-gift-box");
  const ticket = modal.querySelector("#dlVoucherTicket");
  const ticketText = modal.querySelector("#dlTicketText");

  boxes.forEach(box => {
    box.addEventListener("click", () => {
      boxes.forEach(b => b.classList.remove("selected"));
      box.classList.add("selected");
      const idx = Number(box.getAttribute("data-box")) || 0;
      const prize = items[idx % items.length] || items[0];
      ticket.classList.remove("revealed");
      void ticket.offsetWidth;
      ticketText.textContent = prize;
      ticket.classList.add("revealed");
    });
  });

  // Theo dõi khi bức thư 20/10 được mở ra (.gift-scene[data-state="open"] hoặc "opening")
  const checkLetterState = () => {
    const openScene = document.querySelector('.gift-scene[data-state="open"]');
    triggerWrap.classList.toggle("visible", Boolean(openScene));
  };
  const observer = new MutationObserver(checkLetterState);
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["data-state", "class"]
  });
  setInterval(checkLetterState, 500);
}

async function initExtraFeatures() {
  injectExtraStyles();
  try {
    const res = await loadConfig();
    const cfg = (res && res.config) || window.CAU_HINH_QUA_TANG || {};
    setupPasscodeScreen(cfg);
    setupSecretVoucherFeature(cfg);
  } catch (e) {
    console.warn("Extra features init warning:", e);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initExtraFeatures);
} else {
  initExtraFeatures();
}
