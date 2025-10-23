import Link from "next/link";
    
export default function Layout({ children }) {
  return <div>
    <div className="p-2">
        <Link href="/" className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-md border border-gray-300 transition">Back</Link>
    </div>
    {children}
    
    </div>;
}


