import React, { useEffect, useState } from "react";
import StravaTile from "./StravaTile";
import { getStravaData } from "../../logic/functions";
import ScrollContainer from "react-indiana-drag-scroll";
import { useRef } from "react";

function Strava() {
  const [stravaData, setStravaData] = useState();
  const ref = useRef(null);

  const StravaData = async () => {
    const response = await getStravaData();
    console.log(response);
    setStravaData(response.data);
  };

  function distancerender(distance) {
    if (distance <= 1000) {
      return distance.toFixed(0) + "m";
    } else if (distance <= 10000) {
      return (distance / 1000).toFixed(1) + "km";
    } else {
      return (distance / 1000).toFixed(0) + "km";
    }
  }

  function timerender(time) {
    if (time <= 3600) {
      return (time / 60).toFixed(0) + "min";
    } else {
      return (time / 3600).toFixed(0) + "h";
    }
  }

  function totaldistance() {
    let total = null;
    stravaData.forEach((item) => {
      total += item.distance;
    });
    return distancerender(total);
  }
  function avghrt() {
    let totalbpm = null;
    let totaltime = null;
    stravaData.forEach((item) => {
      if (item.hasHeartrate) {
        totalbpm += item.averageHeartrate * item.movingTime;
        totaltime += item.movingTime;
      }
    });
    const output = totalbpm / totaltime;
    return output.toFixed(0);
  }

  function avgpace() {
    let totalspd = null;
    let totaltime = null;
    let total = null;
    stravaData.forEach((item) => {
      totalspd += item.averageSpeed * 3.6 * item.movingTime;
      totaltime += item.movingTime;
    });
    total = totalspd / totaltime;
    if (total <= 10) {
      return total.toFixed(1) + "km/h";
    } else {
      return total.toFixed(0) + "km/h";
    }
  }

  function totalsuffer() {
    let total = null;
    stravaData.forEach((item) => {
      total += item.sufferScore;
    });
    return total;
  }

  function totalhm() {
    let total = null;
    stravaData.forEach((item) => {
      total += item.elevationGain;
    });
    if (total <= 10) {
      return total.toFixed(1) + "m";
    } else {
      return total.toFixed(0) + "m";
    }
  }

  function totaltime() {
    let total = null;
    stravaData.forEach((item) => {
      total += item.movingTime;
    });
    return timerender(total);
  }

  function totalkudos() {
    let total = null;
    stravaData.forEach((item) => {
      total += item.kudosCount;
    });
    return total;
  }

  useEffect(() => {
    StravaData();
  }, []);

  return (
    <div>
      <div className="Strava shadow-lg rounded-2xl">
        <div className="p-4">
          <div className="flex flex-row justify-between text-white">
            <div className="font-bold">STRAVA</div>
            <div>Diese Woche</div>
          </div>
          {stravaData?.length > 0 && (
            <div className="flex flex-col gap-3 justify-between text-white ">
              {/* <div className="bg-white dark:bg-zinc-800 shadow-md rounded-2xl">
              <div className="activities text-black dark:text-white text-xs m-1 overflow-hidden">
                {stravaData.map((activity, index) => (
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
            </div> */}
              <ScrollContainer className="grid grid-flow-col gap-5">
                {stravaData.map((activity, index) => {
                  return (
                    <div>
                      <div
                        key={index}
                        className="shadow-md mb-2 tile-xl rounded-2xl text-white dark:text-white text-xs flex flex-col justify-between"
                        ref={ref}
                        id="test"
                        style={{
                          background: `url(${activity.photoUrl})`,
                          backgroundSize: "cover",
                          boxShadow:
                            "rgb(0 0 0 / 70%) 1px 55px 40px -50px inset",
                        }}
                      >
                        <div className="flex flex-row justify-between pl-2 pr-2 pt-1">
                          <div>{activity.name}</div>
                          <div className="font-bold text">{activity.type}</div>
                        </div>
                        <div className="flex flex-row gap-3 justify-center">
                          <StravaTile
                            title="Distanz"
                            display={distancerender(activity.distance)}
                            background="blur"
                          ></StravaTile>
                          <StravaTile
                            title="Anstieg"
                            display={activity.elevationGain?.toFixed(0) + "m"}
                            background="blur"
                          ></StravaTile>
                          {activity.hasHeartrate === 1 && (
                            <StravaTile
                              title="⌀ Puls"
                              display={activity.averageHeartrate?.toFixed(0)}
                              background="blur"
                            ></StravaTile>
                          )}
                          {activity.hasHeartrate === 1 && (
                            <StravaTile
                              title="Anstr."
                              display={activity.sufferScore}
                              background="blur"
                            ></StravaTile>
                          )}
                          {activity.hasHeartrate === 0 && (
                            <StravaTile
                              title="Dauer"
                              display={timerender(activity.movingTime)}
                              background="blur"
                            ></StravaTile>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </ScrollContainer>
              <div className="text-black">{stravaData.name}</div>
              <ScrollContainer className="flex flex-row gap-4 justify-items-center -mt-2">
                <StravaTile
                  title="Distanz"
                  display={totaldistance()}
                  background="plain"
                ></StravaTile>
                <StravaTile
                  title="Aktivit."
                  display={stravaData.length}
                  background="plain"
                ></StravaTile>
                <StravaTile
                  title="⌀ Puls"
                  display={avghrt()}
                  background="plain"
                ></StravaTile>
                <StravaTile
                  title="Anstr."
                  display={totalsuffer()}
                  background="plain"
                ></StravaTile>
                <StravaTile
                  title="Anstieg"
                  display={totalhm()}
                  background="plain"
                ></StravaTile>
                <StravaTile
                  title="Dauer"
                  display={totaltime()}
                  background="plain"
                ></StravaTile>
                <StravaTile
                  title="Kudos"
                  display={totalkudos()}
                  background="plain"
                ></StravaTile>
                <StravaTile
                  title="⌀ Gesch."
                  display={avgpace()}
                  background="plain"
                ></StravaTile>
              </ScrollContainer>
            </div>
          )}
          {stravaData?.length === 0 && (
            <div className="flex flex-col gap-3 justify-between text-white">
              Keine Aktivitäten diese Woche
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Strava;
