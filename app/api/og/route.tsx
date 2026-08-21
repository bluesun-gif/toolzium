import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title") || "Toolzium";
    const desc =
      searchParams.get("desc") ||
      "570+ Free, Fast, & Privacy-Friendly Online Developer & Everyday Tools";
    const cat = searchParams.get("cat") || "Free Online Tools";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-between",
            padding: "60px 80px",
            backgroundColor: "#09090b",
            backgroundImage:
              "radial-gradient(circle at 25px 25px, #27272a 2%, transparent 0%), radial-gradient(circle at 75px 75px, #27272a 2%, transparent 0%)",
            backgroundSize: "100px 100px",
            fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            color: "#ffffff",
          }}
        >
          {/* Ambient Glowing Blobs */}
          <div
            style={{
              position: "absolute",
              top: "-100px",
              right: "-100px",
              width: "450px",
              height: "450px",
              borderRadius: "50%",
              backgroundColor: "rgba(147, 51, 234, 0.25)",
              filter: "blur(120px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-100px",
              left: "-100px",
              width: "450px",
              height: "450px",
              borderRadius: "50%",
              backgroundColor: "rgba(59, 130, 246, 0.2)",
              filter: "blur(120px)",
            }}
          />

          {/* Header Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              zIndex: 10,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "14px",
                  backgroundColor: "#7c3aed",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 8px 24px rgba(124, 58, 237, 0.4)",
                }}
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                </svg>
              </div>
              <span
                style={{
                  fontSize: "32px",
                  fontWeight: 900,
                  letterSpacing: "-0.03em",
                  color: "#ffffff",
                }}
              >
                Toolzium
              </span>
            </div>

            {/* Category Tag */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "8px 20px",
                borderRadius: "9999px",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                fontSize: "18px",
                fontWeight: 600,
                color: "#c084fc",
              }}
            >
              {cat}
            </div>
          </div>

          {/* Main Title & Description */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              maxWidth: "1000px",
              zIndex: 10,
              margin: "auto 0",
            }}
          >
            <h1
              style={{
                fontSize: title.length > 30 ? "54px" : "64px",
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: "-0.04em",
                color: "#ffffff",
                margin: 0,
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: "24px",
                lineHeight: 1.4,
                color: "#a1a1aa",
                margin: 0,
                maxHeight: "72px",
                overflow: "hidden",
              }}
            >
              {desc}
            </p>
          </div>

          {/* Footer Badge Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              paddingTop: "24px",
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              zIndex: 10,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#4ade80", fontSize: "18px", fontWeight: 700 }}>
                <span>✓</span> 100% Free
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#60a5fa", fontSize: "18px", fontWeight: 700 }}>
                <span>🔒</span> In-Browser Privacy
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#f472b6", fontSize: "18px", fontWeight: 700 }}>
                <span>⚡</span> Zero Installation
              </div>
            </div>

            <div
              style={{
                fontSize: "20px",
                fontWeight: 800,
                color: "#e4e4e7",
                letterSpacing: "-0.02em",
              }}
            >
              toolzium.com
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: unknown) {
    const err = e as Error;
    return new Response(`Failed to generate the image: ${err?.message || "Unknown error"}`, {
      status: 500,
    });
  }
}
