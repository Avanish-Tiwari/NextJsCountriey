'use client';

import Card from "./Card";

export default function Cards({ countries }) {
  const handleClick = (e) => {
    // Prevent event bubbling
    e.stopPropagation();
    // Get the closest card element
    const cardElement = e.target.closest('[id]');
    if (cardElement) {
        console.log("Clicked card ID:", cardElement.id);
      // You can do something with the ID here
    }
  };

  return (
    <div className="grid grid-cols-3 gap-2.5" onClick={handleClick}>
        {countries.map((country) => (
        <Card key={country.cca3} country={country} />
      ))}
    </div>
  );
}



