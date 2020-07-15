import { Modal } from "react-responsive-modal";

import { Travel } from "../shared/types";
import { AspectRatio } from "./ui";

interface TravelsModalProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  travels: Travel[]
}

const TravelsModal: React.FC<TravelsModalProps> = ({
  isModalOpen,
  handleCloseModal,
  travels,
}) => (
  <Modal
    open={isModalOpen}
    onClose={handleCloseModal}
    center
    classNames={{
      modal: "w-screen",
    }}
  >
    <header className="p-4 border-b-2 border-gray-200 flex justify-between items-center relative">
      <h1 className="text-3xl font-semibold text-gray-800">Selected travels</h1>
    </header>

    <div className="p-4 grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
      {
        travels.length ? (
          travels.map((item) => (
            <div
              key={item.id}
              className="relative rounded-lg border-4 border-white border-solid"
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
          ))
        ) : (
          <h3 className="text-xl font-semibold text-gray-800">No items selected</h3>
        )
      }
    </div>
  </Modal>
);

export default TravelsModal;
