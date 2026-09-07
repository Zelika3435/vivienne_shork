import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#F3E6D4",
          borderRadius: 40,
        }}
      >
        <div
          style={{
            display: "flex",
            position: "relative",
            width: 120,
            height: 120,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 104,
              height: 88,
              background: "#C4B5A8",
              borderRadius: 999,
              border: "3px solid #7A7468",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 4,
              width: 28,
              height: 36,
              background: "#C4B5A8",
              border: "3px solid #7A7468",
              borderRadius: "18px 18px 8px 8px",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 34,
              top: 58,
              width: 18,
              height: 18,
              background: "#F4C7C2",
              borderRadius: 999,
            }}
          />
          <div
            style={{
              position: "absolute",
              right: 34,
              top: 58,
              width: 18,
              height: 18,
              background: "#F4C7C2",
              borderRadius: 999,
            }}
          />
        </div>
      </div>
    ),
    size,
  );
}
