'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const CountriesContext = createContext();

export function CountriesProvider({ children }) {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all?fields=name,capital,population,flags,region,cca3,cca2,ccn3");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCountries();
  }, []);

  return (
    <CountriesContext.Provider value={{ countries, loading, error }}>
      {children}
    </CountriesContext.Provider>
  );
}

export function useCountries() {
  const context = useContext(CountriesContext);
  if (context === undefined) {
    throw new Error('useCountries must be used within a CountriesProvider');
  }
  return context;
} 