const T = /[©®™]/;
const u = new RegExp("\\p{Extended_Pictographic}(?:\\p{Emoji_Modifier}|️|‍\\p{Extended_Pictographic})*|[0-9#*]️?⃣|[\\u{1F1E6}-\\u{1F1FF}]{2}", "gu");

function U(e) {
  if (typeof e !== "string") return false;
  u.lastIndex = 0;
  let t;
  while ((t = u.exec(e)) !== null) {
    if (!T.test(t[0])) return true;
  }
  return false;
}

function j(e) {
  return typeof e !== "string" || !e
    ? ""
    : e.replace(u, t => (T.test(t) ? t : "")).replace(/[ \t]{2,}/g, " ").trim();
}

async function x() {
  return null;
}

async function v() {}

function fixRelPath(p) {
  if (typeof p !== "string") return p;
  const s = p.trim();
  if (s.startsWith("/assets/")) return "." + s;
  if (s.startsWith("assets/")) return "./" + s;
  return s;
}

function normalizeConfigPaths(cfg) {
  if (!cfg || typeof cfg !== "object") return { productType: "photobouquet" };
  const out = { ...cfg, productType: "photobouquet" };
  let rawBouquet = Array.isArray(out.bouquetImages)
    ? out.bouquetImages.map(fixRelPath).filter(Boolean)
    : [];
  let rawFlying = Array.isArray(out.flyingImages)
    ? out.flyingImages.map(fixRelPath).filter(Boolean)
    : [];

  // Nếu điền nhiều hơn 6 ảnh ở phần đường dẫn ảnh:
  // 6 ảnh đầu cho vào bó hoa, các ảnh từ thứ 7 trở đi cho vào phần các câu chúc 3D
  if (rawBouquet.length > 6) {
    const extraForWishes = rawBouquet.slice(6);
    rawBouquet = rawBouquet.slice(0, 6);
    const merged = [...extraForWishes];
    for (const img of rawFlying) {
      if (!merged.includes(img)) merged.push(img);
    }
    rawFlying = merged;
  }

  out.bouquetImages = rawBouquet;
  out.bouquetCutouts = rawBouquet.map((_, idx) =>
    Array.isArray(out.bouquetCutouts) && typeof out.bouquetCutouts[idx] === "boolean"
      ? out.bouquetCutouts[idx]
      : true
  );
  out.flyingImages = rawFlying;

  if (typeof out.bgMusic === "string") {
    out.bgMusic = fixRelPath(out.bgMusic);
  }
  if (out.letter && typeof out.letter === "object") {
    out.letter = {
      ...out.letter,
      photo: fixRelPath(out.letter.photo)
    };
  }
  return out;
}

function decodeBase64UTF8(b64) {
  try {
    const binStr = atob(b64.replace(/-/g, "+").replace(/_/g, "/"));
    const bytes = Uint8Array.from(binStr, c => c.charCodeAt(0));
    return JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    return null;
  }
}

function extractCardId(loc = location) {
  const params = new URLSearchParams(loc.search);
  if (params.get("id")) return params.get("id").trim();
  // Hỗ trợ dạng ngắn giống gốc: index.html?ma-thiep
  const rawSearch = (loc.search || "").replace(/^\?+/, "").trim();
  if (rawSearch) {
    const firstPart = rawSearch.split("&")[0].trim();
    if (firstPart && !firstPart.includes("=")) {
      return decodeURIComponent(firstPart);
    }
  }
  return "";
}

function parseLocation(loc = location) {
  const params = new URLSearchParams(loc.search);
  const cardId = extractCardId(loc);
  return {
    preview: params.get("preview") === "1",
    embed: params.get("embed") === "1",
    scene: params.get("scene") || "",
    slug: "",
    websiteId: cardId || "macdinh",
    studio: ""
  };
}

async function M() {
  const diaChi = parseLocation();
  const params = new URLSearchParams(location.search);
  const baseConfig = (typeof window !== "undefined" && window.CAU_HINH_QUA_TANG) ? window.CAU_HINH_QUA_TANG : {};
  const allCards = (typeof window !== "undefined" && window.DANH_SACH_THIEP) ? window.DANH_SACH_THIEP : {};

  // 1. Nếu đang xem thử trực tiếp từ trang chỉnh sửa (./chinh-sua.html)
  if (diaChi.preview) {
    try {
      const raw = localStorage.getItem("CUSTOM_GIFT_CONFIG_20_10");
      if (raw) {
        const parsed = JSON.parse(raw);
        return { trangThai: "ok", config: normalizeConfigPaths({ ...baseConfig, ...parsed }), diaChi };
      }
    } catch {}
  }

  // 2. Nếu có mã thiệp cụ thể trên link (VD: ?id=nguoi-1 hoặc ?nguoi-1)
  const cardId = extractCardId();
  if (cardId) {
    // 2a. Tìm trong window.DANH_SACH_THIEP (cauhinh.js)
    if (allCards && allCards[cardId]) {
      return {
        trangThai: "ok",
        config: normalizeConfigPaths({ ...baseConfig, ...allCards[cardId] }),
        diaChi
      };
    }
    // 2b. Hoặc tải từ file ./thiep/<cardId>.json
    try {
      const res = await fetch(`./thiep/${encodeURIComponent(cardId)}.json?t=${Date.now()}`);
      if (res.ok) {
        const cardData = await res.json();
        return {
          trangThai: "ok",
          config: normalizeConfigPaths({ ...baseConfig, ...cardData }),
          diaChi
        };
      }
    } catch {}
  }

  // 3. Nếu trong URL có tham số ?data= (nhúng trực tiếp dữ liệu trong link)
  const encoded = params.get("data");
  if (encoded) {
    const decoded = decodeBase64UTF8(encoded);
    if (decoded) {
      const merged = {
        ...baseConfig,
        ...decoded,
        letter: {
          ...(baseConfig.letter || {}),
          ...(decoded.letter || {}),
          envelope: {
            ...((baseConfig.letter && baseConfig.letter.envelope) || {}),
            ...((decoded.letter && decoded.letter.envelope) || {})
          }
        }
      };
      return { trangThai: "ok", config: normalizeConfigPaths(merged), diaChi };
    }
  }

  // 4. Mặc định: Đọc thiệp mặc định trong ./cauhinh.js
  return {
    trangThai: "ok",
    config: normalizeConfigPaths(baseConfig),
    diaChi
  };
}

export { j as b, U as c, x as d, v as g, M as t };
