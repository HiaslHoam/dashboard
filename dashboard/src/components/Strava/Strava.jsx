import React from "react";
import StravaTile from "./StravaTile";
import data from "./data.json";

function Strava() {
  const stravadata = data;
  console.log(stravadata);

  function distancerender(distance) {
    if (distance <= 1000) {
      return distance.toFixed(0) + "m";
    } else if (distance <= 10000) {
      return (distance / 1000).toFixed(1) + "km";
    } else {
      return (distance / 1000).toFixed(0) + "km";
    }
  }

  function totaldistance() {
    let total = null;
    stravadata.forEach((item) => {
      total += item.distance;
    });
    return distancerender(total);
  }
  function avghrt() {
    let total = null;
    let count = null;
    stravadata.forEach((item) => {
      if (item.has_heartrate) {
        total += item.average_heartrate;
      } else {
        count += 1;
      }
    });
    const output = total / (stravadata.length - count);
    return output.toFixed(0);
  }

  function avgpace() {
    let total = null;
    stravadata.forEach((item) => {
      total += (item.average_speed * 3.6) / stravadata.length;
    });
    if (total <= 10) {
      return total.toFixed(1) + "km/h";
    } else {
      return total.toFixed(0) + "km/h";
    }
  }

  function totalsuffer() {
    let total = null;
    stravadata.forEach((item) => {
      if (item.has_heartrate) {
        total += item.suffer_score;
      }
    });
    return total;
  }

  function totalhm() {
    let total = null;
    stravadata.forEach((item) => {
      total += item.total_elevation_gain;
    });
    if (total <= 10) {
      return total.toFixed(1) + "m";
    } else {
      return total.toFixed(0) + "m";
    }
  }

  function totaltime() {
    let total = null;
    stravadata.forEach((item) => {
      total += item.moving_time;
    });
    if (total <= 3600) {
      return (total / 60).toFixed(0) + "min";
    } else {
      return (total / 3600).toFixed(0) + "h";
    }
  }

  function totalkudos() {
    let total = null;
    stravadata.forEach((item) => {
      total += item.kudos_count;
    });
    return total;
  }

  return (
    <div>
      <div className="Strava flex flex-col gap-3 justify-between text-white shadow-lg rounded-2xl p-4">
        <div className="flex flex-row justify-between">
          <div className="font-bold">STRAVA</div>
          <div>Dieser Monat</div>
        </div>
        <div className="bg-white shadow-md rounded-2xl">
          <div className="activities  text-black  text-xs m-1 overflow-hidden">
            {stravadata.map((activity, index) => (
              <div key={index} className="">
                <span className="activity-name">{activity.name} </span>|
                <span className="inline-block">{activity.type} </span>|{" "}
                {distancerender(activity.distance)} |{" "}
                {activity.suffer_score <= 50 && (
                  <span className="text-warning font-semibold">
                    {activity.suffer_score}
                  </span>
                )}
                {activity.suffer_score >= 50 && (
                  <span className="text-error font-semibold">
                    {activity.suffer_score}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="text-black">{stravadata.name}</div>
        <div className="grid grid-cols-4 gap-4 justify-items-center">
          <StravaTile title="Distanz" display={totaldistance()}></StravaTile>
          <StravaTile title="Aktivit." display={stravadata.length}></StravaTile>
          <StravaTile title="⌀ Puls" display={avghrt()}></StravaTile>
          <StravaTile title="Anstr." display={totalsuffer()}></StravaTile>
          <StravaTile title="Anstieg" display={totalhm()}></StravaTile>
          <StravaTile title="Dauer" display={totaltime()}></StravaTile>
          <StravaTile title="Kudos" display={totalkudos()}></StravaTile>
          <StravaTile title="⌀ Gesch." display={avgpace()}></StravaTile>
        </div>
      </div>
    </div>
  );
}

export default Strava;
