export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
        Welcome to Sandboxing
      </h1>
      <p style={{ fontSize: "1.125rem", color: "#666" }}>
        Get started by editing <code style={{ background: "#f5f5f5", padding: "0.25rem 0.5rem", borderRadius: "4px" }}>src/app/page.tsx</code>
      </p>
    </div>
  );
}
