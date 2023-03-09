import { useState, useRef } from "react";

function SearchBar() {
  const [location, setLocation] = useState("Please enter a location");
  const [searchResults, setSearchResults] = useState([]);

  const form = useRef();

  function handleSubmit(event) {
    event.preventDefault();
  }

  async function search(event) {
    if (event.target.value.length >= 2) {
      try {
        const res = await fetch(
          "http://localhost:3001/search/" +
            new URLSearchParams(event.target.value)
        );
        let data = await res.json();
        setSearchResults([...data]);
      } catch (error) {
        console.log("Error");
      }
    }
  }
  return (
    <div>
      <form className="mx-auto my-3" ref={form} onSubmit={handleSubmit}>
        <input
          type="text"
          value={location}
          className="w-80 text-black pl-1"
          onClick={() => {
            setLocation("");
          }}
          onChange={(e) => {
            setLocation(e.target.value);
            if (!e.target.value || e.target.value.length === 1) {
              setSearchResults([]);
            } else {
              search(e);
            }
          }}
        ></input>
        <button
          type="submit"
          className="border border-black w-24"
          onClick={() => {
            localStorage.setItem("location", location);
          }}
        >
          Save
        </button>
      </form>
      <div className="bg-white text-black w-96 rounded-b-lg">
        <ul className="flex flex-col mx-auto">
          {searchResults.map((result, i) => {
            return (
              <li key={i}>
                <button
                  className={
                    i < searchResults.length - 1
                      ? "flex w-full border border-black border-opacity-20 p-1 hover:bg-gray-200"
                      : "flex w-full border border-black border-opacity-20 p-1 rounded-b-lg hover:bg-gray-200"
                  }
                  type="submit"
                  value={`${result.name}, ${
                    result.country === "United States of America"
                      ? result.region
                      : result.country
                  }`}
                  onClick={(event) => {
                    setLocation(event.target.value);
                    localStorage.setItem("location", location);
                  }}
                >
                  {result.name},{" "}
                  {result.country === "United States of America"
                    ? result.region
                    : result.country}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default SearchBar;
