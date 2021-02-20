export type DefaultItem = Record<any, any>;

export type ItemIdentifierKey<Item> = keyof Item;

export type ItemWithSelectedState<T> = T & {
  isSelected: boolean;
  [key: string]: any;
}

export type Arguments<Item> = {
  initialItems: Array<Item>;
  itemIdentifierKey: ItemIdentifierKey<Item>;
  initialSelectedItems?: Array<Item>;
}

export type State<Item> = {
  items: Array<ItemWithSelectedState<Item>>;
  itemIdentifierKey: ItemIdentifierKey<Item>;
}

export const ActionType = {
  INITIALIZE_ITEMS: "INITIALIZE_ITEMS",
  TOGGLE_ALL_ITEMS: "TOGGLE_ALL_ITEMS",
  TOGGLE_SINGLE_ITEM: "TOGGLE_SINGLE_ITEM",
} as const;

type ActionPayloads<Item extends DefaultItem> = {
  [ActionType.TOGGLE_SINGLE_ITEM]: {
    itemIdentifierValue?: Item[ItemIdentifierKey<Item>];
  };
  [ActionType.INITIALIZE_ITEMS]: {
    initialSelectedItems: Array<Item>;
    initialItems: Array<Item>;
  };
  [ActionType.TOGGLE_ALL_ITEMS]: undefined;
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

export type Action<Item> = (
  ActionMap<ActionPayloads<Item>>[keyof ActionMap<ActionPayloads<Item>>]
)
