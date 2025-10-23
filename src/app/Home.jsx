'use client';

import Search from "./ui/Search";
import Filter from "./ui/Filter";
import Cards from "./ui/Cards";
import { useCountries } from "./context/CountriesContext";
import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const { countries, loading, error } = useCountries();
  const [selectedRegion,setSelectedRegion]=useState(null);
  const [searchTerm,setSearchTerm]=useState("")
  const filterData=useMemo(()=>{
    if(!countries) return [];
    let filtered=countries;
    if(selectedRegion){
      filtered= countries.filter(country=>country.region.toLowerCase()==selectedRegion.toLowerCase())
    }
    if(searchTerm){
      filtered=filtered.filter((country)=>country.name.common.toLowerCase().includes(searchTerm.toLowerCase()));
    
    }
    return filtered;
  },[countries,selectedRegion,searchTerm]);
  const handleRegion=(region)=>setSelectedRegion(region);
  const handleSearch=(text)=>setSearchTerm(text);
  const handleClear=()=>{
    setSelectedRegion(null);
    setSearchTerm("")
  }
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <Search handleSearch={handleSearch} searchTerm={searchTerm} />
        <Filter handleRegion={handleRegion} selectedRegion={selectedRegion} />
      </div>

      {filterData.length > 0 ? <Cards countries={filterData} /> : <div>No countries found</div>}
    </div>
  );
}

