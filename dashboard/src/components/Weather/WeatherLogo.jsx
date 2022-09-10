import React from "react";
import sunny from "../../images/weather/d000_100.png";
import partlycloudy from "../../images/weather/d200_300.png";
import partlycloudythunder from "../../images/weather/d240_340.png";
import partlycloudyrain from "../../images/weather/d210_310_220_320.png";
import partlycloudyrainnight from "../../images/weather/n210_310_220_320.png";
import lightrain from "../../images/weather/d410.png";
import mediumrain from "../../images/weather/d420.png";
import heavyrain from "../../images/weather/d430.png";
import partlycloudynight from "../../images/weather/n200_300.png";

function WeatherLogo({ weather }) {
  return (
    <>
      {(weather?.symbol === "d100" || weather?.symbol === "d000") && (
        <img
          title={weather?.symbolPhrase}
          className="max-h-24"
          src={sunny}
          alt=""
        ></img>
      )}
      {(weather?.symbol === "d200" || weather?.symbol === "d300") && (
        <img
          title={weather?.symbolPhrase}
          className="max-h-24"
          src={partlycloudy}
          alt=""
        ></img>
      )}
      {(weather?.symbol === "n200" || weather?.symbol === "n300") && (
        <img
          title={weather?.symbolPhrase}
          className="max-h-24"
          src={partlycloudynight}
          alt=""
        ></img>
      )}
      {(weather?.symbol === "d210" ||
        weather?.symbol === "d220" ||
        weather?.symbol === "d310" ||
        weather?.symbol === "d320") && (
        <img
          title={weather?.symbolPhrase}
          className="max-h-24"
          src={partlycloudyrain}
          alt=""
        ></img>
      )}
      {(weather?.symbol === "d410" || weather?.symbol === "n410") && (
        <img
          title={weather?.symbolPhrase}
          className="max-h-24"
          src={lightrain}
          alt=""
        ></img>
      )}
      {(weather?.symbol === "d420" || weather?.symbol === "n420") && (
        <img
          title={weather?.symbolPhrase}
          className="max-h-24"
          src={mediumrain}
          alt=""
        ></img>
      )}
      {(weather?.symbol === "d430" || weather?.symbol === "n430") && (
        <img
          title={weather?.symbolPhrase}
          className="max-h-24"
          src={heavyrain}
          alt=""
        ></img>
      )}
      {(weather?.symbol === "d240" || weather?.symbol === "d340") && (
        <img
          title={weather?.symbolPhrase}
          className="max-h-24"
          src={partlycloudythunder}
          alt=""
        ></img>
      )}
      {(weather?.symbol === "n210" ||
        weather?.symbol === "n220" ||
        weather?.symbol === "n310" ||
        weather?.symbol === "n320") && (
        <img
          title={weather?.symbolPhrase}
          className="max-h-24"
          src={partlycloudyrainnight}
          alt=""
        ></img>
      )}
    </>
  );
}

export default WeatherLogo;
