import {
  Reducer,
  useMemo,
  useEffect,
  useReducer,
  useCallback,
} from "react";

import reducer from "./reducer";
import {
  State,
  Action,
  Arguments,
  ActionType,
  DefaultItem,
} from "./types";
import { INITIAL_STATE } from "./constants";

function useSelectedItems<Item extends DefaultItem, ItemIdentifierKey extends string>({
  initialItems = [],
  itemIdentifierKey,
  initialSelectedItems = [],
}: Arguments<Item, ItemIdentifierKey>) {
  const [{ items }, dispatch] = useReducer<
    Reducer<State<Item, ItemIdentifierKey>, Action<Item, ItemIdentifierKey>>,
    State<Item, ItemIdentifierKey>
  >(
    reducer<Item, ItemIdentifierKey>(),
    INITIAL_STATE,
    (state: State<Item, ItemIdentifierKey>) => ({
      ...state,
      itemIdentifierKey,
    }),
  );

  const toggleSingleItem = useCallback((itemIdentifierValue: Item[ItemIdentifierKey]) => {
    dispatch({
      type: ActionType.TOGGLE_SINGLE_ITEM,
      payload: {
        itemIdentifierValue,
      },
    });
  }, []);

  const toggleAllItems = useCallback(() => {
    dispatch({
      type: ActionType.TOGGLE_ALL_ITEMS,
    });
  }, []);

  useEffect(() => {
    const shouldInitializeItems = (initialItems ?? []).length > 0;
    const hasItems = items.length > 0;

    if (!shouldInitializeItems || hasItems) {
      return;
    }

    dispatch({
      type: ActionType.INITIALIZE_ITEMS,
      payload: {
        initialItems,
        initialSelectedItems,
      },
    });
  }, [
    items,
    initialItems,
    initialSelectedItems,
  ]);

  useEffect(() => {
    const hasValidIdentifier = initialItems.every(item => (
      Object.prototype.hasOwnProperty.call(
        item,
        itemIdentifierKey,
      )
    ));

    const hasInitialItems = initialItems.length > 0;

    if (hasInitialItems && !hasValidIdentifier) {
      throw new Error(
        "Please, make sure to provide a valid identifier key to all items",
      );
    }
  }, [
    initialItems,
    itemIdentifierKey,
  ]);

  const selectedItems = useMemo(() => (
    items
      .filter(item => item.isSelected)
      .map(({ isSelected: _isSelected, ...rest }) => ({
        ...rest,
      }))
  ), [items]);

  const payload = useMemo(
    () => ({
      items,
      selectedItems,
      toggleAllItems,
      toggleSingleItem,
    }),
    [
      items,
      selectedItems,
      toggleAllItems,
      toggleSingleItem,
    ],
  );

  return payload;
}

export default useSelectedItems;
