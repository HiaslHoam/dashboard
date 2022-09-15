import React from "react";
import { useState, useEffect } from "react";
import { getWeather } from "../../logic/functions";
import WeatherLogo from "./WeatherLogo";

function Weather({ locationId }) {
  const [weather, setWeather] = useState([]);
  const [location, setLocation] = useState();

  const locations = [
    {
      id: "1",
      locationName: "Ürzig",
    },
    {
      id: "2",
      locationName: "München",
    },
    {
      id: "3",
      locationName: "Bad Wiessee",
    },
  ];

  const WeatherFetch = async () => {
    const current = await getWeather(locationId);
    setWeather(current.data);
    setLocation(
      locations.find((x) => x.id === current.data?.locationId).locationName
    );
  };

  useEffect(() => {
    WeatherFetch();
  }, []);
  return (
    <div className="">
      <div className="Weather flex flex-col justify-center text-white shadow-lg rounded-2xl p-4">
        {weather && (
          <div className="flex flex-row items-center justify-between drop-shadow-md ">
            <div>
              <p className="text-white text-l font-light min-w-fit text-left">
                {weather?.symbolPhrase}
              </p>
              <div className="flex flex-row gap-2 items-center mt-2 ">
                <p className="text-5xl font-light text-white max-w-fit max-h-fit">
                  {weather?.temperature}°
                </p>
                <p className="text-white font-thin">|</p>
                <p className="text-white">{location}</p>
              </div>
            </div>
            <div className="shadow-md tile bg-white flex flex-col justify-center rounded-2xl text-black dark:text-white text-xs">
              <div>
                <WeatherLogo weather={weather}></WeatherLogo>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Weather;
