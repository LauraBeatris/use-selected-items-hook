import { Reducer } from "react";

import { State, Action, ActionType } from "./types";

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case ActionType.INITIALIZE_ITEMS: {
      const {
        initialItems = [],
        initialSelectedItems = [],
      } = action.payload ?? {};

      return initialItems.map((item) => ({
        ...item,
        isSelected: initialSelectedItems.includes(item),
      }));
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

export default reducer;
