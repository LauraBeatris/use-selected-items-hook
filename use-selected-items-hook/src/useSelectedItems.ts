import { useState, useCallback, useEffect } from "react";
import update from "immutability-helper";

import { InitialHookState, Actions } from "./types";

function useSelectedItems<T>(
  initialItems: InitialHookState<T[]> = [],
  itemIdentifier: string,
): [T[], Actions<T>] {
  const [items, setItems] = useState(initialItems);

  const verifyIfIdentifierIsValid = useCallback(() => {
    const itemIndex = items.find(findItem => (
      findItem[itemIdentifier]
    ));

    if (!itemIndex) {
      throw new Error("Please, make sure to provide a valid identifier");
    }
  }, [itemIdentifier]);

  useEffect(() => {
    verifyIfIdentifierIsValid();
  }, [verifyIfIdentifierIsValid]);

  const toggleItem = useCallback((item) => () => {
    const itemIndex = items.findIndex(findItem => (
      findItem[itemIdentifier] === item[itemIdentifier]
    ));

    if (itemIndex > -1) {
      const updatedItems = update(items, {
        $splice: [[0, 1]],
      });

      setItems(updatedItems);
    }
  }, [
    itemIdentifier,
    items,
  ]);

  return [
    items,
    {
      toggleItem,
      setItems,
    },
  ];
}

export default useSelectedItems;
