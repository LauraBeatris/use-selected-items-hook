import { Reducer } from "react";

import { State, Action, ActionType } from "./types";

const reducer: Reducer<State, Action> = (state, action) => {
  const { itemIdentifierKey } = state;

  switch (action.type) {
    case ActionType.INITIALIZE_ITEMS: {
      const {
        initialSelectedItems = [],
        initialItems = [],
      } = action.payload ?? {};

      return {
        itemIdentifierKey,
        items: initialItems.map((item) => ({
          ...item,
          isSelected: initialSelectedItems.includes(item),
        })),
      };
    }

    case ActionType.TOGGLE_ITEM: {
      return state;
    }

    default: {
      throw new Error("Unknown action type");
    }
  }
};

export default reducer;
