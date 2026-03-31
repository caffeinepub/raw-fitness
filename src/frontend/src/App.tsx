export default function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#111",
        color: "#ccc",
        fontFamily: "sans-serif",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem", color: "#fff" }}>
        Site Not Available
      </h1>
      <p style={{ fontSize: "1rem", maxWidth: "400px" }}>
        This site is currently unavailable. Please check back later.
      </p>
    </div>
  );
}
