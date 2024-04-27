import { showPopup, closePopup, CloseIcon } from "../../components/Popup";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { BigNumberish, ethers } from "ethers";
import { Occasion, getSeatsTaken } from "../../libs/index";
import Seat from "./Seat";
const WalkWay = () => (
  <div className="bg-[#2b2727] flex items-center text-white w-8 relative">
    <span className="absolute -left-[22px] rotate-90 origin-center">
      WALKWAY
    </span>
  </div>
);
const SeatChart = ({ occasion }: { occasion: Occasion }) => {
  const [seatsTaken, setSeatsTaken] = useState([] as number[]);
  const onMounted = async () => {
    const res = await getSeatsTaken(occasion.id);
    setSeatsTaken(res.map((seat) => Number(seat)));
  };
  useEffect(() => {
    onMounted();
  }, []);
  const isTaken = (seat: number) => {
    return seatsTaken.includes(seat);
  };
  return (
    <div className="bg-white rounded-md p-4 relative w-[1280px] h-[926px] bg-gradient-to-b from-blue-500 via-transparent to-white">
      <CloseIcon />
      <h2 className="text-white text-3xl font-light mb-4">
        {occasion.name} Seating Map
      </h2>
      <div>
        <div className="bg-[#2b2727] text-white text-center py-16 font-semibold rounded-b-2xl border-black border-[3px] mb-2">
          STAGE
        </div>
        <div className="flex justify-between">
          <div className="w-[224px] h-[675px] grid grid-cols-5 grid-rows-10">
            {Array(25)
              .fill(null)
              .map((e, i) => (
                <div key={i}>
                  <Seat
                    occasionId={occasion.id}
                    seat={i + 1}
                    disabled={isTaken(i + 1)}
                    amount={occasion.cost}
                    updateSeats={onMounted}
                  />
                </div>
              ))}
          </div>
          <WalkWay />
          <div className="w-[672px] h-[675px] grid grid-cols-15 grid-rows-10">
            {Array(occasion.maxTickets - 50)
              .fill(null)
              .map((e, i) => (
                <div key={i}>
                  <Seat
                    occasionId={occasion.id}
                    seat={i + 26}
                    disabled={isTaken(i + 26)}
                    amount={occasion.cost}
                    updateSeats={onMounted}
                  />
                </div>
              ))}
          </div>
          <WalkWay />
          <div className="w-[224px] h-[675px] grid grid-cols-5 grid-rows-10">
            {Array(25)
              .fill(null)
              .map((e, i) => (
                <div key={i}>
                  <Seat
                    occasionId={occasion.id}
                    seat={occasion.maxTickets - 24 + i}
                    disabled={isTaken(occasion.maxTickets - 24 + i)}
                    amount={occasion.cost}
                    updateSeats={onMounted}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const showSeatChart = (occasion: Occasion): void => {
  showPopup(<SeatChart occasion={occasion} />);
};

export default showSeatChart;
