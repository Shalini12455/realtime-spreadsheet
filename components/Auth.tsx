"use client";

import { auth } from "@/firebase/config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function AuthButton() {

const login = async () => {
const provider = new GoogleAuthProvider();
await signInWithPopup(auth, provider);
};

return (
<button
onClick={login}
className="bg-blue-500 text-white px-4 py-2 rounded"
>
Sign in with Google
</button>
);
}