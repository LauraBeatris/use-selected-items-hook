import React, { useState, useEffect, useCallback } from "react";

import useSelectedItems from "../../src";
import { INITIAL_TEST_ITEMS, TestItem } from "../constants";

export const GET_TEST_ITEMS_TIMEOUT = 500;

const getTestItems = (): Promise<TestItem[]> => (
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(INITIAL_TEST_ITEMS);
    }, GET_TEST_ITEMS_TIMEOUT);
  })
);

const AsyncInitialization: React.FC = () => {
  const [testItems, setTestItems] = useState<TestItem[]>([]);

  const fetchTestItems = useCallback(() => {
    getTestItems()
      .then(response => {
        setTestItems(response);
      });
  }, []);

  useEffect(() => {
    fetchTestItems();
  }, [fetchTestItems]);

  const initialSelectedItems = [...(testItems[0] ? [testItems[0]] : [])];

  const { items } = useSelectedItems<TestItem>({
    itemIdentifierKey: "id",
    initialItems: testItems,
    initialSelectedItems,
  });

  return (
    <div>
      {(items ?? []).map(item => <p key={item.id}>{item.text}</p>)}
    </div>
  );
};

export default AsyncInitialization;
