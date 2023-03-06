import { useEffect, useState } from "react";

function WeatherCard(weatherData) {
  console.log(weatherData);
  const [date, setDate] = useState("");
  const [day, setDay] = useState("");

  function setDateAndDay(weatherData) {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const date = new Date(weatherData?.location?.localtime.split(" ")[0]);
    const day = date.getDay();
    setDate(date.toLocaleDateString("en-US", { timeZone: "UTC" }));

    setDay(days[day]);
  }

  useEffect(() => {
    setDateAndDay(weatherData);
  });

  return weatherData.current ? (
    <div className="text-lg text-black bg-purple-400 border border-black mx-auto w-72 h-80 rounded-2xl flex justify-between">
      <div className="flex flex-col justify-between w-1/2 ml-2 my-2">
        <div className="text-base">
          <h3 className="">{`${weatherData.location.name}, `}</h3>
          <h3>
            {`${
              weatherData.location.country === "United States of America"
                ? weatherData.location.region
                : weatherData.location.country
            }
            `}
          </h3>
          <h2 className="text-5xl">{`${Math.round(
            weatherData.current.temp_f
          )}°`}</h2>
        </div>

        <div className="m-2">
          <img
            className="w-24 h-24"
            src={"https://" + weatherData.current.condition.icon.slice(2)}
            alt="IMG not found"
          ></img>
          <h3 className="text-2xl h-16">
            {weatherData.current.condition.text === "Patchy rain possible"
              ? "Scattered Showers"
              : weatherData.current.condition.text}
          </h3>
        </div>
      </div>

      <div className="flex flex-col justify-between">
        <div className="flex flex-col m-2">
          <p className="flex justify-end">{date}</p>
          <p className="flex justify-end">{day}</p>
        </div>
        {
          <div className="flex justify-end m-2 ml-12">
            Feels like {Math.round(weatherData.current.feelslike_f)}°
          </div>
        }
      </div>
    </div>
  ) : (
    <div></div>
  );
}

export default WeatherCard;
