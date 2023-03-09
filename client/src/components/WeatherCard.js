import { useEffect, useState } from "react";

function WeatherCard(weatherData) {
  // Initializing State
  const [date, setDate] = useState("");
  const [day, setDay] = useState("");

  // Getting date and day for main location
  function setDateAndDay(weatherData, i = 0, current = true) {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    if (current) {
      let date = new Date(weatherData?.location?.localtime.split(" ")[0]);
      date = new Date(date.setDate(date.getDate()));
      const day = date.getDay();
      setDate(date.toLocaleDateString("en-US", { timeZone: "UTC" }));
      setDay(days[day]);
    } else {
      let date = new Date(weatherData?.date);
      date = new Date(date.setDate(date.getDate()));
      const day = date.getDay();
      return {
        date: date.toLocaleDateString("en-US", { timeZone: "UTC" }),
        day: days[day],
      };
    }
  }

  // useEffect to get date and time data
  useEffect(() => {
    setDateAndDay(weatherData);
  });

  return weatherData?.current ? (
    <div className="flex flex-col mt-6 text-white w-1/4 h-min rounded-3xl shadow-lg bg-opacity-90 bg-gradient-to-tr from-green-600 to-green-900">
      <div className="flex">
        <div className="flex flex-col w-full ml-12">
          <img
            className="w-24 mt-4"
            src={"https://" + weatherData?.current?.condition?.icon.slice(2)}
            alt=""
          ></img>
          <h2 className="text-3xl font-bold">{`${Math.round(
            weatherData?.forecast?.forecastday[0]?.day?.mintemp_f
          )}°/${Math.round(
            weatherData?.forecast?.forecastday[0]?.day?.maxtemp_f
          )}°`}</h2>

          <div className="flex w-full justify-between">
            <h1 className="text-4xl font-bold">
              {weatherData?.current?.condition?.text === "Patchy rain possible"
                ? "Scattered Showers"
                : weatherData?.current?.condition?.text}
            </h1>
            <div className="flex flex-col mr-8">
              <h2>{day}</h2>
              <h2>{date}</h2>
            </div>
          </div>
          <div className="flex align-middle">
            <svg
              className="w-4 h-4 my-auto mr-1"
              fill="#ffffff"
              height="800px"
              width="800px"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 297 297"
            >
              <g>
                <path
                  d="M148.5,0C87.43,0,37.747,49.703,37.747,110.797c0,91.026,99.729,179.905,103.976,183.645
  c1.936,1.705,4.356,2.559,6.777,2.559c2.421,0,4.841-0.853,6.778-2.559c4.245-3.739,103.975-92.618,103.975-183.645
  C259.253,49.703,209.57,0,148.5,0z M148.5,272.689c-22.049-21.366-90.243-93.029-90.243-161.892
  c0-49.784,40.483-90.287,90.243-90.287s90.243,40.503,90.243,90.287C238.743,179.659,170.549,251.322,148.5,272.689z"
                />
                <path
                  d="M148.5,59.183c-28.273,0-51.274,23.154-51.274,51.614c0,28.461,23.001,51.614,51.274,51.614
  c28.273,0,51.274-23.153,51.274-51.614C199.774,82.337,176.773,59.183,148.5,59.183z M148.5,141.901
  c-16.964,0-30.765-13.953-30.765-31.104c0-17.15,13.801-31.104,30.765-31.104c16.964,0,30.765,13.953,30.765,31.104
  C179.265,127.948,165.464,141.901,148.5,141.901z"
                />
              </g>
            </svg>
            <h2 className="">
              {`${weatherData?.location?.name}, ${
                weatherData?.location?.country === "United States of America"
                  ? weatherData?.location?.region
                  : weatherData?.location?.country
              }`}
            </h2>
          </div>
        </div>
      </div>
      <div>
        <ul className="mt-2">
          {weatherData.forecast.forecastday.map((days, i) => {
            if (i === 0) {
              return null;
            }
            const forecastDayInfo = setDateAndDay(days, i, false);
            return (
              <li
                className={
                  i === 2
                    ? "flex justify-between w-80 mx-auto text-xl rounded-3xl border shadow-lg my-auto border-gray-400 border-opacity-70"
                    : "flex justify-between mb-2 w-80 mx-auto text-xl rounded-3xl border shadow-lg my-auto border-gray-400 border-opacity-70"
                }
                key={i}
              >
                <div className="flex ml-2">
                  <img
                    className="h-20 w-20 my-auto"
                    src={"https://" + days?.day?.condition?.icon.slice(2)}
                    alt=""
                  ></img>
                  <div className="flex flex-col my-auto">
                    <h2 className="text-xs">
                      {i === 0 ? "Today" : forecastDayInfo.day}
                    </h2>
                    <h1 className="break-normal">
                      {days.day.condition.text === "Patchy rain possible"
                        ? "Scattered Showers"
                        : days.day.condition.text}
                    </h1>
                  </div>
                </div>

                <h1 className="my-auto mr-2">{`${Math.round(
                  days.day.mintemp_f
                )}°/${Math.round(days.day.maxtemp_f)}°`}</h1>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="my-auto text-xs">
        <div className="flex justify-between">
          <div className="flex flex-col h-12 w-24 border border-gray-400 mt-3 mb-1 mx-auto w-34 px-2 rounded-l-3xl rounded-r-3xl shadow-lg">
            <h2 className="mt-2 mx-auto">
              {Math.round(weatherData.current.temp_f)}°
            </h2>
            <h2 className="mb-2 mx-auto">Temperature</h2>
          </div>
          <div className="flex flex-col h-12 w-24 border border-gray-400 border-opacity-70 mt-3 mb-1 mx-auto w-34 px-2 rounded-l-3xl rounded-r-3xl shadow-lg">
            <h2 className="mt-2 mx-auto">
              {Math.round(weatherData.current.feelslike_f)}°
            </h2>
            <h2 className="mb-2 mx-auto">Real Feel</h2>
          </div>
        </div>
        <div className="flex h-16 justify-between text-xs">
          <div className="flex flex-col h-12 w-24 border border-gray-400 border-opacity-70 mt-1 mb-1 mx-auto w-34 px-2 rounded-3xl shadow-lg">
            <h2 className="mt-2 mx-auto">{weatherData.current.humidity}%</h2>
            <h2 className="mb-2 mx-auto">Humidity</h2>
          </div>
          <div className="flex flex-col h-12 w-24 border border-gray-400 border-opacity-70 mt-1 mb-1 mx-auto w-34 px-2 rounded-3xl shadow-lg">
            <h2 className="mt-2 mx-auto">
              {Math.round(weatherData.current.wind_mph)}mph
            </h2>
            <h2 className="mb-2 mx-auto">Wind Speed</h2>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

export default WeatherCard;
