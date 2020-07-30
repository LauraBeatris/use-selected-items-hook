import { useState, useCallback, useEffect } from "react";
import useSelectedItems from "use-selected-items-hook";
import { BeatLoader } from "react-spinners";
import classNames from "classnames";

import { AspectRatio } from "../components/ui";
import TravelsModal from "../components/TravelsModal";
import travels from "../fixtures/travels";
import { Travel } from "../shared/types";

const getTravels = (): Promise<Travel[]> => (
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(travels);
    }, 2000);
  })
);

const Main: React.FC = () => {
  const [travelsItems, setTravelsItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [
    selectedItems,
    listItems,
    { toggleItem },
  ] = useSelectedItems<Travel>({
    itemIdentifier: "id",
    items: travelsItems,
  });

  const fetchTravels = useCallback(async () => {
    getTravels()
      .then(response => {
        setTravelsItems(response);
      });
  }, []);

  useEffect(() => {
    fetchTravels();
  }, [fetchTravels]);

  const handleClick = (item) => () => {
    toggleItem(item);
  };

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <>
      <div className="h-full flex flex-col">
        <header className="p-4 border-b-2 border-gray-200 flex justify-between items-center relative">
          <h1 className="text-3xl font-semibold text-gray-800">Select a travel</h1>
          <button
            type="button"
            className="bg-none border-none flex items-center text-indigo-500 focus:outline-none focus:shadow-outline rounded-full p-1"
            onClick={handleOpenModal}
          >
            Submit
          </button>
        </header>

        <main className="mt-auto mb-auto p-4 px-12 space-y-12">
          {
            listItems?.length ? (
              listItems.map((item) => {
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
              })
            ) : (
              <div className="h-full flex items-center justify-center">
                <BeatLoader />
              </div>
            )
          }
        </main>
      </div>

      <TravelsModal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        travels={selectedItems}
      />
    </>
  );
};

export default Main;
