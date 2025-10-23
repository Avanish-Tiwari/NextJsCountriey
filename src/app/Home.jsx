'use client';

import Search from "./ui/Search";
import Filter from "./ui/Filter";
import Cards from "./ui/Cards";
import { useCountries } from "./context/CountriesContext";

export default function Home() {
  const { countries, loading, error } = useCountries();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <Search />
        <Filter />
      </div>

      {countries.length > 0 ? <Cards countries={countries} /> : <div>No countries found</div>}
    </div>
  );
}

