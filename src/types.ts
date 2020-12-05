export type DefaultItem = Record<any, any>;

export type DefaultItemIdentifierKey = any;

export interface Arguments<T = DefaultItem, K = DefaultItemIdentifierKey> {
  initialItems: T[];
  itemIdentifierKey: K;
  initialSelectedItems?: T[];
}

export type Item<T> = T & {
  isSelected: boolean;
}

export interface State<T = DefaultItem, K = DefaultItemIdentifierKey> {
  items: Item<T>[];
  itemIdentifierKey: K;
}

export interface HookReturnValues<T> {
  items: Item<T>[];
  selectedItems: Item<T>[];
  toggleAllItems: () => void;
  toggleSingleItem: (itemIdentifierValue: any) => void;
}

export enum ActionType {
  INITIALIZE_ITEMS,
  TOGGLE_ALL_ITEMS,
  TOGGLE_SINGLE_ITEM,
}

interface ActionPayloads extends Record<ActionType, any> {
  [ActionType.TOGGLE_SINGLE_ITEM]: {
    itemIdentifierValue?: any;
  };
  [ActionType.INITIALIZE_ITEMS]: {
    initialSelectedItems: Item<any>[];
    initialItems: Item<any>[];
  };
}

type ActionMap<M extends Record<string, any>> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      }
};

export type Action = ActionMap<ActionPayloads>[keyof ActionMap<ActionPayloads>]
