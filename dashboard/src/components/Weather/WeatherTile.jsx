import React from "react";

function WeatherTile({ display }) {
  return (
    <div>
      <div className="bg-white shadow-md tile flex flex-col justify-center rounded-2xl text-black text-xs">
        <p>
          <span className="font-bold text">{display}</span>
        </p>
      </div>
    </div>
  );
}

export default WeatherTile;
