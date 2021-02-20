import { Reducer } from "react";
import update from "immutability-helper";

import { State, Action, ActionType } from "./types";

const reducer: <Item>() => Reducer<State<Item>, Action<Item>> = () => (state, action) => {
  switch (action.type) {
    case ActionType.INITIALIZE_ITEMS: {
      const {
        initialSelectedItems = [],
        initialItems = [],
      } = action.payload;

      return update(state, {
        items: {
          $set: initialItems.map((item) => ({
            ...item,
            isSelected: initialSelectedItems.includes(item),
          })),
        },
      });
    }

    case ActionType.TOGGLE_SINGLE_ITEM: {
      const { items, itemIdentifierKey } = state;

      const { itemIdentifierValue } = action.payload;

      const itemIndex = items.findIndex((itemFound) => (
        itemFound[itemIdentifierKey] === itemIdentifierValue
      ));

      const item = items[itemIndex];

      return update(state, {
        items: {
          $splice: [[itemIndex, 1, {
            ...item,
            isSelected: !item.isSelected,
          }]],
        },
      });
    }

    case ActionType.TOGGLE_ALL_ITEMS: {
      return update(state, {
        items: {
          $set: state.items.map(item => ({
            ...item,
            isSelected: !item.isSelected,
          })),
        },
      });
    }

    default: {
      throw new Error("Unknown action type");
    }
  }
};

export default reducer;
