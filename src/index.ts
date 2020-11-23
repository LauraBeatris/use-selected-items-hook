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
import { INITIAL_PAYLOAD } from "./constants";

function useSelectedItems<T, K>({
  initialItems = [],
  itemIdentifierKey,
  initialSelectedItems = [],
}: HookArguments<T, K>) {
  const [items, dispatch] = useReducer<Reducer<State, Action>>(reducer, INITIAL_PAYLOAD);

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

  const toggleItem = useCallback((itemIdentifierValue: T[K]) => {
    dispatch({
      type: ActionType.TOGGLE_ITEM,
      payload: {
        itemIdentifierValue,
      },
    });
  }, []);

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
