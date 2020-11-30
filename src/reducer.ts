import { Reducer } from "react";
import produce from "immer";

import { State, Action, ActionType } from "./types";

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case ActionType.INITIALIZE_ITEMS: {
      const {
        initialSelectedItems = [],
        initialItems = [],
      } = action.payload ?? {};

      return produce(state, draftState => ({
        ...draftState,
        items: initialItems.map((item) => ({
          ...item,
          isSelected: initialSelectedItems.includes(item),
        })),
      }));
    }

    case ActionType.TOGGLE_SINGLE_ITEM: {
      const { itemIdentifierKey } = state;

      const { itemIdentifierValue } = action.payload ?? {};

      return produce(state, draftState => {
        const { items } = draftState;

        const itemIndex = items.findIndex((itemFound) => (
          itemFound[itemIdentifierKey] === itemIdentifierValue
        ));

        const item = items[itemIndex];

        items.splice(itemIndex, 1, {
          ...item,
          isSelected: !item.isSelected,
        });

        return draftState;
      });
    }

    case ActionType.TOGGLE_ALL_ITEMS: {
      return produce(state, draftState => ({
        ...draftState,
        items: draftState.items.map(item => ({
          ...item,
          isSelected: !item.isSelected,
        })),
      }));
    }

    default: {
      throw new Error("Unknown action type");
    }
  }
};

export default reducer;
