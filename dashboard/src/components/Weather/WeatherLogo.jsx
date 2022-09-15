import React from "react";
import clearNight from "../../images/weather/night/n000_n100.png";
import partlyCloudyNight from "../../images/weather/night/n200_n300.png";
import coveredNight from "../../images/weather/night/n400.png";
import cirrusNight from "../../images/weather/night/n500.png";
import fogNight from "../../images/weather/night/n600.png";
import partlyCloudyDrizzlesNight from "../../images/weather/night/n210_n310_n410.png";
import partlyCloudyRainNight from "../../images/weather/night/n220_n320_n420.png";
import partlyCloudyHeavyRainNight from "../../images/weather/night/n430.png";
import partlyCloudyThunderNight from "../../images/weather/night/n240.png";
import cloudyThunderNight from "../../images/weather/night/n340.png";
import partlyCloudyThunderRainNight from "../../images/weather/night/n440.png";
import partlyCloudySleetNight from "../../images/weather/night/n211_n311_n411__n221_n321_n421_n431.png";
import partlyCloudySnowNight from "../../images/weather/night/n212_n312_n412__n222_n322_n422_n432.png";
import clearDay from "../../images/weather/day/d000_d100.png";
import partlyCloudyDay from "../../images/weather/day/d200_d300.png";
import coveredDay from "../../images/weather/day/d400.png";
import cirrusDay from "../../images/weather/day/d500.png";
import fogDay from "../../images/weather/day/d600.png";
import partlyCloudyRainDay from "../../images/weather/day/d210_d310_d220_d320.png";
import drizzlesDay from "../../images/weather/day/d410.png";
import rainDay from "../../images/weather/day/d420.png";
import heavyRainDay from "../../images/weather/day/d430.png";
import partlyCloudyThunderDay from "../../images/weather/day/d240.png";
import cloudyThunderDay from "../../images/weather/day/d340.png";
import rainThunderDay from "../../images/weather/day/d440.png";
import sleetDay from "../../images/weather/day/d211_d311_d411_d221_d321_d421_d431.png";
import snowDay from "../../images/weather/day/d212_d312_d412_d222_d322_d422_d432.png";

export const weatherLogos = {
  n000: clearNight,
  n100: clearNight,
  n200: partlyCloudyNight,
  n300: partlyCloudyNight,
  n400: coveredNight,
  n500: cirrusNight,
  n600: fogNight,
  n210: partlyCloudyDrizzlesNight,
  n310: partlyCloudyDrizzlesNight,
  n410: partlyCloudyDrizzlesNight,
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
  d400: coveredDay,
  d500: cirrusDay,
  d600: fogDay,
  d210: partlyCloudyRainDay,
  d310: partlyCloudyRainDay,
  d220: partlyCloudyRainDay,
  d320: partlyCloudyRainDay,
  d410: drizzlesDay,
  d420: rainDay,
  d430: heavyRainDay,
  d240: partlyCloudyThunderDay,
  d340: cloudyThunderDay,
  d440: rainThunderDay,
  d211: sleetDay,
  d311: sleetDay,
  d411: sleetDay,
  d221: sleetDay,
  d321: sleetDay,
  d421: sleetDay,
  d431: sleetDay,
  d212: snowDay,
  d312: snowDay,
  d412: snowDay,
  d222: snowDay,
  d322: snowDay,
  d422: snowDay,
  d432: snowDay,
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
