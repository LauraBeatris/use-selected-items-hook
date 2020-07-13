import { useState, useCallback, useEffect } from "react";
import update from "immutability-helper";

import { HookArguments, HookReturnValues } from "./types";

function useSelectedItems<T>({
  items,
  itemIdentifier,
}: HookArguments<T>): HookReturnValues<T> {
  const [selectedItems, setSelectedItems] = useState<T[]>([]);

  const [itemsList, setItemsList] = useState(() => (
    items.map(item => ({
      ...item,
      selected: false,
    }))
  ));

  const verifyIfIdentifierIsValid = useCallback(() => {
    const itemIndex = !!(items.find(findItem => (
      findItem[itemIdentifier]
    )));

    if (!itemIndex) {
      throw new Error("Please, make sure to provide a valid identifier");
    }
  }, [
    itemIdentifier,
    items,
  ]);

  const toggleItem = useCallback((item) => {
    const selectedItemIndex = selectedItems.findIndex(findItem => (
      findItem[itemIdentifier] === item[itemIdentifier]
    ));

    const isSelected = selectedItemIndex >= 0;

    if (isSelected) {
      setSelectedItems(prev => update(prev, {
        $splice: [[selectedItemIndex, 1]],
      }));
    } else {
      setSelectedItems(prev => (
        update(prev, {
          $push: [item]
        })
      ));
    }
  }, [
    itemIdentifier,
    selectedItems,
  ]);

  useEffect(() => {
    verifyIfIdentifierIsValid();
  }, [verifyIfIdentifierIsValid]);

  useEffect(() => {
    if (selectedItems?.length) {
      setItemsList(prev => (
        prev.map(listItem => {
          const isSelected = !!(selectedItems.find(selectedItem => (
            selectedItem[itemIdentifier] === listItem[itemIdentifier]
          )));

          return {
            ...listItem,
            selected: isSelected,
          };
        })
      ));
    }
  }, [
    selectedItems,
    itemIdentifier,
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
