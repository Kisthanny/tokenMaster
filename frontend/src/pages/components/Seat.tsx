import { mint } from "../../libs";
const Seat = ({
  occasionId,
  seat,
  amount,
  disabled,
  updateSeats,
}: {
  occasionId: string;
  seat: number;
  amount: string;
  disabled: boolean;
  updateSeats: Function;
}) => {
  const handleClick = async () => {
    await mint(occasionId, seat, amount);
    updateSeats();
  };
  return (
    <button
      className="bg-blue-500 disabled:bg-gray-700 disabled:text-gray-200 w-8 h-8 rounded-full border border-black"
      onClick={handleClick}
      disabled={disabled}
    >
      {seat}
    </button>
  );
};

export default Seat;
