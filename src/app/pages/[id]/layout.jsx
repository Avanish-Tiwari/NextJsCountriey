import Link from "next/link";
    
export default function Layout({ children }) {
  return <div>
    <div>
        <Link href="/">Back</Link>
    </div>
    {children}
    
    </div>;
}


