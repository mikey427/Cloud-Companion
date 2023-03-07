function Locations(weatherData) {
  const weatherData1 = {
    location: {
      name: "Toms River",
      region: "New Jersey",
      country: "United States of America",
      lat: 39.95,
      lon: -74.2,
      tz_id: "America/New_York",
      localtime_epoch: 1678075886,
      localtime: "2023-03-05 23:11",
    },
    current: {
      last_updated_epoch: 1678075200,
      last_updated: "2023-03-05 23:00",
      temp_c: 7.8,
      temp_f: 46,
      is_day: 0,
      condition: {
        text: "Clear",
        icon: "//cdn.weatherapi.com/weather/64x64/night/113.png",
        code: 1000,
      },
      wind_mph: 9.4,
      wind_kph: 15.1,
      wind_degree: 330,
      wind_dir: "NNW",
      pressure_mb: 1023,
      pressure_in: 30.22,
      precip_mm: 0,
      precip_in: 0,
      humidity: 47,
      cloud: 0,
      feelslike_c: 4.9,
      feelslike_f: 40.8,
      vis_km: 16,
      vis_miles: 9,
      uv: 1,
      gust_mph: 15,
      gust_kph: 24.1,
    },
  };
  return (
    <div className="flex flex-col w-2/5 h-full">
      <div className="flex flex-col w-full h-full my-auto justify-center">
        <div className="flex ml-32 shadow-lg w-3/4 h-1/4 rounded-3xl bg-gradient-to-l from-green-600 to-green-900">
          <div className="flex flex-col my-auto ml-12 ">
            <h2 className="text-2xl font-bold">Rainy</h2>
            <h1 className="text-7xl font-bold">25°</h1>
          </div>
          <hr className="w-px h-20 my-auto ml-6 bg-gray-300 bg-opacity-30"></hr>
          <div className="flex flex-col my-auto ml-6 text-xl">
            <h3>Wednesday September 11</h3>
            <div className="flex">
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
              <h3>Tokyo</h3>
            </div>
          </div>
          <img
            className="my-auto w-24 h-24 mx-auto"
            src={"https://" + weatherData1.current.condition.icon.slice(2)}
            alt=""
          ></img>
        </div>
        <div className="flex ml-12 shadow-lg w-4/4 h-1/4 rounded-3xl my-6 bg-gradient-to-l from-green-600 to-green-900">
          <div className="flex flex-col my-auto ml-12 ">
            <h2 className="text-2xl font-bold">Rainy</h2>
            <h1 className="text-7xl font-bold">25°</h1>
          </div>
          <hr className="w-px h-20 my-auto ml-6 bg-gray-300 bg-opacity-30"></hr>
          <div className="flex flex-col my-auto ml-6 text-xl">
            <h3>Wednesday September 11</h3>
            <div className="flex">
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
              <h3>Tokyo</h3>
            </div>
          </div>
          <img
            className="my-auto w-24 h-24 mx-auto"
            src={"https://" + weatherData1.current.condition.icon.slice(2)}
            alt=""
          ></img>
        </div>
        <div className="flex ml-32 shadow-lg w-3/4 h-1/4 rounded-3xl bg-gradient-to-l from-green-600 to-green-800">
          <div className="flex flex-col my-auto ml-12 ">
            <h2 className="text-2xl font-bold">Rainy</h2>
            <h1 className="text-7xl font-bold">25°</h1>
          </div>
          <hr className="w-px h-20 my-auto ml-6 bg-gray-300 bg-opacity-30"></hr>
          <div className="flex flex-col my-auto ml-6 text-xl">
            <h3>Wednesday September 11</h3>
            <div className="flex">
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
              <h3>London</h3>
            </div>
          </div>
          <img
            className="my-auto w-24 h-24 mx-auto"
            src={"https://" + weatherData1.current.condition.icon.slice(2)}
            alt=""
          ></img>
        </div>
      </div>
    </div>
  );
}

export default Locations;