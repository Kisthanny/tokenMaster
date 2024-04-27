import { ethers } from "ethers";
import { Occasion } from "../../libs";
import showSeatChart from "./SeatChartPopup";
const OccasionItem = ({ occasion }: { occasion: Occasion }) => {
  const isSoldOut = occasion.tickets <= 0;

  return (
    <div className="border-b-2 pt-2 pb-4 ">
      <div className="p-2 flex justify-between items-center hover:bg-opacity-20 hover:bg-[rgb(18,90,198)]">
        <p className="flex flex-col items-start w-[100px]">
          <span className="text-lg font-bold">{occasion.date}</span>
          <span className="text-lg font-light">{occasion.time}</span>
        </p>
        <p className="flex flex-col items-center w-[360px]">
          <span className="text-lg font-semibold">{occasion.name}</span>
          <span className="font-light">{occasion.location}</span>
        </p>
        <p className="w-[100px] text-center">
          <span className="text-2xl font-bold">
            {ethers.formatEther(occasion.cost)}
          </span>
          <span className="text-lg font-light">ETH</span>
        </p>
        <button
          onClick={showSeatChart.bind(null, occasion)}
          className={`w-36 h-11 rounded-md text-center text-white text-lg ${
            isSoldOut ? "bg-[#ba1840]" : "bg-[#125ac6] hover:bg-[#0237ab]"
          }`}
          disabled={isSoldOut}
        >
          {isSoldOut ? "Sold Out" : "View Seats"}
        </button>
      </div>
    </div>
  );
};

export default OccasionItem;
