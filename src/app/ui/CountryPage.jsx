"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CountryDetails({ countryCode }) {
  const [countryData, setCountryData] = useState({});
  const [notFound, setNotFound] = useState(false);
  const router = useRouter();

  const handleClick = (e) => {
    e.stopPropagation();
    const cardElement = e.target.closest("[id]");
    if (cardElement) {
      router.push(`/pages/${cardElement.id}`);
    }
  };

  async function updateCountryData(data) {
    const base = {
      flag: data.flags?.png,
      name: data.name?.common,
      nativeName: Object.values(data.name?.nativeName || {})[0]?.common,
      population: data.population?.toLocaleString(),
      region: data.region,
      subregion: data.subregion,
      capital: data.capital?.join(", "),
      tld: data.tld?.[0],
      currency: Object.values(data.currencies || {})[0]?.name,
      lang: Object.values(data.languages || {})?.join(", "),
      borders: [],
    };

    if (Array.isArray(data.borders) && data.borders.length > 0) {
      try {
        const borders = await Promise.all(
          data.borders.map(async (code) => {
            try {
              const res = await fetch(
                `https://restcountries.com/v3.1/alpha/${code}`
              );
              if (!res.ok) return null;
              const json = await res.json();
              const item = Array.isArray(json) ? json[0] : json;
              return { code: item.cca3, name: item.name.common };
            } catch (err) {
              console.error("Error fetching border:", err);
              return null;
            }
          })
        );

        base.borders = borders.filter(Boolean);
      } catch (err) {
        console.error("Border fetching failed:", err);
        setNotFound(true);
      }
    }

    setCountryData(base);
  }

  useEffect(() => {
    async function getData(code) {
      try {
        const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
        if (!res.ok) throw new Error("Failed to fetch country data");
        const json = await res.json();
        const data = Array.isArray(json) ? json[0] : json;
        await updateCountryData(data);
      } catch (err) {
        console.error(err);
        setNotFound(true);
      }
    }

    getData(countryCode);
  }, [countryCode]);

  if (notFound) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h2 className="text-xl font-semibold text-gray-700">
          Country Not Found
        </h2>
      </div>
    );
  }

  return (
    <main className="flex justify-center px-6 py-3 bg-gray-50 ">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-md p-8 flex flex-col md:flex-row gap-10">
        {/* Flag Section */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          {countryData.flag && (
            <img
              src={countryData.flag}
              alt={countryData.name}
              className="w-full h-auto rounded-xl shadow-md"
            />
          )}
        </div>

        {/* Details Section */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-gray-900">
            {countryData.name}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-gray-700">
            <p>
              <span className="font-semibold">Native Name: </span>
              {countryData.nativeName}
            </p>
            <p>
              <span className="font-semibold">Population: </span>
              {countryData.population}
            </p>
            <p>
              <span className="font-semibold">Region: </span>
              {countryData.region}
            </p>
            <p>
              <span className="font-semibold">Sub Region: </span>
              {countryData.subregion}
            </p>
            <p>
              <span className="font-semibold">Capital: </span>
              {countryData.capital}
            </p>
            <p>
              <span className="font-semibold">Top Level Domain: </span>
              {countryData.tld}
            </p>
            <p>
              <span className="font-semibold">Currencies: </span>
              {countryData.currency}
            </p>
            <p>
              <span className="font-semibold">Languages: </span>
              {countryData.lang}
            </p>
          </div>

          {/* Border Countries */}
          <div className="mt-6">
            <h3 className="font-semibold text-gray-900 mb-2">
              Border Countries:
            </h3>
            <div
              onClick={handleClick}
              className="flex flex-wrap gap-2 cursor-pointer"
            >
              {countryData.borders?.length > 0 ? (
                countryData.borders.map((border) => (
                  <span
                    key={border.code}
                    id={border.code}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-md border border-gray-300 transition"
                  >
                    {border.name}
                  </span>
                ))
              ) : (
                <span className="text-gray-500">No borders</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
