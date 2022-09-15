import React from "react";
import clearNight from "../../images/weather/night/n000_n100.png";
import partlyCloudyNight from "../../images/weather/night/n200_n300.png";
import coveredNight from "../../images/weather/night/n400.png";
import cirrusNight from "../../images/weather/night/n500.png";
import fogNight from "../../images/weather/night/n600.png";
import partlyCloudyDrizzleNight from "../../images/weather/night/n210_n310_n410.png";
import partlyCloudyRainNight from "../../images/weather/night/n220_n320_n420.png";
import partlyCloudyHeavyRainNight from "../../images/weather/night/n430.png";
import partlyCloudyThunderNight from "../../images/weather/night/n240.png";
import cloudyThunderNight from "../../images/weather/night/n340.png";
import partlyCloudyThunderRainNight from "../../images/weather/night/n440.png";
import partlyCloudySleetNight from "../../images/weather/night/n211_n311_n411__n221_n321_n421_n431.png";
import partlyCloudySnowNight from "../../images/weather/night/n212_n312_n412__n222_n322_n422_n432.png";
import clearDay from "../../images/weather/day/d000_d100.png";
import partlyCloudyDay from "../../images/weather/day/d200_d300.png";

export const weatherLogos = {
  n000: clearNight,
  n100: clearNight,
  n200: partlyCloudyNight,
  n300: partlyCloudyNight,
  n400: coveredNight,
  n500: cirrusNight,
  n600: fogNight,
  n210: partlyCloudyDrizzleNight,
  n310: partlyCloudyDrizzleNight,
  n410: partlyCloudyDrizzleNight,
  n220: partlyCloudyRainNight,
  n320: partlyCloudyRainNight,
  n420: partlyCloudyRainNight,
  n430: partlyCloudyHeavyRainNight,
  n240: partlyCloudyThunderNight,
  n340: cloudyThunderNight,
  n440: partlyCloudyThunderRainNight,
  n211: partlyCloudySleetNight,
  n311: partlyCloudySleetNight,
  n411: partlyCloudySleetNight,
  n221: partlyCloudySleetNight,
  n321: partlyCloudySleetNight,
  n421: partlyCloudySleetNight,
  n431: partlyCloudySleetNight,
  n212: partlyCloudySnowNight,
  n312: partlyCloudySnowNight,
  n412: partlyCloudySnowNight,
  n222: partlyCloudySnowNight,
  n322: partlyCloudySnowNight,
  n422: partlyCloudySnowNight,
  n432: partlyCloudySnowNight,
  d000: clearDay,
  d100: clearDay,
  d200: partlyCloudyDay,
  d300: partlyCloudyDay,
};
function WeatherLogo({ weather }) {
  return (
    <>
      <img
        title={weather?.symbolPhrase}
        className="max-h-24"
        src={weatherLogos[weather.symbol]}
        alt=""
      ></img>
    </>
  );
}

export default WeatherLogo;
