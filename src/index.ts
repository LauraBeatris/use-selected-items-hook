import { useState, useCallback, useEffect } from "react";
import update from "immutability-helper";

import { HookArguments, HookReturnValues, Item } from "./types";

export const DEFAULT_ITEM_IDENTIFIER = "id";

function useSelectedItems<T extends Record<any, any>>({
  items = [],
  itemIdentifier = DEFAULT_ITEM_IDENTIFIER,
}: HookArguments<T>): HookReturnValues<T> {
  const [selectedItems, setSelectedItems] = useState<T[]>([]);
  const [itemsList, setItemsList] = useState<Item<T>[]>([]);

  useEffect(() => {
    const itemIdentifierIsValid = items.every(
      (findItem: T) => Object.prototype.hasOwnProperty.call(
        findItem,
        itemIdentifier,
      ),
    );

    if (items.length > 0 && !itemIdentifierIsValid) {
      throw new Error("Please, make sure to provide a valid identifier");
    }
  }, [
    itemIdentifier,
    items,
  ]);

  useEffect(() => {
    let updatedItemsList: Item<T>[] = [];

    if (items) {
      updatedItemsList = items.map(listItem => {
        const isSelected = !!(selectedItems.find(selectedItem => (
          selectedItem[itemIdentifier] === listItem[itemIdentifier]
        )));

        return {
          ...listItem,
          selected: isSelected,
        };
      });
    }

    setItemsList(updatedItemsList);
  }, [
    selectedItems,
    itemIdentifier,
    items,
  ]);

  const toggleItem = useCallback((item) => {
    const selectedItemIndex = selectedItems.findIndex(findItem => (
      findItem[itemIdentifier] === item[itemIdentifier]
    ));

    const isSelected = selectedItemIndex >= 0;

    if (isSelected) {
      setSelectedItems(prev => (
        update(prev, {
          $splice: [[selectedItemIndex, 1]],
        })
      ));
    } else {
      setSelectedItems(prev => (
        update(prev, {
          $push: [item],
        })
      ));
    }
  }, [
    itemIdentifier,
    selectedItems,
  ]);

  return [
    selectedItems,
    itemsList,
    {
      toggleItem,
      setSelectedItems,
      setItemsList,
    },
  ];
}

export default useSelectedItems;
