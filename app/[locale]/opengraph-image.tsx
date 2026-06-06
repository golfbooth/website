import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/lib/site";

export const alt =
  "GolfBooth — Mobile Golf Simulator Rental in Ottawa & Gatineau";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const LOGO_ASPECT = 4200 / 1350;
const LOGO_HEIGHT = 156;
const LOGO_WIDTH = Math.round(LOGO_HEIGHT * LOGO_ASPECT);

export default async function OgImage() {
  const [oswald, logo] = await Promise.all([
    readFile(join(process.cwd(), "public/fonts/Oswald-Bold.woff")),
    readFile(join(process.cwd(), "public/brand/logo-front.png")),
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
          padding: "64px 72px",
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
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
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
              marginTop: 32,
              fontSize: 42,
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: "-0.5px",
              maxWidth: 1000,
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
            paddingTop: 24,
          }}
        >
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "2px",
              color: "#a1a1a1",
              textTransform: "uppercase",
            }}
          >
            {site.domain}
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
