import {
  useMemo,
  useEffect,
  useReducer,
  useCallback,
} from "react";

import reducer from "./reducer";
import {
  HookArguments,
  DefaultItem,
  ActionType,
  State,
} from "./types";
import { INITIAL_STATE } from "./constants";

function useSelectedItems<T extends DefaultItem, K extends string>({
  initialItems = [],
  itemIdentifierKey,
  initialSelectedItems = [],
}: HookArguments<T, K>) {
  const [{ items }, dispatch] = useReducer(
    reducer,
    INITIAL_STATE,
    (state: State) => ({
      ...state,
      itemIdentifierKey,
    }),
  );

  const toggleItem = useCallback((itemIdentifierValue: T) => {
    dispatch({
      type: ActionType.TOGGLE_SELECTED_STATUS,
      payload: {
        itemIdentifierValue,
      },
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
    itemIdentifierKey,
    initialItems,
  ]);

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
