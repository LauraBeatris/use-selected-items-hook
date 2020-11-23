import { useEffect } from "react";

import { HookArguments } from "./types";
import { DEFAULT_ITEM_IDENTIFIER } from "./constants";

function useSelectedItems<T extends Record<any, any>>({
  initialItems = [],
  itemIdentifier = DEFAULT_ITEM_IDENTIFIER,
}: HookArguments<T>) {
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
}

export default useSelectedItems;
