import {
  useMemo,
  useEffect,
  useReducer,
  useCallback,
} from "react";

import reducer from "./reducer";
import { HookArguments, ActionType } from "./types";
import { DEFAULT_ITEM_IDENTIFIER_KEY, INITIAL_PAYLOAD } from "./constants";

function useSelectedItems<T extends Record<any, any>>({
  initialItems = [],
  itemIdentifierKey = DEFAULT_ITEM_IDENTIFIER_KEY,
  initialSelectedItems = [],
}: HookArguments<T>) {
  const [payload, dispatch] = useReducer(reducer, INITIAL_PAYLOAD, (state) => ({
    ...state,
    itemIdentifierKey,
    initialSelectedItems,
  }));

  useEffect(() => {
    const itemsWithInvalidIdentifers = initialItems.filter(
      (findItem: T) => {
        const hasItemIdentifierKey = Boolean(findItem[itemIdentifierKey]);

        return !hasItemIdentifierKey;
      },
    );

    const hasInitialItems = initialItems.length > 0;
    const hasItemsWithInvalidIdentifersKeys = itemsWithInvalidIdentifers.length > 0;

    if (hasInitialItems && hasItemsWithInvalidIdentifersKeys) {
      throw new Error(
        "Please, make sure to provide a valid identifier key to all items",
      );
    }
  }, [
    itemIdentifierKey,
    initialItems,
  ]);

  const toggleItem = useCallback((itemIdentifierValue: any) => {
    dispatch({
      type: ActionType.TOGGLE_ITEM,
      payload: {
        itemIdentifierValue,
      },
    });
  }, []);

  const { selectedItems } = payload;

  const returnValue = useMemo(
    () => ({
      selectedItems,
      toggleItem,
    }),
    [toggleItem, selectedItems],
  );

  return returnValue;
}

export default useSelectedItems;
