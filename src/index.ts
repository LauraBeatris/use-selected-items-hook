import {
  useMemo,
  useEffect,
  useReducer,
  useCallback,
} from "react";

import reducer from "./reducer";
import {
  State,
  Payload,
  Arguments,
  ActionType,
  DefaultItem,
} from "./types";
import { INITIAL_STATE } from "./constants";

function useSelectedItems<T extends DefaultItem, K extends string>({
  initialItems = [],
  itemIdentifierKey,
  initialSelectedItems = [],
}: Arguments<T, K>) {
  const [{ items }, dispatch] = useReducer(
    reducer,
    INITIAL_STATE,
    (state: State) => ({
      ...state,
      itemIdentifierKey,
    }),
  );

  const toggleSingleItem = useCallback((itemIdentifierValue: T) => {
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
    const hasItemWithInvalidIdentifierKey = initialItems.some(
      (findItem: T) => {
        const hasItemIdentifierKey = Object.prototype.hasOwnProperty.call(
          findItem,
          itemIdentifierKey,
        );

        return !hasItemIdentifierKey;
      },
    );

    const hasInitialItems = initialItems.length > 0;

    if (hasInitialItems && hasItemWithInvalidIdentifierKey) {
      throw new Error(
        "Please, make sure to provide a valid identifier key to all items",
      );
    }
  }, [
    initialItems,
    itemIdentifierKey,
  ]);

  const payload = useMemo<Payload<T>>(
    () => ({
      items,
      selectedItems: items.filter(item => item.isSelected),
      toggleAllItems,
      toggleSingleItem,
    }),
    [
      items,
      toggleAllItems,
      toggleSingleItem,
    ],
  );

  return payload;
}

export default useSelectedItems;
