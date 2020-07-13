import { useSelectedItems } from "use-selected-items-hook/lib/index";
import classNames from "classnames";

import { AspectRatio } from "../components/ui";

interface Travel {
  name: string;
  id: string | number;
  imageUrl: string;
}

const travels: Travel[] = [
  {
    id: 1,
    name: "EUA - Los Angeles",
    imageUrl: "https://66.media.tumblr.com/40cbf00f0b23c35a30d4a08d412a7f16/d14f7f222e57dc1e-fa/s640x960/fc98013b4b08a050149393b075283b4d6de4c45b.jpg",
  }, {
    id: 2,
    name: "Greece - Santorini",
    imageUrl: "https://66.media.tumblr.com/8b7b54d543461248467d6506378ae799/c23c7f06d26fee15-f1/s640x960/8fba2bc5555c8167cb5d5dc2b017f7354039cb6e.jpg",
  },
  {
    id: 3,
    name: "United Kingdom - London",
    imageUrl: "https://66.media.tumblr.com/09c8ef07503ccfe6f367523e7162ff4c/01e3da03a5febf04-7d/s1280x1920/ca503d79ff6b621c8c210638149dfc0118e318b4.jpg",
  },
];

const Main: React.FC = () => {
  const [_, listItems, { toggleItem }] = useSelectedItems({
    itemIdentifier: "id",
    items: travels,
  });

  const handleClick = (item) => () => {
    toggleItem(item);
  };

  return (
    <div>
      <header className="p-4 border-b-2 border-gray-200 flex justify-between items-center relative">
        <h1 className="text-3xl font-semibold text-gray-800">Select a travel</h1>
        <button
          type="button"
          className="bg-none border-none flex items-center text-indigo-500 focus:outline-none focus:shadow-outline rounded-full p-1"
        >
          Submit
        </button>
      </header>

      <main className="p-4 mt-4">
        <div className="px-12 space-y-12">
          {listItems.map((item) => {
            const itemClasses = classNames("relative cursor-pointer rounded-lg border-4 border-white border-solid", {
              "border-indigo-500": item.selected,
            });

            return (
              <div
                key={item.id}
                className={itemClasses}
                onClick={handleClick(item)}
              >
                <AspectRatio ratio={4 / 5}>
                  <img
                    src={item.imageUrl}
                    className="w-full h-full object-cover rounded-lg"
                    alt="Travel"
                    aria-label={item.name}
                  />
                </AspectRatio>
                <p className="bg-white m-2 rounded px-2 py-1 bg-opacity-90 text-sm font-semibold absolute bottom-0 inset-x-0">
                  {item.name}
                </p>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Main;
