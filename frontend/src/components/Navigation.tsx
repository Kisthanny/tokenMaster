import Connect from "./Connect";
import LinkBar from "./LinkBar";
import Search from "./Search";
const Navigation = () => {
  return (
    <nav className="bg-[#024ddf] flex items-center justify-between px-8 py-4">
      <div className="flex items-center gap-4">
        <h1 className="font-poiret text-3xl font-bold text-white">tokenmaster</h1>
        <Search />
        <LinkBar />
      </div>
      <div>
        <Connect />
      </div>
    </nav>
  );
};

export default Navigation;
