"use client";

import { useState } from "react";

interface Props {
id: string;
}

export default function Cell({ id }: Props) {

const [value, setValue] = useState("");

return (

<input
className="border w-24 h-10 p-2"
value={value}
onChange={(e)=>setValue(e.target.value)}
/>

);
}