'use client';

import Card from "./Card";
import {useRouter} from "next/navigation"
export default function Cards({ countries }) {
  const router=useRouter();
  const handleClick = (e) => {
    // Prevent event bubbling
    e.stopPropagation();
    // Get the closest card element
    const cardElement = e.target.closest('[id]');
    if (cardElement) {
        console.log("Clicked card ID:", cardElement.id);
      // You can do something with the ID here
      router.push(`/pages/${cardElement.id}`)
    }
  };

  return (
    <div className="grid grid-cols-4 gap-2.5" onClick={handleClick}>
        {countries.map((country) => (
        <Card key={crypto.randomUUID()} country={country} />
      ))}
    </div>
  );
}



