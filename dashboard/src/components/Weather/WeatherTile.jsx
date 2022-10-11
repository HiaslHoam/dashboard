import React from "react";
import WeatherLogo from "./WeatherLogo";
import sunrise from "../../images/weather/sunrise.png";
import sunset from "../../images/weather/sunset.png";
import sun from "../../images/weather/day/d000_d100.png";
import { BiTargetLock } from "react-icons/bi";
import { TbTemperature } from "react-icons/tb";
import { ImDroplet } from "react-icons/im";
import { GiWindTurbine } from "react-icons/gi";
import {
  BsFillArrowDownCircleFill,
  BsFillArrowDownLeftCircleFill,
  BsFillArrowLeftCircleFill,
  BsFillArrowUpLeftCircleFill,
  BsFillArrowUpCircleFill,
  BsArrowUpRightCircleFill,
  BsFillArrowRightCircleFill,
  BsFillArrowDownRightCircleFill,
} from "react-icons/bs";

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
  console.log(weather.windDir);
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
          <div className="flex gap-6 justify-center text-white mb-1 -mt-3">
            <TbTemperature></TbTemperature>
            <div className="rainblue text-sm">
              <ImDroplet></ImDroplet>
            </div>
            <div className="">
              <GiWindTurbine></GiWindTurbine>
              {weather.windDir >= 0 && weather.windDir <= 22 && (
                <div className="text-3xs absolute top-14 right-5 shadow-lg">
                  <BsFillArrowDownCircleFill></BsFillArrowDownCircleFill>
                </div>
              )}
              {weather.windDir >= 23 && weather.windDir <= 67 && (
                <div className="text-3xs absolute top-15 right-5 shadow-lg">
                  <BsFillArrowDownLeftCircleFill></BsFillArrowDownLeftCircleFill>
                </div>
              )}
              {weather.windDir >= 68 && weather.windDir <= 112 && (
                <div className="text-3xs absolute top-15 right-5 shadow-lg">
                  <BsFillArrowLeftCircleFill></BsFillArrowLeftCircleFill>
                </div>
              )}
              {weather.windDir >= 113 && weather.windDir <= 157 && (
                <div className="text-3xs absolute top-15 right-5 shadow-lg">
                  <BsFillArrowUpLeftCircleFill></BsFillArrowUpLeftCircleFill>
                </div>
              )}
              {weather.windDir >= 158 && weather.windDir <= 202 && (
                <div className="text-3xs absolute top-15 right-5 shadow-lg">
                  <BsFillArrowUpCircleFill></BsFillArrowUpCircleFill>
                </div>
              )}
              {weather.windDir >= 203 && weather.windDir <= 247 && (
                <div className="text-3xs absolute top-15 right-5 shadow-lg">
                  <BsArrowUpRightCircleFill></BsArrowUpRightCircleFill>
                </div>
              )}
              {weather.windDir >= 248 && weather.windDir <= 292 && (
                <div className="text-3xs absolute top-15 right-5 shadow-lg">
                  <BsFillArrowRightCircleFill></BsFillArrowRightCircleFill>
                </div>
              )}
              {weather.windDir >= 293 && weather.windDir <= 337 && (
                <div className="text-3xs absolute top-15 right-5 shadow-lg">
                  <BsFillArrowDownRightCircleFill></BsFillArrowDownRightCircleFill>
                </div>
              )}
              {weather.windDir >= 338 && weather.windDir <= 360 && (
                <div className="text-3xs absolute top-14 right-5 shadow-lg">
                  <BsFillArrowDownCircleFill></BsFillArrowDownCircleFill>
                </div>
              )}
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
                  <span className="text-2xs">km/h</span>
                </div>
                <div className="text-xs">
                  {(weather.maxWindGust * 3.6).toFixed(0)}
                  <span className="text-4xs">km/h</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-white font-semibold text-xs grid grid-cols-3 items-center p-1 justify-items-center">
            <div className="text-3xs flex items-center">
              <img src={sunrise} alt="" className="h-5" />
              {weather.sunrise.substring(0, 5)}
            </div>
            <div className="text-3xs flex items-center">
              <img src={sunset} alt="" className="h-5" />
              {weather.sunset.substring(0, 5)}
            </div>
            <div className="text-3xs">
              {weather.confidence === "g" && (
                <div className="text-green-500 text-base" title="good">
                  <BiTargetLock />
                </div>
              )}
              {weather.confidence === "y" && (
                <div className="text-yellow-500 text-base" title="medium">
                  <BiTargetLock />
                </div>
              )}
              {weather.confidence === "o" && (
                <div className="text-orange-500 text-base" title="bad">
                  <BiTargetLock />
                </div>
              )}
              {weather.confidence === "r" && (
                <div className="text-red-500 text-base">
                  <BiTargetLock />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {type === "infotoday" && (
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
          <div className="flex gap-6 justify-center text-white mb-1 -mt-3">
            <TbTemperature></TbTemperature>
            <div className="rainblue text-sm">
              <ImDroplet></ImDroplet>
            </div>
            <div className="">
              <GiWindTurbine></GiWindTurbine>
              {weather.windDir >= 0 && weather.windDir <= 22 && (
                <div className="text-3xs absolute top-14 right-5 shadow-lg">
                  <BsFillArrowDownCircleFill></BsFillArrowDownCircleFill>
                </div>
              )}
              {weather.windDir >= 23 && weather.windDir <= 67 && (
                <div className="text-3xs absolute top-15 right-5 shadow-lg">
                  <BsFillArrowDownLeftCircleFill></BsFillArrowDownLeftCircleFill>
                </div>
              )}
              {weather.windDir >= 68 && weather.windDir <= 112 && (
                <div className="text-3xs absolute top-15 right-5 shadow-lg">
                  <BsFillArrowLeftCircleFill></BsFillArrowLeftCircleFill>
                </div>
              )}
              {weather.windDir >= 113 && weather.windDir <= 157 && (
                <div className="text-3xs absolute top-15 right-5 shadow-lg">
                  <BsFillArrowUpLeftCircleFill></BsFillArrowUpLeftCircleFill>
                </div>
              )}
              {weather.windDir >= 158 && weather.windDir <= 202 && (
                <div className="text-3xs absolute top-15 right-5 shadow-lg">
                  <BsFillArrowUpCircleFill></BsFillArrowUpCircleFill>
                </div>
              )}
              {weather.windDir >= 203 && weather.windDir <= 247 && (
                <div className="text-3xs absolute top-15 right-5 shadow-lg">
                  <BsArrowUpRightCircleFill></BsArrowUpRightCircleFill>
                </div>
              )}
              {weather.windDir >= 248 && weather.windDir <= 292 && (
                <div className="text-3xs absolute top-15 right-5 shadow-lg">
                  <BsFillArrowRightCircleFill></BsFillArrowRightCircleFill>
                </div>
              )}
              {weather.windDir >= 293 && weather.windDir <= 337 && (
                <div className="text-3xs absolute top-15 right-5 shadow-lg">
                  <BsFillArrowDownRightCircleFill></BsFillArrowDownRightCircleFill>
                </div>
              )}
              {weather.windDir >= 338 && weather.windDir <= 360 && (
                <div className="text-3xs absolute top-14 right-5 shadow-lg">
                  <BsFillArrowDownCircleFill></BsFillArrowDownCircleFill>
                </div>
              )}
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
                  <span className="text-2xs">km/h</span>
                </div>
                <div className="text-xs">
                  {(weather.maxWindGust * 3.6).toFixed(0)}
                  <span className="text-4xs">km/h</span>
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
