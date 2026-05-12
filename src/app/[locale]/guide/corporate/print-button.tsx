"use client";

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      style={{
        padding: "8px 16px",
        borderRadius: 6,
        fontSize: 13,
        fontWeight: 600,
        background: "#1E3A5F",
        color: "#fff",
        border: "none",
        cursor: "pointer",
      }}
    >
      PDF / Print
    </button>
  );
}
