import { SetStateAction, Dispatch } from "react";

export type Item<T> = T & {
  selected: boolean;
};

export interface Actions<T> {
  toggleItem: (item: T) => void;
  setSelectedItems: Dispatch<SetStateAction<T[]>>;
  setItemsList: Dispatch<SetStateAction<Item<T>[]>>;
}

export interface HookArguments<T = any> {
  items: T[];
  itemIdentifier?: any;
}

export type HookReturnValues<T> = [T[], Item<T>[], Actions<T>];
