import React from "react";

function StravaTile({ title, display }) {
  return (
    <div>
      <div className="bg-white dark:bg-zinc-800 shadow-md tile flex flex-col justify-center rounded-2xl text-black dark:text-white text-xs">
        {title}
        <p>
          <span className="font-bold text">{display}</span>
        </p>
      </div>
    </div>
  );
}

export default StravaTile;
