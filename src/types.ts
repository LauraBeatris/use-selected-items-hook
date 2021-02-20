export type DefaultItem = Record<any, any>;

export type DefaultItemIdentifierKey = any;

export type ItemWithSelectedState<T> = T & {
  isSelected: boolean;
  [key: string]: any;
}

export type Arguments<Item, ItemIdentifierKey extends string> = {
  initialItems: Array<Item>;
  itemIdentifierKey: ItemIdentifierKey;
  initialSelectedItems?: Array<Item>;
}

export type State<Item, IdentifierKey extends string> = {
  items: Array<ItemWithSelectedState<Item>>;
  itemIdentifierKey: IdentifierKey;
}

export const ActionType = {
  INITIALIZE_ITEMS: "INITIALIZE_ITEMS",
  TOGGLE_ALL_ITEMS: "TOGGLE_ALL_ITEMS",
  TOGGLE_SINGLE_ITEM: "TOGGLE_SINGLE_ITEM",
} as const;

type ActionPayloads<Item extends DefaultItem, ItemIdentifierKey extends string> = {
  [ActionType.TOGGLE_SINGLE_ITEM]: {
    itemIdentifierValue?: Item[ItemIdentifierKey];
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

export type Action<Item, ItemIdentifierKey extends string> = (
  ActionMap<ActionPayloads<Item, ItemIdentifierKey>>[
    keyof ActionMap<ActionPayloads<Item, ItemIdentifierKey>>
  ]
)
