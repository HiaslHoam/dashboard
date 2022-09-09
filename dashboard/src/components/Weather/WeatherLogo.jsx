import React from "react";
import sunny from "../../images/weather/d000_100.png";
import partlycloudy from "../../images/weather/d200_300.png";
import partlycloudyrain from "../../images/weather/d210_310_220_320.png";

function WeatherLogo({ weather }) {
  weather.symbol = "d100";
  return (
    <>
      {weather?.symbol === ("d100" || "d000") && (
        <img
          title={weather?.symbolPhrase}
          className="max-h-24"
          src={sunny}
          alt=""
        ></img>
      )}
      {weather?.symbol === ("d200" || "d300") && (
        <img
          title={weather?.symbolPhrase}
          className="max-h-24"
          src={partlycloudy}
          alt=""
        ></img>
      )}
      {weather?.symbol === ("d210" || "d220" || "d310" || "320") && (
        <img
          title={weather?.symbolPhrase}
          className="max-h-24"
          src={partlycloudyrain}
          alt=""
        ></img>
      )}
    </>
  );
}

export default WeatherLogo;
