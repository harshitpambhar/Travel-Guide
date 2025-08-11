import React, { useState } from "react";

const FlightPage = () => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Placeholder for API call
    setTimeout(() => {
      setResults({
        flights: [
          { airline: "AirSave", price: 120, from: source, to: destination, time: "10:00 AM" },
          { airline: "BudgetFly", price: 135, from: source, to: destination, time: "2:00 PM" },
        ],
        nearbyAirports: [
          { name: "Nearby Airport 1", distance: "15km" },
          { name: "Nearby Airport 2", distance: "25km" },
        ],
        tips: [
          "Book in advance for better prices.",
          "Consider nearby airports for cheaper flights.",
        ],
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Find Flights</h1>
      <form onSubmit={handleSearch} className="flex flex-col gap-4 mb-6">
        <input
          className="border p-2 rounded"
          type="text"
          placeholder="Source City or Airport"
          value={source}
          onChange={e => setSource(e.target.value)}
          required
        />
        <input
          className="border p-2 rounded"
          type="text"
          placeholder="Destination City or Airport"
          value={destination}
          onChange={e => setDestination(e.target.value)}
          required
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          type="submit"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search Flights"}
        </button>
      </form>
      {results && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Available Flights</h2>
            <ul className="space-y-2">
              {results.flights.map((flight: any, idx: number) => (
                <li key={idx} className="border p-3 rounded flex justify-between items-center">
                  <span>{flight.airline} ({flight.time})</span>
                  <span className="font-bold">${flight.price}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Nearby Airports</h2>
            <ul className="space-y-1">
              {results.nearbyAirports.map((airport: any, idx: number) => (
                <li key={idx}>{airport.name} - {airport.distance}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Money-Saving Tips</h2>
            <ul className="list-disc ml-6">
              {results.tips.map((tip: string, idx: number) => (
                <li key={idx}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightPage;
