import React from "react";
import WeatherLogo from "./WeatherLogo";
import sunrise from "../../images/weather/sunrise.png";
import sunset from "../../images/weather/sunset.png";
import sun from "../../images/weather/day/d000_d100.png";

function WeatherTile({ type, weather }) {
  function getDay(time) {
    const date = new Date(time);
    const day = {
      0: "Sonntag",
      1: "Montag",
      2: "Dienstag",
      3: "Mittwoch",
      4: "Donnerstag",
      5: "Freitag",
      6: "Samstag",
    };
    return day[date.getDay()];
  }
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
              {(weather.precipProb / 10).toFixed(0) * 10}%
            </span>
          </div>
        </div>
      )}
      {type === "infodaily" && (
        <div className="shadow-md backdrop-blur-md tile-big flex flex-col justify-center rounded-2xl text-black dark:text-white ">
          <div className="flex flex-row items-center justify-between p-2">
            <div className="text-white font-semibold">
              <span className="mr-1">
                {getDay(weather.time).substring(0, 2)}
              </span>
              {weather.time.substring(8, 10) +
                "." +
                weather.time.substring(5, 7)}
            </div>
            <div className="">
              <WeatherLogo weather={weather} size="small"></WeatherLogo>
            </div>
          </div>
          <div className="bg-white w-full font-semibold pl-2 pr-2">
            <div className="grid grid-cols-3">
              <div>
                <div className="text-base">{weather.maxTemp}°</div>
                <div className="text-xs ">{weather.minTemp}°</div>
              </div>
              <div>
                <div className="text-base">
                  {(weather.precipProb / 10).toFixed(0) * 10}
                  <span className="text-2xs">%</span>
                </div>
                <div className="text-xs">
                  {weather.precipAccum.toFixed(1)}
                  <span className="text-2xs">l/m²</span>
                </div>
              </div>
              <div>
                <div className="text-base">
                  {(weather.maxWindSpeed * 3.6).toFixed(0)}
                </div>
                <div className="text-xs">
                  {(weather.maxWindGust * 3.6).toFixed(0)}
                </div>
              </div>
            </div>
          </div>
          <div className="text-white font-semibold text-xs grid grid-cols-3 items-center p-1">
            <div className="text-3xs flex items-center">
              <img src={sunrise} alt="" className="h-5" />
              {weather.sunrise.substring(0, 5)}
            </div>
            <div className="text-3xs flex items-center">
              <img src={sunset} alt="" className="h-5" />
              {weather.sunset.substring(0, 5)}
            </div>
            <div className="text-3xs flex items-center">
              <img src={sun} alt="" className="h-5" />
              <span>
                UV
                <span>
                  {weather.uvIndex == null && " 0"}
                  {weather.uvIndex !== null && " " + weather.uvIndex}
                </span>
              </span>
            </div>
          </div>
        </div>
      )}
      {type === "symbol" && (
        <div className="shadow-md tile backdrop-blur flex flex-col justify-center rounded-2xl text-black dark:text-white text-xs">
          <div>
            <WeatherLogo weather={weather} size="normal"></WeatherLogo>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherTile;
