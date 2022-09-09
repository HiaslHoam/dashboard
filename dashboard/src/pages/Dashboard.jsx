import React from "react";
import Calendar from "../components/Calendar/Calendar";
import Dreamary from "../components/Dreamary/Dreamary";
import Naturely from "../components/Naturely/Naturely";
import Sportify from "../components/Sportify/Sportify";
import Strava from "../components/Strava/Strava";
import ToDos from "../components/ToDos/ToDos";
import Weather from "../components/Weather/Weather";

function Dashboard() {
  return (
    <div className="">
      {/* <h1 className="text-xl font-bold dark:text-white">Dashboard</h1> */}
      <div className="flex flex-row gap-5 justify-center flex-wrap md:flex-row items-center mt-3 mb-3">
        <Naturely></Naturely>
        <div className="flex gap-5 flex-col">
          <Weather></Weather>
          <Dreamary></Dreamary>
        </div>
        <div className="flex gap-5 flex-col ">
          <ToDos></ToDos>
          <Calendar></Calendar>
        </div>
        <div className="flex gap-5 flex-col ">
          <Sportify></Sportify>
          <Strava></Strava>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
