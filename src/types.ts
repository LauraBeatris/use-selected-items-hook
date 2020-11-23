export type SelectedItem<T> = T & {
  isSelected: boolean;
};

export interface HookArguments<T> {
  initialItems: T[];
  itemIdentifierKey?: any;
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

export interface State<T = any> extends HookArguments<T> {
  selectedItems: SelectedItem<T>[];
}
