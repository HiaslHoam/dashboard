import React, { useEffect, useState } from "react";
import WeatherTile from "./WeatherTile";
import {
  getWeatherForecastHourly,
  getWeatherForecastDaily,
} from "../../logic/functions";
import ScrollContainer from "react-indiana-drag-scroll";

function WeatherForecast({ locationId }) {
  const [forecastHourly, setForecastHourly] = useState([]);
  const [forecastDaily, setForecastDaily] = useState([]);
  const WeatherFetch = async () => {
    const responseHourly = await getWeatherForecastHourly(locationId);
    const responseDaily = await getWeatherForecastDaily(locationId);
    setForecastHourly(responseHourly.data);
    setForecastDaily(responseDaily.data);
    console.log(responseDaily.data);
  };
  useEffect(() => {
    WeatherFetch();
  }, []);
  return (
    <div className="">
      <div className="WeatherForecast text-white shadow-lg rounded-2xl p-4">
        <ScrollContainer className="forecaster flex flex-row gap-4 overflow-hidden">
          {forecastHourly.map((forecast, index) => {
            const date = new Date(forecast.time);
            let currentHours = date.getHours();
            currentHours = ("0" + currentHours).slice(-2);
            return (
              <div key={index}>
                <div className="flex flex-col items-center ">
                  <div>
                    <div className="forecast-text font-medium">
                      {currentHours}
                      <span className="text-2xs align-top font-light">00</span>
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
        </ScrollContainer>

        <ScrollContainer className="forecaster flex flex-row gap-4 overflow-hidden mt-10">
          <div>
            <div className="flex flex-col items-center">
              <div className="mt-2">
                {forecastDaily.length > 0 && (
                  <WeatherTile
                    type="infotoday"
                    weather={forecastDaily[0]}
                  ></WeatherTile>
                )}
              </div>
            </div>
          </div>
          {forecastDaily.slice(1, 12).map((forecast, index) => {
            return (
              <div key={index}>
                <div className="flex flex-col items-center">
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
        </ScrollContainer>
      </div>
    </div>
  );
}

export default WeatherForecast;
