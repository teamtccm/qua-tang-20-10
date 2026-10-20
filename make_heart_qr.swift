import Foundation
import AppKit
import CoreImage
import CoreGraphics
import Vision

let link = CommandLine.arguments.count > 1 ? CommandLine.arguments[1] : "https://i.dlove.vn/index.html?fc8e1763db7249b6"
let bgPath = CommandLine.arguments.count > 2 ? CommandLine.arguments[2] : "/Users/macos/.gemini/antigravity/brain/53db644d-30ce-4755-a5e0-1a6006960759/scratch/dlove_src/bg_cb44.jpg"
let outPath = CommandLine.arguments.count > 3 ? CommandLine.arguments[3] : "/Users/macos/.gemini/antigravity/brain/53db644d-30ce-4755-a5e0-1a6006960759/demo_20_10_heart_qr.png"

// 1. Generate QR Matrix using CIQRCodeGenerator (Level M or H)
let filter = CIFilter(name: "CIQRCodeGenerator")!
filter.setValue(link.data(using: .utf8), forKey: "inputMessage")
filter.setValue("M", forKey: "inputCorrectionLevel")
let ciImg = filter.outputImage!
let ciCtx = CIContext()
let cgQR = ciCtx.createCGImage(ciImg, from: ciImg.extent)!
let qrW = cgQR.width
let qrH = cgQR.height

