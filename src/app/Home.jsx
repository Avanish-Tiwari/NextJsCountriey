"use client";

import Search from "./ui/Search";
import Filter from "./ui/Filter";
import Cards from "./ui/Cards";
import { useCountries } from "./context/CountriesContext";
import { useEffect, useMemo, useState } from "react";
import { useTheme } from "./context/ThemeContext";

export default function Home() {
  const { countries, loading, error } = useCountries();
  const { isDark } = useTheme();
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRegion = localStorage.getItem("region");
      const storedText = localStorage.getItem("text");
      
      setSelectedRegion(storedRegion && storedRegion!=="null" ?storedRegion:null);
      setSearchTerm(storedText || "");
    }
  }, []);
  const filterData = useMemo(() => {
    if (!countries || countries.length < 1) return [];
    let filtered = [...countries];
    if (selectedRegion) {
      filtered = countries.filter(
        (country) =>
          country.region.toLowerCase() == selectedRegion.toLowerCase()
      );
    }
    if (searchTerm) {
      filtered = filtered.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return filtered;
  }, [countries, selectedRegion, searchTerm]);

  const handleRegion = (region) => {
    setSelectedRegion(() => region);
    localStorage.setItem("region", region);
  };
  const handleSearch = (text) => {
    setSearchTerm(text);
    localStorage.setItem("text", text);
  };
  const handleClear = () => {
    setSelectedRegion(null);
    setSearchTerm("");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div
      className={`flex flex-col gap-6 min-h-screen p-6 transition-colors duration-300 ${
        isDark ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex justify-between items-center">
        <Search
          handleSearch={handleSearch}
          isDark={isDark}
          searchTerm={searchTerm}
        />
        <Filter
          handleRegion={handleRegion}
          isDark={isDark}
          selectedRegion={selectedRegion}
        />
      </div>

      {filterData.length > 0 ? (
        <Cards isDark={isDark} countries={filterData} />
      ) : (
        <div>No countries found</div>
      )}
    </div>
  );
}
