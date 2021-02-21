import { Travel } from "../../shared/types";

export type TravelsModalProps = {
  isModalOpen: boolean;
  selectedTravels: Travel[];
  handleCloseModal: () => void;
}
