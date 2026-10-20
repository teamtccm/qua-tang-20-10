#!/usr/bin/env python3
import http.server
import json
import os
import base64
import time
import re

PORT = 8899
ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
CARDS_DIR = os.path.join(ROOT_DIR, "thiep")

def load_all_cards():
    os.makedirs(CARDS_DIR, exist_ok=True)
    cards = {}
    for fname in sorted(os.listdir(CARDS_DIR)):
        if fname.endswith(".json"):
            cid = fname[:-5]
            try:
                with open(os.path.join(CARDS_DIR, fname), "r", encoding="utf-8") as f:
                    cards[cid] = json.load(f)
            except Exception:
                pass
    return cards

def write_cauhinh_js(default_cfg, cards_dict):
    js_content = (
        "// ============================================================================\n"
        "// 🌸 FILE CẤU HÌNH THÔNG ĐIỆP & DANH SÁCH NHIỀU THIỆP QR 20/10 🌸\n"
        "// 1 web duy nhất trên GitHub có thể tạo vô số mã QR khác nhau qua ?id=ma-thiep\n"
        "// ============================================================================\n\n"
        "window.CAU_HINH_QUA_TANG = " + json.dumps(default_cfg, ensure_ascii=False, indent=2) + ";\n\n"
        "// Danh sách các thiệp riêng biệt (Truy cập qua: index.html?id=ten-thiep hoặc index.html?ten-thiep)\n"
        "window.DANH_SACH_THIEP = " + json.dumps(cards_dict, ensure_ascii=False, indent=2) + ";\n"
    )
    with open(os.path.join(ROOT_DIR, "cauhinh.js"), "w", encoding="utf-8") as f:
        f.write(js_content)

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT_DIR, **kwargs)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        super().end_headers()

    def do_GET(self):
        if self.path.startswith("/api/cards"):
            cards = load_all_cards()
            self._send_json(200, {"ok": True, "cards": cards})
            return
        super().do_GET()

    def do_POST(self):
        length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(length)

        if self.path == "/api/save-config":
            try:
                payload = json.loads(body.decode("utf-8"))
                card_id = re.sub(r"[^a-zA-Z0-9_-]", "", str(payload.get("cardId", "macdinh")).strip()) or "macdinh"
                cfg = payload.get("config", payload)
                os.makedirs(CARDS_DIR, exist_ok=True)
                with open(os.path.join(CARDS_DIR, f"{card_id}.json"), "w", encoding="utf-8") as f:
                    json.dump(cfg, f, ensure_ascii=False, indent=2)

                cards = load_all_cards()
                default_cfg = cards.get("macdinh", cfg)
                write_cauhinh_js(default_cfg, cards)
                self._send_json(200, {"ok": True, "cardId": card_id, "cards": list(cards.keys())})
            except Exception as e:
                self._send_json(500, {"ok": False, "error": str(e)})
            return

        if self.path == "/api/delete-card":
            try:
                payload = json.loads(body.decode("utf-8"))
                card_id = re.sub(r"[^a-zA-Z0-9_-]", "", str(payload.get("cardId", "")).strip())
                if card_id and card_id != "macdinh":
                    fpath = os.path.join(CARDS_DIR, f"{card_id}.json")
                    if os.path.exists(fpath):
                        os.remove(fpath)
                cards = load_all_cards()
                default_cfg = cards.get("macdinh", {})
                if default_cfg:
                    write_cauhinh_js(default_cfg, cards)
                self._send_json(200, {"ok": True, "cards": list(cards.keys())})
            except Exception as e:
                self._send_json(500, {"ok": False, "error": str(e)})
            return

        if self.path == "/api/upload-image":
            try:
                data = json.loads(body.decode("utf-8"))
                filename = os.path.basename(data.get("filename", f"img-{int(time.time())}.png"))
                b64_data = data.get("dataUrl", "").split(",")[-1]
                raw_bytes = base64.b64decode(b64_data)
                sample_dir = os.path.join(ROOT_DIR, "assets", "sample")
                os.makedirs(sample_dir, exist_ok=True)
                safe_name = f"custom-{int(time.time()*1000)}-{filename}"
                out_path = os.path.join(sample_dir, safe_name)
                with open(out_path, "wb") as f:
                    f.write(raw_bytes)
                rel_url = f"./assets/sample/{safe_name}"
                self._send_json(200, {"ok": True, "url": rel_url})
            except Exception as e:
                self._send_json(500, {"ok": False, "error": str(e)})
            return

        if self.path == "/api/push-github":
            import subprocess
            try:
                subprocess.run(["git", "add", "-A"], cwd=ROOT_DIR, check=False)
                subprocess.run(
                    ["git", "commit", "-m", f"Update gift config & photos ({int(time.time())})"],
                    cwd=ROOT_DIR,
                    check=False
                )
                push_res = subprocess.run(
                    ["git", "push", "-u", "origin", "main"],
                    cwd=ROOT_DIR,
                    capture_output=True,
                    text=True
                )
                if push_res.returncode == 0:
                    self._send_json(200, {"ok": True, "message": "Đã đẩy cập nhật lên GitHub thành công!"})
                else:
                    self._send_json(500, {"ok": False, "error": push_res.stderr or push_res.stdout})
            except Exception as e:
                self._send_json(500, {"ok": False, "error": str(e)})
            return

        self._send_json(404, {"ok": False, "error": "Not found"})

    def _send_json(self, status, payload):
        raw = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(raw)))
        self.end_headers()
        self.wfile.write(raw)

if __name__ == "__main__":
    http.server.ThreadingHTTPServer.allow_reuse_address = True
    server = http.server.ThreadingHTTPServer(("0.0.0.0", PORT), CustomHandler)
    print(f"Serving at http://localhost:{PORT}/chinh-sua.html")
    server.serve_forever()
