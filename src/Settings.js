import Header from "./Header";
import { useState, useRef, useEffect } from "react";

var data;

function Settings() {
  const [location, setLocation] = useState("Please enter a location");
  const [locations, setLocations] = useState(
    JSON.parse(localStorage.getItem("locations"))
  );
  const [editing, setEditing] = useState(false);
  const [editingCard, setEditingCard] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [searchResults, setSearchResults] = useState([]);

  const defaultLocations = [];

  const form = useRef();

  //   useEffect(() => {
  //     //check if localStorage, if not set new
  //   });

  async function fetchWeather(query) {
    let query1 = "Toms River, NJ";
    const res = await fetch(
      "http://localhost:3001/" + new URLSearchParams(query1)
    );
    data = await res.json();
    setWeatherData(data);
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  function editButtonClick() {
    setEditing(!editing);
    console.log(editing);
  }

  function updateLocations(event) {
    setLocation(event.target.value);
    let tempLocations = locations;
    const index = locations.indexOf(editingCard);
    tempLocations[index] = event.target.value;

    setLocations(tempLocations);
    localStorage.setItem("locations", JSON.stringify(locations));
    setEditing(false);
    setLocation("Please enter a location");
    setSearchResults([]);
  }

  async function search(event) {
    if (event.target.value.length >= 2) {
      try {
        const res = await fetch(
          "http://localhost:3001/search/" +
            new URLSearchParams(event.target.value)
        );
        data = await res.json();
        setSearchResults([...data]);
      } catch (error) {
        console.log("Error");
      }
    }
  }

  return (
    <div className="flex flex-col bg-gradient-to-tl from-green-600 to-green-900 w-screen h-screen text-white">
      <Header settings={true} />
      <h1 className="text-3xl font-bold mx-auto">Saved locations</h1>
      <div className="flex flex-col mx-auto w-1/5 mt-6">
        {locations
          ? locations.map((location, i) => {
              return (
                <div
                  className="flex bg-gradient-to-br from-green-600 to-green-900 my-2 shadow-lg justify-between rounded-3xl h-16"
                  key={i}
                >
                  <h1 className="my-auto ml-6">{location}</h1>
                  <button
                    onClick={() => {
                      if (editing && location !== editingCard) {
                        setEditingCard(location);
                      } else {
                        setEditingCard(location);
                        setEditing(!editing);
                        console.log(editing);
                      }
                    }}
                  >
                    {editing && editingCard === location ? (
                      <img
                        className="w-6 h-6 my-auto mr-6"
                        src={process.env.PUBLIC_URL + "xWhite.png"}
                        alt="IMG NOT FOUND"
                      ></img>
                    ) : (
                      <img
                        className="w-6 h-6 my-auto mr-6"
                        src={process.env.PUBLIC_URL + "editWhite.png"}
                        alt="IMG NOT FOUND"
                      ></img>
                    )}
                  </button>
                </div>
              );
            })
          : null}
      </div>
      {editing ? (
        <div className="mx-auto my-3">
          <form className="mx-auto my-3" ref={form} onSubmit={handleSubmit}>
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
                updateLocations();
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
                        updateLocations(event);
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
      ) : null}
    </div>
  );
}

export default Settings;
