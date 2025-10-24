"use client";
import Link from "next/link";
import { useTheme } from "../context/ThemeContext";
export default function Nave() {
  const { isDark, handleToggle } = useTheme();
  return (
    <div className={`flex justify-between items-center p-4 border-b border-gray-200 shadow-md sticky top-0  ${ isDark ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <Link href="/">
      <h1 className="text-2xl font-bold">Where in the world?</h1>
      </Link>
      <button
        className={` p-2 rounded-md`}
        onClick={handleToggle}
      >
        {!isDark ? "🌙 Dark" : "☀️ Light"}
      </button>
    </div>
  );
}
