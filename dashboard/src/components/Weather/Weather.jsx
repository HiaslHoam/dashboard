import React from "react";
import { useState, useEffect } from "react";
import { getWeather } from "../../logic/functions";

function Weather() {
  const [weather, setWeather] = useState([]);

  const WeatherFetch = async () => {
    const response = await getWeather();
    setWeather({ symbolPhrase: "bewölkt", temperature: 19, symbol: "d300" });
    //setWeather(response.data.current);
    //console.log(response.data.current);
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
                <p className="text-white">Ürzig</p>
              </div>
            </div>
            <div className="text-white font-thin"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Weather;
