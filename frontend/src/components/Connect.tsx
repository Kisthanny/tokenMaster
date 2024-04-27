import { useAppSelector } from "../hooks";
const Connect = () => {
  const currentWalletAddress = useAppSelector(
    (state) => state.account.currentWalletAddress
  );
  const handleConnect = async () => {
    try {
      const ethereum = window.ethereum;
      if (ethereum === undefined) {
        throw new Error("Please install Metamask");
      }
      await ethereum.request({
        method: "eth_requestAccounts",
      });
    } catch (error) {}
  };
  const addressFilter = (address: string) => {
    if (address.length <= 10) {
      return address;
    }
    return `${address.slice(2, 6)}...${address.slice(-4)}`;
  };
  return (
    <button
      onClick={handleConnect}
      className="bg-transparent hover:bg-opacity-10 hover:bg-white text-white transition ease-in px-4 py-2 rounded-md font-semibold"
    >
      {currentWalletAddress ? addressFilter(currentWalletAddress) : "connect"}
    </button>
  );
};

export default Connect;
