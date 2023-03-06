import { useState, useRef } from "react";
import "./App.css";
import "./WeatherCard";
import WeatherCard from "./WeatherCard";
import WeatherCardSmall from "./WeatherCardSmall";

var data;

function App() {
  const [location, setLocation] = useState("Please enter a location");
  const [weatherData, setWeatherData] = useState({});
  const [searchResults, setSearchResults] = useState([]);

  const form = useRef();

  async function fetchWeather(query) {
    const res = await fetch(
      "http://localhost:3001/" + new URLSearchParams(query)
    );
    data = await res.json();
    console.log(data);
    setWeatherData(data);
    // console.log(await weatherData.forecast);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(location);
  }

  async function search(event) {
    if (event.target.value.length >= 2) {
      try {
        const res = await fetch(
          "http://localhost:3001/search/" +
            new URLSearchParams(event.target.value)
        );
        data = await res.json();
        // console.log(data);
        setSearchResults([...data]);
      } catch (error) {
        console.log("Error");
      }
    }
  }

  return (
    <div className="flex flex-col font-serif bg-violet-900 text-white h-screen">
      <h1 className="font-bold text-4xl mx-auto mt-12">
        Welcome to Cloud Companion
      </h1>
      <form
        className="flex flex-col mx-auto mt-6"
        ref={form}
        onSubmit={handleSubmit}
      >
        <div>
          <input
            type="text"
            // placeholder="Please enter a location"
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
              fetchWeather(location);
            }}
          >
            Search
          </button>
        </div>
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
                      fetchWeather(location);
                      setSearchResults([]);
                      setLocation(event.target.value);
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
      </form>

      <div className="flex w-3/4 h-full justify-between mt-16 mx-auto flex-wrap">
        <WeatherCard {...weatherData} />
        {weatherData?.forecast?.forecastday &&
          weatherData.forecast.forecastday.map((day, i) => {
            const data = { ...day.day };
            data.location = weatherData.location;
            data.index = i + 1;
            return <WeatherCardSmall {...data} key={i} />;
          })}
      </div>
    </div>
  );
}

export default App;
