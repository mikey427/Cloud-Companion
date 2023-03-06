import { useState, useEffect } from "react";

function WeatherCardSmall(weatherData) {
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
    let date = new Date(weatherData?.location?.localtime.split(" ")[0]);
    date = new Date(date.setDate(date.getDate() + weatherData.index));
    const day = date.getDay();
    setDate(date.toLocaleDateString("en-US", { timeZone: "UTC" }));

    setDay(days[day]);
  }

  useEffect(() => {
    setDateAndDay(weatherData);
  });
  return weatherData?.maxtemp_f ? (
    <div className="text-lg text-black bg-purple-400 border border-black mx-auto w-72 h-80 rounded-2xl flex justify-between">
      <div className="flex flex-col justify-between w-1/2 ml-2 my-2">
        <div className="text-base">
          <h3>{`High: ${Math.round(weatherData.maxtemp_f)}`}</h3>
          <h3>{`Low: ${Math.round(weatherData.mintemp_f)}`}</h3>
        </div>

        <div className="m-2">
          <img
            className="w-24 h-24"
            src={"https://" + weatherData.condition.icon.slice(2)}
            alt="IMG not found"
          ></img>
          <h3 className="text-lg font-bold h-16">
            {weatherData.condition.text === "Patchy rain possible"
              ? "Scattered Showers"
              : weatherData.condition.text}
          </h3>
        </div>
      </div>

      <div className="flex flex-col justify-between">
        <div className="flex flex-col m-2">
          <p className="flex justify-end">{date}</p>
          <p className="flex justify-end">{day}</p>
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
}

export default WeatherCardSmall;
