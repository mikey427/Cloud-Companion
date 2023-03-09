import { useState, useRef, useEffect } from "react";
import "./App.css";
import "./WeatherCard";
import WeatherCard from "./WeatherCard";
import Header from "./Header";
import Locations from "./Locations";

function App() {
  //Initializing State
  const [location, setLocation] = useState("Please enter a location");
  const [weatherData, setWeatherData] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // useRef for Form
  const form = useRef();

  // Fetches data for users main location
  async function fetchWeather() {
    const res = await fetch(
      "http://localhost:3001/location/" +
        new URLSearchParams(localStorage.getItem("location"))
    );
    let data = await res.json();
    setWeatherData(data);
  }

  // Keeps page from reloading on submit
  function handleSubmit(event) {
    event.preventDefault();
  }

  // Fetching search results
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

  // useEffect fetching data and initializing default values in localStorage
  useEffect(() => {
    const defaultLocations = [
      "New York City, New York",
      "Los Angeles, California",
      "Tokyo, Japan",
    ];
    let location = localStorage.getItem("location");
    let locations = localStorage.getItem("locations");
    if (!locations) {
      localStorage.setItem("locations", JSON.stringify(defaultLocations));
    }
    if (!location) {
      localStorage.setItem("location", "Dallas, Texas");
    }
    fetchWeather();
  }, []);

  return (
    <div className="flex flex-col bg-gradient-to-tl from-green-600 to-green-900 w-screen h-screen text-white">
      <Header settings={false} />
      <div className="mx-auto">
        <form className="" ref={form} onSubmit={handleSubmit}>
          <input
            type="text"
            value={location}
            className="w-80 text-black pl-3 rounded-l-3xl text-xl"
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
            className="border border-black w-24 rounded-r-3xl text-xl"
            onClick={() => {
              localStorage.setItem("location", location);
              fetchWeather();
            }}
          >
            Save
          </button>
        </form>
        <div className="bg-white text-black w-96 rounded-b-lg rounded-tl-lg">
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
                      localStorage.setItem("location", event.target.value);
                      setSearchResults([]);
                      fetchWeather();
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
      <div className="flex w-screen h-3/4 my-auto justify-center">
        <WeatherCard {...weatherData} />
        <Locations />
      </div>
    </div>
  );
}

export default App;
