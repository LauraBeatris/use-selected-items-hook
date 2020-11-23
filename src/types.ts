export type SelectedItem<T> = T & {
  isSelected: boolean;
};

export interface HookArguments<T, K> {
  initialItems: T[];
  itemIdentifierKey?: K;
  initialSelectedItems?: T[];
}

export interface Action {
  type: ActionType;
  payload?: any;
}

export enum ActionType {
  INITIALIZE_ITEMS,
  TOGGLE_ITEM
}

export interface State<T = any, K = any> extends HookArguments<T, K> {
  selectedItems: SelectedItem<T>[];
}
