import { useState, useCallback, useEffect } from "react";
import useSelectedItems from "use-selected-items-hook";
import { BeatLoader } from "react-spinners";
import classNames from "classnames";

import { Travel } from "../shared/types";
import { AspectRatio } from "../components/ui";
import TravelsModal from "../components/TravelsModal";
import travels from "../fixtures/travels";

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

  const {
    items,
    selectedItems,
    toggleAllItems,
    toggleSingleItem,
  } = useSelectedItems<Travel>({
    itemIdentifierKey: "id",
    initialItems: travelsItems,
  });

  const fetchTravels = useCallback(() => {
    getTravels()
      .then(response => {
        setTravelsItems(response);
      });
  }, []);

  useEffect(() => {
    fetchTravels();
  }, [fetchTravels]);

  const handleClick = (item) => () => {
    toggleSingleItem(item);
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
          <div className="flex flex-col items-center">
            <button
              type="button"
              className="bg-none border-none flex items-center text-indigo-500 focus:outline-none focus:shadow-outline rounded-full"
              onClick={handleOpenModal}
            >
              Submit
            </button>

            <button
              type="button"
              className="bg-none border-none flex items-center text-indigo-500 focus:outline-none focus:shadow-outline rounded-full"
              onClick={toggleAllItems}
            >
              Toggle All
            </button>
          </div>
        </header>

        <main className="mt-auto mb-auto p-4 px-12 space-y-12">
          {
            items?.length ? (
              items.map((item) => {
                const itemClasses = classNames("relative cursor-pointer rounded-lg border-4 border-white border-solid", {
                  "border-indigo-500": item.isSelected,
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
        selectedTravels={selectedItems}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
};

export default Main;
