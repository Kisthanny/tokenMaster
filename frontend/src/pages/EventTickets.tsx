import OccasionList from "./components/OccasionList";
const EventTickets = () => {
  return (
    <section>
      <h2 className="bg-[#024ddf] text-white text-5xl flex gap-5 pl-40 py-10">
        <span className="font-bold">Event</span>
        <span className="font-light">Tickets</span>
      </h2>
      <OccasionList />
    </section>
  );
};

export default EventTickets;
