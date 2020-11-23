import { Reducer, useReducer, useEffect } from "react";

import {
  HookArguments,
  ActionType,
  State,
  Action,
} from "./types";
import { DEFAULT_ITEM_IDENTIFIER, INITIAL_PAYLOAD } from "./constants";

const reducer: Reducer<State, Action> = (state, action) => {
  const { selectedItems = [], initialSelectedItems = [] } = state;

  switch (action.type) {
    case ActionType.INITIALIZE_ITEMS: {
      return {
        ...state,
        selectedItems: selectedItems.map((item) => ({
          ...item,
          isSelected: initialSelectedItems.includes(item),
        })),
      };
    }

    case ActionType.TOGGLE_ITEM: {
      // Execute logic
      return state;
    }

    default: {
      throw new Error("Unknown action type");
    }
  }
};

function useSelectedItems<T extends Record<any, any>>({
  initialItems = [],
  itemIdentifier = DEFAULT_ITEM_IDENTIFIER,
  initialSelectedItems = [],
}: HookArguments<T>) {
  const [payload] = useReducer(reducer, INITIAL_PAYLOAD, (state) => ({
    ...state,
    itemIdentifier,
    initialSelectedItems,
  }));

  useEffect(() => {
    const itemsWithInvalidIdentifers = initialItems.filter(
      (findItem: T) => {
        const hasItemIdentifier = findItem[itemIdentifier];

        return !hasItemIdentifier;
      },
    );

    const hasInitialItems = initialItems.length > 0;
    const hasItemsWithInvalidIdentifers = itemsWithInvalidIdentifers.length > 0;

    if (hasInitialItems && hasItemsWithInvalidIdentifers) {
      throw new Error(
        "Please, make sure to provide a valid identifier to all items",
      );
    }
  }, [
    itemIdentifier,
    initialItems,
  ]);

  return payload;
}

export default useSelectedItems;
