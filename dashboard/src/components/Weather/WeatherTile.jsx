import React from "react";
import WeatherLogo from "./WeatherLogo";

function WeatherTile({ type, weather }) {
  return (
    <div>
      {type === "info" && (
        <div className="bg-white dark:bg-zinc-800 shadow-md tile flex flex-col justify-center rounded-2xl text-black dark:text-white text-xs">
          <div>
            <p>
              <span className="font-semibold text-2xl ml-1">
                {weather.temperature}°
              </span>
            </p>

            <span className="text-2xs text-blue-400">
              {weather.precipProb}%{" "}
            </span>
          </div>
        </div>
      )}
      {type === "infodaily" && (
        <div className="bg-white dark:bg-zinc-800 shadow-md tile flex flex-col justify-center rounded-2xl text-black dark:text-white text-xs">
          <div className="font-semibold">
            <div className="text-lg ml-1 -mb-1">{weather.maxTemp}°</div>
            <div className="text-md ml-1">{weather.minTemp}°</div>

            <span className="font-normal text-2xs text-blue-400">
              {weather.precipProb}%{" "}
            </span>
          </div>
        </div>
      )}
      {type === "symbol" && (
        <div className="shadow-md tile backdrop-blur flex flex-col justify-center rounded-2xl text-black dark:text-white text-xs">
          <div>
            <WeatherLogo weather={weather}></WeatherLogo>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherTile;
