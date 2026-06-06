import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "GolfBooth — Mobile Golf Simulator Rental in Ottawa & Gatineau";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const oswald = await readFile(join(process.cwd(), "public/fonts/Oswald-Bold.woff"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0a0a0a",
          color: "#ffffff",
          fontFamily: "Oswald",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 18, height: 56, backgroundColor: "#1b6b3a" }} />
          <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: "-2px" }}>
            GOLFBOOTH
          </div>
        </div>
        <div style={{ marginTop: 28, fontSize: 44, fontWeight: 700, lineHeight: 1.15, maxWidth: 900 }}>
          Mobile Golf Simulator Rental
        </div>
        <div style={{ marginTop: 12, fontSize: 36, color: "#a1a1a1" }}>
          Ottawa &amp; Gatineau
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Oswald", data: oswald, weight: 700, style: "normal" }],
    },
  );
}
