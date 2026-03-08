export default function Home() {
  return (
    <main style={{ padding: "40px" }}>
      <h1>Realtime Spreadsheet Dashboard</h1>
      <p>Welcome to the spreadsheet app.</p>

      <a href="/editor/demo">
        <button
          style={{
            padding: "10px 20px",
            background: "blue",
            color: "white",
            borderRadius: "5px"
          }}
        >
          Open Spreadsheet
        </button>
      </a>
    </main>
  );
}