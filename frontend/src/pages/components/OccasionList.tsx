import { useEffect, useState } from "react";
import { getTokenMasterContract, getOccasionList, Occasion } from "../../libs";
import OccasionItem from "./OccasionItem";

const OccasionList = () => {
  const [occasionList, setOccasionList] = useState([] as Occasion[]);
  const onMounted = async () => {
    setOccasionList(await getOccasionList());
  };

  useEffect(() => {
    onMounted();
  }, []);
  return (
    <div className="flex items-center justify-center">
      <ul className="w-[912px]">
        {occasionList.map((item, index) => (
          <li key={index}>
            <OccasionItem occasion={item} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OccasionList;
