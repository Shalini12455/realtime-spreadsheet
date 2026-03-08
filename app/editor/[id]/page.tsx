"use client";

import { useState } from "react";

export default function EditorPage() {

const [saving,setSaving] = useState(false);

const saveData = async () => {

setSaving(true);

await new Promise((res)=>setTimeout(res,1000));

setSaving(false);

};

return (

<div className="p-5">

<h1 className="text-xl font-bold">
Spreadsheet Editor
</h1>

<button
onClick={saveData}
className="bg-blue-500 text-white px-3 py-2 mt-3"
>
Edit Cell
</button>

<div className="mt-3 text-gray-500">

{saving ? "Saving..." : "Saved ✓"}

</div>

</div>

);
}