import React from "react";

function StravaTile({ title, display, background }) {
  return (
    <div>
      {background === "plain" && (
        <div className="bg-white dark:bg-zinc-800 shadow-md tile mb-3 flex flex-col justify-center rounded-2xl text-black dark:text-white text-xs">
          {title}
          <p>
            <span className="font-bold text">{display}</span>
          </p>
        </div>
      )}
      {background === "blur" && (
        <div className="backdrop-blur shadow-md tile mb-3 flex flex-col justify-center rounded-2xl text-white text-xs">
          {title}
          <p>
            <span className="font-bold text">{display}</span>
          </p>
        </div>
      )}
    </div>
  );
}

export default StravaTile;
