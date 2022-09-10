import React from "react";
import WeatherTile from "./WeatherTile";
import data_hourly from "./data_hourly.json";
import data_daily from "./data_daily.json";

function WeatherForecast() {
  return (
    <div className="">
      <div className="WeatherForecast text-white shadow-lg rounded-2xl p-4">
        <div className="forecaster flex flex-row gap-4 overflow-hidden">
          {data_hourly.forecast.map((forecast, index) => {
            const date = new Date(forecast.time);
            let currentHours = date.getHours();
            currentHours = ("0" + currentHours).slice(-2);
            return (
              <div key={index}>
                <div className="flex flex-col items-center">
                  <div>
                    <div className="forecast-text">
                      {currentHours}
                      <span className="text-2xs align-top">00</span>
                    </div>
                    <WeatherTile type="symbol" weather={forecast}></WeatherTile>
                  </div>
                  <div className="mt-2">
                    <WeatherTile type="info" weather={forecast}></WeatherTile>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="forecaster flex flex-row gap-4 overflow-hidden mt-10">
          {console.log(data_daily.forecast)}

          {data_daily.forecast.map((forecast, index) => {
            return (
              <div key={index}>
                <div className="flex flex-col items-center">
                  <div>
                    <div className="forecast-text">
                      {forecast.date.substring(8, 10) +
                        "." +
                        forecast.date.substring(5, 7)}
                    </div>
                    <WeatherTile type="symbol" weather={forecast}></WeatherTile>
                  </div>
                  <div className="mt-2">
                    <WeatherTile
                      type="infodaily"
                      weather={forecast}
                    ></WeatherTile>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default WeatherForecast;
