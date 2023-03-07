import { useState, useRef, useEffect } from "react";
import "./App.css";
import "./WeatherCard";
import WeatherCard from "./WeatherCard";
// import WeatherCardSmall from "./WeatherCardSmall";
import Header from "./Header";
import Locations from "./Locations";

var data;

function App() {
  const [location, setLocation] = useState("Please enter a location");
  const [userLocation, setUserLocation] = useState("");
  const [weatherData, setWeatherData] = useState("");
  const [locationsWeatherData, setLocationsWeatherData] = useState({});
  const [locations, setLocations] = useState([]);

  // const form = useRef();

  async function fetchWeather(query) {
    let query1 = "Toms River, NJ";
    const res = await fetch(
      "http://localhost:3001/" + new URLSearchParams(userLocation)
    );
    data = await res;
    setWeatherData(data);
    // setLocationsWeatherData(
    //   locations.map(async (location) => {
    //     const res = await fetch(
    //       "http://localhost:3001/" + new URLSearchParams(location)
    //     );
    //     return await res.json();
    //   })
    // );
    // console.log(weatherData);
    // console.log(locationsWeatherData);
  }

  // function handleSubmit(event) {
  //   event.preventDefault();
  // }

  // async function search(event) {
  //   if (event.target.value.length >= 2) {
  //     try {
  //       const res = await fetch(
  //         "http://localhost:3001/search/" +
  //           new URLSearchParams(event.target.value)
  //       );
  //       data = await res.json();
  //       setSearchResults([...data]);
  //     } catch (error) {
  //       console.log("Error");
  //     }
  //   }
  // }

  async function getUserLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation(
        `${position.coords.latitude},${position.coords.longitude}`
      );
    });
  }

  // async function getLocationsData() {
  //   let savedLocations = JSON.parse(localStorage.getItem("locations"));
  //   let tempLocationData = await savedLocations.map(async (location) => {
  //     return await fetchWeather(location);
  //   });
  //   return tempLocationData;
  // }

  useEffect(() => {
    getUserLocation();
    const defaultLocations = [
      "New York City, New York",
      "Los Angeles, California",
      "Tokyo, Japan",
    ];
    let locations = localStorage.getItem("locations");
    if (!locations) {
      localStorage.setItem("locations", JSON.stringify(defaultLocations));
    }
    // let data = getLocationsData();
    // console.log(data);
    fetchWeather();
    console.log("rerendering");
  }, []);

  return (
    <div className="flex flex-col bg-gradient-to-tl from-green-600 to-green-900 w-screen h-screen text-white">
      <Header />
      <div className="flex w-screen h-3/4 my-auto justify-center">
        <WeatherCard {...weatherData} />
        <Locations />
      </div>
    </div>

    // <div className="flex flex-col font-serif bg-violet-900 text-white h-screen">
    //   <h1 className="font-bold text-4xl mx-auto mt-12">
    //     Welcome to Cloud Companion V2
    //   </h1>
    //   <form
    //     className="flex flex-col mx-auto mt-6"
    //     ref={form}
    //     onSubmit={handleSubmit}
    //   >
    //     <div>
    //       <input
    //         type="text"
    //         value={location}
    //         className="w-80 text-black pl-1"
    //         onClick={() => {
    //           setLocation("");
    //         }}
    //         onChange={(e) => {
    //           setLocation(e.target.value);
    //           if (!e.target.value || e.target.value.length === 1) {
    //             setSearchResults([]);
    //           } else {
    //             search(e);
    //           }
    //         }}
    //       ></input>
    //       <button
    //         type="submit"
    //         className="border border-black w-24"
    //         onClick={() => {
    //           fetchWeather(location);
    //         }}
    //       >
    //         Search
    //       </button>
    //     </div>
    //     <div className="bg-white text-black w-96 rounded-b-lg">
    //       <ul className="flex flex-col mx-auto">
    //         {searchResults.map((result, i) => {
    //           return (
    //             <li key={i}>
    //               <button
    //                 className={
    //                   i < searchResults.length - 1
    //                     ? "flex w-full border border-black border-opacity-20 p-1 hover:bg-gray-200"
    //                     : "flex w-full border border-black border-opacity-20 p-1 rounded-b-lg hover:bg-gray-200"
    //                 }
    //                 type="submit"
    //                 value={`${result.name}, ${
    //                   result.country === "United States of America"
    //                     ? result.region
    //                     : result.country
    //                 }`}
    //                 onClick={(event) => {
    //                   fetchWeather(location);
    //                   setSearchResults([]);
    //                   setLocation(event.target.value);
    //                 }}
    //               >
    //                 {result.name},{" "}
    //                 {result.country === "United States of America"
    //                   ? result.region
    //                   : result.country}
    //               </button>
    //             </li>
    //           );
    //         })}
    //       </ul>
    //     </div>
    //   </form>

    //   <div className="flex w-3/4 h-full justify-between mt-16 mx-auto flex-wrap">
    //     <WeatherCard {...weatherData} />
    //     {weatherData?.forecast?.forecastday &&
    //       weatherData.forecast.forecastday.map((day, i) => {
    //         const data = { ...day.day };
    //         data.location = weatherData.location;
    //         data.index = i + 1;
    //         return <WeatherCardSmall {...data} key={i} />;
    //       })}
    //   </div>
    // </div>
  );
}

export default App;
