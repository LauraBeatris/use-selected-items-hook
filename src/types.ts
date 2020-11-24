export interface HookArguments<T, K> {
  initialItems: T[];
  itemIdentifierKey?: K;
  initialSelectedItems?: T[];
}

export interface Action {
  type: ActionType;
  payload?: Partial<HookArguments<any, any>> & {
    itemIdentifierValue?: any;
  };
}

export enum ActionType {
  INITIALIZE_ITEMS,
  TOGGLE_ITEM
}

export type Item<T> = T & {
  isSelected: boolean;
}

export interface State<T = any, K = any> {
  items: Item<T>[];
  itemIdentifierKey: K;
}
