import Image from 'next/image'
export default function Card({ country }) {
  return (
    <div 
      id={country.cca3} 
      className="bg-inherit rounded-md max-w-64 max-h-80 p-4 cursor-pointer hover:shadow-2xl transition-shadow"
     
    >
      <Image width={400} height={300}  src={country.flags.png} alt={country.flags.alt} />
      <h3 className="font-semibold">{country.name.common}</h3>
      <p className="text-sm text-gray-600 mt-2">{country.capital}</p>
    </div>
  );
}




