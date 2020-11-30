import { Item } from "use-selected-items-hook/types";

import { Travel } from "../../shared/types";

export interface TravelsModalProps {
  isModalOpen: boolean;
  selectedTravels: Item<Travel>[];
  handleCloseModal: () => void;
}
