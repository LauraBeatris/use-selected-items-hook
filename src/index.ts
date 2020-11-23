import {
  Reducer,
  useMemo,
  useEffect,
  useReducer,
  useCallback,
} from "react";

import reducer from "./reducer";
import {
  HookArguments,
  ActionType,
  Action,
  State,
} from "./types";

function useSelectedItems<T extends Record<any, any>, K>({
  initialItems = [],
  itemIdentifierKey,
  initialSelectedItems = [],
}: HookArguments<T, K>) {
  const [items, dispatch] = useReducer<Reducer<State<T>, Action>>(reducer, []);

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

  useEffect(() => {
    dispatch({
      type: ActionType.INITIALIZE_ITEMS,
      payload: {
        initialItems,
        itemIdentifierKey,
        initialSelectedItems,
      },
    });
  }, [
    initialItems,
    itemIdentifierKey,
    initialSelectedItems,
  ]);

  const toggleItem = useCallback((itemIdentifierValue: K) => {
    dispatch({
      type: ActionType.TOGGLE_ITEM,
      payload: {
        itemIdentifierKey,
        itemIdentifierValue,
      },
    });
  }, [itemIdentifierKey]);

  const returnValue = useMemo(
    () => ({
      items,
      toggleItem,
    }),
    [
      items,
      toggleItem,
    ],
  );

  return returnValue;
}

export default useSelectedItems;
