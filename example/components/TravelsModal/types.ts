import { Travel } from "../../shared/types";

export interface TravelsModalProps {
  isModalOpen: boolean;
  selectedTravels: Travel[];
  handleCloseModal: () => void;
}
