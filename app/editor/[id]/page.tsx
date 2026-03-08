"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

export default function EditorPage() {
  const params = useParams();
  const sheetId = params.id;

  const rows = 10;
  const cols = 5;

  const [cells, setCells] = useState(
    Array(rows)
      .fill(null)
      .map(() => Array(cols).fill(""))
  );

  const handleChange = (r: number, c: number, value: string) => {
    const newCells = [...cells];
    newCells[r][c] = value;
    setCells(newCells);
  };

  return (
    <main style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "10px" }}>
        Spreadsheet Editor
      </h1>

      <p style={{ marginBottom: "20px" }}>
        Document ID: <b>{sheetId}</b>
      </p>

      <table style={{ borderCollapse: "collapse" }}>
        <tbody>
          {cells.map((row, r) => (
            <tr key={r}>
              {row.map((cell, c) => (
                <td key={c} style={{ border: "1px solid #ccc" }}>
                  <input
                    value={cell}
                    onChange={(e) =>
                      handleChange(r, c, e.target.value)
                    }
                    style={{
                      width: "100px",
                      height: "35px",
                      border: "none",
                      padding: "5px"
                    }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}