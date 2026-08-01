import { ImageResponse } from "next/og";
import { personalInfo } from "@/data/portfolio";

export const alt = "Prashik Kadam — AI & ML Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
          background: "#0A0F1C",
          backgroundImage:
            "radial-gradient(circle at 80% 15%, rgba(79,142,247,0.22) 0%, transparent 45%), radial-gradient(circle at 10% 90%, rgba(56,226,164,0.14) 0%, transparent 45%)",
          color: "#F0F4FF",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "#38E2A4",
            letterSpacing: "0.06em",
            marginBottom: 28,
          }}
        >
          AI &amp; ML Engineer · IIITDM Jabalpur
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 92,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
          }}
        >
          {personalInfo.name}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 34,
            color: "#97A1B3",
            marginTop: 28,
            lineHeight: 1.35,
            maxWidth: 900,
          }}
        >
          End-to-end AI systems — explainable medical imaging, IoT agriculture,
          and molecular prediction.
        </div>

        <div style={{ display: "flex", gap: 16, marginTop: 52 }}>
          {["93% imaging accuracy", "2 patents filed", "9 languages shipped"].map(
            (stat) => (
              <div
                key={stat}
                style={{
                  display: "flex",
                  fontSize: 24,
                  color: "#4F8EF7",
                  border: "1px solid rgba(79,142,247,0.4)",
                  background: "rgba(79,142,247,0.1)",
                  borderRadius: 999,
                  padding: "12px 26px",
                }}
              >
                {stat}
              </div>
            )
          )}
        </div>
      </div>
    ),
    size
  );
}
