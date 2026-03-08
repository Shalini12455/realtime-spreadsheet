"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "@/firebase/config";
import { doc, onSnapshot, setDoc } from "firebase/firestore";

type CellMap = {
  [key: string]: string;
};

export default function Editor() {
  const params = useParams();
  const id = params.id as string;

  const rows = 20;
  const cols = 10;

  const [cells, setCells] = useState<CellMap>({});
  const [saving, setSaving] = useState(false);
  const [users, setUsers] = useState<string[]>([]);

  const docRef = doc(db, "documents", id);

  /* ------------------ Presence (simple demo) ------------------ */

  useEffect(() => {
    // simulate active users
    setUsers(["Alice", "Bob", "You"]);
  }, []);

  /* ------------------ Firestore realtime sync ------------------ */

  useEffect(() => {
    const unsub = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        setCells(data.cells || {});
      }
    });

    return () => unsub();
  }, []);

  /* ------------------ Formula Parser ------------------ */

  const evaluateFormula = (value: string) => {
    if (!value.startsWith("=")) return value;

    try {
      const expression = value
        .substring(1)
        .replace(/[A-Z][0-9]+/g, (match) => cells[match] || "0");

      return eval(expression);
    } catch {
      return "ERROR";
    }
  };

  /* ------------------ Update Cell ------------------ */

  const updateCell = async (key: string, value: string) => {
    const updated = { ...cells, [key]: value };

    setCells(updated);
    setSaving(true);

    await setDoc(docRef, { cells: updated }, { merge: true });

    setSaving(false);
  };

  /* ------------------ Get Cell Value ------------------ */

  const getValue = (r: number, c: number) => {
    const col = String.fromCharCode(65 + c);
    const key = `${col}${r + 1}`;

    const raw = cells[key] || "";
    return evaluateFormula(raw);
  };

  /* ------------------ UI ------------------ */

  return (
    <main className="p-5">

      {/* Header */}

      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Spreadsheet</h1>

        <span className="text-gray-500">
          {saving ? "Saving..." : "Saved ✓"}
        </span>
      </div>

      {/* Presence */}

      <div className="flex gap-2 mb-4">
        {users.map((u) => (
          <span
            key={u}
            className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
          >
            {u}
          </span>
        ))}
      </div>

      {/* Spreadsheet Grid */}

      <div className="overflow-auto border">
        <table className="border-collapse">

          <thead>
            <tr>
              <th></th>

              {Array.from({ length: cols }).map((_, c) => (
                <th key={c} className="border px-4 py-2 bg-gray-100">
                  {String.fromCharCode(65 + c)}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {Array.from({ length: rows }).map((_, r) => (
              <tr key={r}>

                {/* Row number */}

                <td className="border px-2 bg-gray-100">
                  {r + 1}
                </td>

                {Array.from({ length: cols }).map((_, c) => {

                  const col = String.fromCharCode(65 + c);
                  const key = `${col}${r + 1}`;

                  return (
                    <td key={key} className="border">

                      <input
                        value={cells[key] || ""}
                        onChange={(e) =>
                          updateCell(key, e.target.value)
                        }
                        className="w-24 p-1 outline-none"
                      />

                      {/* Show evaluated formula */}

                      {cells[key]?.startsWith("=") && (
                        <div className="text-xs text-gray-500 px-1">
                          {getValue(r, c)}
                        </div>
                      )}

                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </main>
  );
}