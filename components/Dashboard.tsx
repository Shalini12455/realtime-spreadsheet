"use client";

import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { useRouter } from "next/navigation";

export default function Dashboard() {

const router = useRouter();

const createDoc = async () => {

const doc = await addDoc(collection(db, "documents"), {
title: "Untitled Spreadsheet",
createdAt: Date.now()
});

router.push(`/editor/${doc.id}`);
};

return (

<div className="p-10">

<h1 className="text-2xl font-bold mb-5">
Documents
</h1>

<button
onClick={createDoc}
className="bg-green-500 text-white px-4 py-2"
>
New Spreadsheet
</button>

</div>

);
}