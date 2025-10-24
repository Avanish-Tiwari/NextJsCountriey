export default function Filter({ handleRegion, selectedRegion, isDark }) {
  const regions = [
    "Europe",
    "Americas",
    "Africa",
    "Asia",
    "Oceania",
    "Antarctic",
  ];
  return (
    <div className="flex items-center gap-2 bg-inherit">
      <label htmlFor="region" className="text-sm md:text-base">
        Filter by Region
      </label>
      <select
      className={`text-sm px-3 py-1 rounded-md border transition ${
          isDark
            ? "bg-gray-800 hover:bg-gray-700 text-gray-100 border-gray-600"
            : "bg-gray-100 hover:bg-gray-200 text-gray-800 border-gray-300"
        }`}
        id="region"
        value={selectedRegion || ""}
        onChange={(e) => handleRegion(e.target.value || null)}
      >
        <option value="">Select</option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
}
