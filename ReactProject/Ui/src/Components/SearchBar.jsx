import { useState } from "react";

const SearchBar = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!search.trim()) {
      setError("Please enter a search term.");
      return;
    }

    setError(null); // Clear previous errors
    try {
      const response = await fetch(`/api/search/${search}`);
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          setResults(data);
        } else {
          setResults([]);
          setError("No results found.");
        }
      } else {
        setError("Search failed. Please try again.");
      }
    } catch (err) {
      setError("Error fetching data. Please try again.");
      console.error("Error fetching data:", err);
    }
  };

  return (
    <>
      <div className="flex justify-center mt-10">
        <div className="m-2">
          <h1 className="m-2 text-xl">Search</h1>
        </div>
        <div className="m-2 flex">
          <div className="m-2">
            <input
              type="text"
              placeholder="Search Blogs"
              className="border-2 rounded-xl w-96 px-4"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="m-2">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && <div className="text-red-500 text-center mt-2">{error}</div>}

      {/* Display Results */}
      <div className="mt-4">
        {results.length > 0 ? (
          results.map((result, index) => (
            <div key={index} className="p-4 border-b border-gray-300">
              <h3 className="font-bold text-lg">Blog Title: {result.name}</h3>
              <p><strong>Category:</strong> {result.cateogry}</p>
              <p><strong>Email:</strong> {result.email}</p>
              <p><strong>Location:</strong> {result.location}</p>
              <p><strong>Posted on:</strong> {new Date(result.date).toLocaleDateString()}</p>
              <div className="mt-2">
                <strong>Blog:</strong>
                <p>{result.blog}</p>
              </div>
            </div>
          ))
        ) : (
          !error && <p className="text-center text-gray-500">No results found</p>
        )}
      </div>
    </>
  );
};

export default SearchBar;
