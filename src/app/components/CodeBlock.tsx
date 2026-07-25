export function CodeBlock({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div
      style={{
        background: "hsl(0, 0%, 13%)",
        border: "1px solid hsl(0, 0%, 25%)",
        borderRadius: "8px",
        padding: "1.5rem",
        overflow: "auto",
        ...style,
      }}
    >
      <pre
        style={{
          color: "#888",
          fontSize: "0.8rem",
          lineHeight: 1.6,
          margin: 0,
          whiteSpace: "pre-wrap",
          fontFamily: "monospace",
        }}
      >
        {children}
      </pre>
    </div>
  );
}
