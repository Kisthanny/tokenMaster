export const links = [
  {
    text: "Concerts",
    url: "#concerts",
  },
  {
    text: "Sports",
    url: "#sports",
  },
  {
    text: "Art & Theater",
    url: "#art",
  },
  {
    text: "More",
    url: "#more",
  },
];
const LinkBar = () => {
  return (
    <ul className="flex text-white text-xl">
      {links.map((link) => (
        <li
          key={link.url}
          className="bg-transparent hover:bg-opacity-10 hover:bg-white text-white transition ease-in px-2 py-2"
        >
          <a href={link.url}>{link.text}</a>
          
        </li>
      ))}
    </ul>
  );
};

export default LinkBar;
