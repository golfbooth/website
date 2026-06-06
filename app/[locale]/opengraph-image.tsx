import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/lib/site";

export const alt =
  "GolfBooth — Mobile Golf Simulator Rental in Ottawa & Gatineau";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const LOGO_HEIGHT = 108;
const LOGO_WIDTH = Math.round(LOGO_HEIGHT * (3760 / 780));

export default async function OgImage() {
  const [oswald, logo] = await Promise.all([
    readFile(join(process.cwd(), "public/fonts/Oswald-Bold.woff")),
    readFile(join(process.cwd(), "public/brand/logo.png")),
  ]);

  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#0a0a0a",
          color: "#ffffff",
          fontFamily: "Oswald",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
            <div
              style={{
                width: 6,
                height: LOGO_HEIGHT,
                backgroundColor: "#1b6b3a",
                borderRadius: 3,
                flexShrink: 0,
              }}
            />
            <img
              src={logoSrc}
              alt={site.name}
              width={LOGO_WIDTH}
              height={LOGO_HEIGHT}
              style={{ objectFit: "contain" }}
            />
          </div>

          <div
            style={{
              marginTop: 36,
              fontSize: 46,
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.5px",
              maxWidth: 980,
            }}
          >
            Mobile Golf Simulator Rental in Ottawa &amp; Gatineau
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #262626",
            paddingTop: 28,
          }}
        >
          <div
            style={{
              fontSize: 30,
              fontWeight: 700,
              letterSpacing: "2px",
              color: "#a1a1a1",
              textTransform: "uppercase",
            }}
          >
            {site.domain}
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: "1px",
              color: "#1b6b3a",
              textTransform: "uppercase",
            }}
          >
            {site.descriptor}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Oswald", data: oswald, weight: 700, style: "normal" }],
    },
  );
}
