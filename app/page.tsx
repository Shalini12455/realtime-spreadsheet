"use client";

import { useEffect, useState } from "react";
import { db } from "@/firebase/config";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [docs, setDocs] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "documents"), (snapshot) => {
      setDocs(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsub();
  }, []);

  const createDoc = async () => {
    const doc = await addDoc(collection(db, "documents"), {
      title: "Untitled Spreadsheet",
      updatedAt: Date.now(),
    });

    router.push(`/editor/${doc.id}`);
  };

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-5">Documents</h1>

      <button
        onClick={createDoc}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        New Spreadsheet
      </button>

      <div className="mt-6">
        {docs.map((d) => (
          <div
            key={d.id}
            className="border p-3 mt-2 cursor-pointer"
            onClick={() => router.push(`/editor/${d.id}`)}
          >
            {d.title}
          </div>
        ))}
      </div>
    </main>
  );
}