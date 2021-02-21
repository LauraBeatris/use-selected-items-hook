import {
  useMemo,
  useEffect,
  useReducer,
  useCallback,
} from "react";

import { Arguments, ActionType, DefaultItem } from "./types";
import reducer from "./reducer";
import { ERROR_MESSAGES } from "./constants";

function useSelectedItems<Item extends DefaultItem>({
  initialItems = [],
  itemIdentifierKey,
  initialSelectedItems = [],
}: Arguments<Item>) {
  const [{ items }, dispatch] = useReducer(
    reducer<Item>(),
    { items: [], itemIdentifierKey },
  );

  const toggleSingleItem = useCallback((item: Item) => {
    dispatch({
      type: ActionType.TOGGLE_SINGLE_ITEM,
      payload: {
        itemIdentifierValue: item[itemIdentifierKey],
      },
    });
  }, [itemIdentifierKey]);

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
      throw new Error(ERROR_MESSAGES.INVALID_ITEM_IDENTIFIER);
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
  ), [items]) as Array<Item>;

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
