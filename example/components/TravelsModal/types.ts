import { ItemWithSelectedState } from "use-selected-items-hook/dist/types";

import { Travel } from "../../shared/types";

export type TravelsModalProps = {
  isModalOpen: boolean;
  selectedTravels: ItemWithSelectedState<Travel>[];
  handleCloseModal: () => void;
}
