import { Item } from "use-selected-items-hook/dist/types";

import { Travel } from "../../shared/types";

export type TravelsModalProps = {
  isModalOpen: boolean;
  selectedTravels: Item<Travel>[];
  handleCloseModal: () => void;
}
