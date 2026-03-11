import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "EMA.dev — Software & Systems Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              background: "linear-gradient(90deg, #2dd4bf, #a78bfa)",
              backgroundClip: "text",
              color: "transparent",
              letterSpacing: "-2px",
            }}
          >
            EMA.dev
          </div>
          <div
            style={{
              fontSize: 32,
              color: "#e2e8f0",
              fontWeight: 600,
              marginTop: "8px",
            }}
          >
            Software & Systems Engineer
          </div>
          <div
            style={{
              fontSize: 22,
              color: "#94a3b8",
              fontWeight: 400,
              marginTop: "12px",
            }}
          >
            Building beautiful things for the future.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
