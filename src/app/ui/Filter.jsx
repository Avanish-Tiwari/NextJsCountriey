export default function Filter({ handleRegion, selectedRegion }) {
  const regions = [
    "Europe",
    "Americas",
    "Africa",
    "Asia",
    "Oceania",
    "Antarctic",
  ];
  return (
    <div className="flex item-center gap-2">
      <label htmlFor="region" className="font-medium">
        Filter by Region
      </label>
      <select
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
