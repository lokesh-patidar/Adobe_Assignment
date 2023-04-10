import React from "react";
import { TrendData } from "../Data/TrendData";
const TrendCard = () => {
  return (
    <div className="flex flex-col gap-2 p-4 bg-white rounded-lg">
      <h2 className="font-bold text-lg mb-4">Trends fou you</h2>
      {TrendData.map((e, id) => {
        return (
          <div className=" " key={id}>
            <p className="font-bold text-md"># {e.name}</p>
            <p className="font-semibold text-sm">{e.shares}</p>
          </div>
        );
      })}
      <button className="font-bold text-xs bg-orange-400 px-3 py-2 mt-4 rounded text-white">Share</button>
    </div>
  );
};

export default TrendCard;
