import React from "react";
import WeatherTile from "./WeatherTile";

function WeatherForecast() {
  return (
    <div className="">
      <div className="WeatherForecast flex flex-row gap-4 justify-center text-white shadow-lg rounded-2xl p-4">
        <WeatherTile display="d100"></WeatherTile>
        <WeatherTile title="Hallo" display="Test"></WeatherTile>
        <WeatherTile title="Hallo" display="Test"></WeatherTile>
        <WeatherTile title="Hallo" display="Test"></WeatherTile>
      </div>
    </div>
  );
}

export default WeatherForecast;