// Read QR pixels (CIQRCodeGenerator adds a 1-module quiet zone around the QR code)
var qrPixels = [UInt8](repeating: 0, count: qrW * qrH * 4)
let cs = CGColorSpaceCreateDeviceRGB()
let qCtx = CGContext(data: &qrPixels, width: qrW, height: qrH, bitsPerComponent: 8, bytesPerRow: qrW * 4, space: cs, bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
qCtx.draw(cgQR, in: CGRect(x: 0, y: 0, width: qrW, height: qrH))

func isBlack(_ x: Int, _ y: Int) -> Bool {
    let idx = (y * qrW + x) * 4
    return qrPixels[idx] < 128
}

var minX = qrW, maxX = -1, minY = qrH, maxY = -1
for y in 0..<qrH {
    for x in 0..<qrW {
        if isBlack(x, y) {
            if x < minX { minX = x }
            if x > maxX { maxX = x }
            if y < minY { minY = y }
            if y > maxY { maxY = y }
        }
    }
}
let N = maxX - minX + 1
print("QR Module count N =", N)

// 2. Render Heart QR on 1000x1160 canvas (scale = 2 of 500x580) with top-left origin
let scale: CGFloat = 2.0
let cw = Int(500 * scale)
let ch = Int(580 * scale)
var heartPixels = [UInt8](repeating: 0, count: cw * ch * 4)
let hCtx = CGContext(data: &heartPixels, width: cw, height: ch, bitsPerComponent: 8, bytesPerRow: cw * 4, space: cs, bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!

// Flip CGContext so (0,0) is top-left like HTML5 Canvas
hCtx.translateBy(x: 0, y: CGFloat(ch))
hCtx.scaleBy(x: scale, y: -scale)

// Build Heart Path2D
let heartPath = CGMutablePath()
heartPath.move(to: CGPoint(x: 250, y: 138))
heartPath.addCurve(to: CGPoint(x: 150, y: 68), control1: CGPoint(x: 250, y: 93), control2: CGPoint(x: 205, y: 68))
heartPath.addCurve(to: CGPoint(x: 30, y: 182), control1: CGPoint(x: 83, y: 68), control2: CGPoint(x: 30, y: 116))
heartPath.addCurve(to: CGPoint(x: 250, y: 452), control1: CGPoint(x: 30, y: 252), control2: CGPoint(x: 102, y: 324))
heartPath.addCurve(to: CGPoint(x: 470, y: 182), control1: CGPoint(x: 398, y: 324), control2: CGPoint(x: 470, y: 252))
heartPath.addCurve(to: CGPoint(x: 350, y: 68), control1: CGPoint(x: 470, y: 116), control2: CGPoint(x: 417, y: 68))
heartPath.addCurve(to: CGPoint(x: 250, y: 138), control1: CGPoint(x: 295, y: 68), control2: CGPoint(x: 250, y: 93))
heartPath.closeSubpath()

// Seeded PRNG matching KetQua.js
var seed: UInt32 = 2166136261
for b in link.utf8 {
    seed ^= UInt32(b)
    seed = seed &* 16777619
}
func nextRand() -> Double {
    seed = seed &+ 0x6D2B79F5
    var t = seed ^ (seed >> 15)
    t = t &* (1 | seed)
    t = (t &+ (t ^ (t >> 7)) &* (61 | t)) ^ t
    return Double(t ^ (t >> 14)) / 4294967296.0
}

let vx: CGFloat = 250.0
let vy: CGFloat = 289.0
let nuaCheo: CGFloat = 151.0
let k: CGFloat = nuaCheo * sqrt(2.0)
let halfK: CGFloat = k / 2.0
let b: CGFloat = k / CGFloat(N)
let margin: CGFloat = 0.6 * b

hCtx.saveGState()
hCtx.addPath(heartPath)
hCtx.clip()
hCtx.translateBy(x: vx, y: vy)
hCtx.rotate(by: .pi / 4.0)

// Red color #e72626 -> (231, 38, 38)
hCtx.setFillColor(red: 231.0/255.0, green: 38.0/255.0, blue: 38.0/255.0, alpha: 1.0)

let S = Int(ceil(375.0 / b))
for gy in -S..<S {
    for gx in -S..<S {
        let t = (CGFloat(gy) + 0.5) * b
        let o = (CGFloat(gx) + 0.5) * b
        let r = nextRand()
        if abs(t) < halfK + margin && abs(o) < halfK + margin {
            continue
        }
        if r < 0.5 {
            hCtx.fill(CGRect(x: t - b/2.0, y: o - b/2.0, width: b + 0.15, height: b + 0.15))
        }
    }
}

// Draw core QR modules inside (-halfK, -halfK, k, k)
for my in 0..<N {
    for mx in 0..<N {
        if isBlack(minX + mx, minY + my) {
            let rx = -halfK + CGFloat(mx) * b
            let ry = -halfK + CGFloat(my) * b
            hCtx.fill(CGRect(x: rx, y: ry, width: b + 0.15, height: b + 0.15))
        }
    }
}
hCtx.restoreGState()

// Crop to non-transparent bounding box of heartPixels
var hMinX = cw, hMaxX = -1, hMinY = ch, hMaxY = -1
for y in 0..<ch {
    for x in 0..<cw {
        if heartPixels[(y * cw + x) * 4 + 3] > 8 {
            if x < hMinX { hMinX = x }
            if x > hMaxX { hMaxX = x }
            if y < hMinY { hMinY = y }
            if y > hMaxY { hMaxY = y }
        }
    }
}
hMinX = max(0, hMinX - 4)
hMinY = max(0, hMinY - 4)
hMaxX = min(cw - 1, hMaxX + 4)
hMaxY = min(ch - 1, hMaxY + 4)
let fullHeartCG = hCtx.makeImage()!
let croppedHeartCG = fullHeartCG.cropping(to: CGRect(x: hMinX, y: hMinY, width: hMaxX - hMinX + 1, height: hMaxY - hMinY + 1))!

// 3. Composite onto 1400x1820 Card with bg_cb44.jpg
let cardW = 1400
let cardH = 1820
var cardPixels = [UInt8](repeating: 255, count: cardW * cardH * 4)
let cCtx = CGContext(data: &cardPixels, width: cardW, height: cardH, bitsPerComponent: 8, bytesPerRow: cardW * 4, space: cs, bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!

if let bgNS = NSImage(contentsOfFile: bgPath),
   let bgCG = bgNS.cgImage(forProposedRect: nil, context: nil, hints: nil) {
    let s = max(CGFloat(cardW) / CGFloat(bgCG.width), CGFloat(cardH) / CGFloat(bgCG.height))
    let dw = CGFloat(bgCG.width) * s
    let dh = CGFloat(bgCG.height) * s
    cCtx.draw(bgCG, in: CGRect(x: (CGFloat(cardW) - dw)/2.0, y: (CGFloat(cardH) - dh)/2.0, width: dw, height: dh))
}

// Element coords from thiep_cb443c97726c7d26.json:
// x: 50.600424609668714, y: 66.7686319607236, w: 73.60095525369654
let elX = 50.600424609668714 / 100.0 * CGFloat(cardW)
let elY_top = 66.7686319607236 / 100.0 * CGFloat(cardW)
let elW = 73.60095525369654 / 100.0 * CGFloat(cardW)
let elH = elW * (CGFloat(croppedHeartCG.height) / CGFloat(croppedHeartCG.width))
// Convert top-left Y to bottom-left Y for CGContext.draw
let drawX = elX - elW / 2.0
let drawY = CGFloat(cardH) - elY_top - elH / 2.0
cCtx.draw(croppedHeartCG, in: CGRect(x: drawX, y: drawY, width: elW, height: elH))

let finalCG = cCtx.makeImage()!
let rep = NSBitmapImageRep(cgImage: finalCG)
let pngData = rep.representation(using: .png, properties: [:])!
try! pngData.write(to: URL(fileURLWithPath: outPath))
print("Saved Heart QR Card to:", outPath)

// 4. Verify QR readability with Apple Vision
let req = VNDetectBarcodesRequest()
let handler = VNImageRequestHandler(cgImage: finalCG, options: [:])
try? handler.perform([req])
if let results = req.results, !results.isEmpty {
    for r in results {
        print("Verified QR Scan Result:", r.symbology.rawValue, "->", r.payloadStringValue ?? "nil")
    }
} else {
    print("WARNING: QR not detected by Vision!")
}
