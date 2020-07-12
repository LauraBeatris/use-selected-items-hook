import { SetStateAction } from "react";

export type InitialStateSetter<S> = () => S;
export type InitialHookState<S> = S | InitialStateSetter<S>;

export interface Actions<T> {
  toggleItem: (T) => void,
  setItems: React.Dispatch<SetStateAction<T[]>>
}
