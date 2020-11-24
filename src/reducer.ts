import { Reducer } from "react";
import produce from "immer";

import { State, Action, ActionType } from "./types";

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case ActionType.INITIALIZE_ITEMS: {
      const { itemIdentifierKey } = state;

      const {
        initialSelectedItems = [],
        initialItems = [],
      } = action.payload;

      return {
        itemIdentifierKey,
        items: initialItems.map((item) => ({
          ...item,
          isSelected: initialSelectedItems.includes(item),
        })),
      };
    }

    case ActionType.TOGGLE_SELECTED_STATUS: {
      const { itemIdentifierKey } = state;

      const { item = {} } = action.payload;

      return produce(state, draftState => {
        draftState.items.map((itemFound) => {
          const isItem = itemFound[itemIdentifierKey] === item[itemIdentifierKey];

          if (!isItem) {
            return itemFound;
          }

          return ({
            ...itemFound,
            isSelected: !itemFound.isSelected,
          });
        });

        return draftState;
      });
    }

    default: {
      throw new Error("Unknown action type");
    }
  }
};

export default reducer;
