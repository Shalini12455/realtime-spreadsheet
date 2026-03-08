export default function Home() {
  return (
    <main style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Realtime Spreadsheet Dashboard</h1>

      <p>Your project is deployed successfully 🎉</p>

      <button
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: "blue",
          color: "white",
          borderRadius: "5px"
        }}
      >
        Create New Spreadsheet
      </button>
    </main>
  );
}