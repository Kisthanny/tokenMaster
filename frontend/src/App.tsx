import { useEffect, useState } from "react";
import { useAppDispatch } from "./hooks";
import { setCurrentSigner } from "./store/accountSlice";
import Navigation from "./components/Navigation";
import EventTickets from "./pages/EventTickets";

function App() {
  const dispatch = useAppDispatch();

  const handleAccountChanged = () => {
    dispatch(setCurrentSigner());
  };
  const onMounted = async () => {
    try {
      const ethereum = window.ethereum;
      if (ethereum === undefined) {
        throw new Error("Please install Metamask");
      }
      const result: string[] = await ethereum.request({
        method: "eth_accounts",
      });
      if (result.length) {
        dispatch(setCurrentSigner());
      }

      ethereum.on("accountsChanged", handleAccountChanged);
    } catch (error) {}
  };

  useEffect(() => {
    onMounted();
  }, []);
  return (
    <main id="main">
      <Navigation />
      <EventTickets />
    </main>
  );
}

export default App;
