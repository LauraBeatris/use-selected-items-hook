import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";

import useSelectedItems from "../../src/index";
import AsyncInitialization, { GET_TEST_ITEMS_TIMEOUT } from "../components/AsyncInitialization";
import { INITIAL_TEST_ITEMS, TestItem } from "../constants";

describe("Hook Initialization", () => {
  it("should handle asynchronous items initialization", async () => {
    render(<AsyncInitialization />);

    await waitFor(() => (
      expect(screen.getByText(INITIAL_TEST_ITEMS[0].text)).toBeInTheDocument()
    ), { interval: GET_TEST_ITEMS_TIMEOUT });
  });

  it("should initialize items", () => {
    const { result } = renderHook(() => useSelectedItems<TestItem>({
      itemIdentifierKey: "id",
      initialItems: INITIAL_TEST_ITEMS,
    }));

    expect(result.current.items.length).toBe(INITIAL_TEST_ITEMS.length);
  });

  it("should initialize selected items", () => {
    const initialSelectedItem = INITIAL_TEST_ITEMS[0];

    const { result } = renderHook(() => useSelectedItems<TestItem>({
      itemIdentifierKey: "id",
      initialSelectedItems: [initialSelectedItem],
      initialItems: INITIAL_TEST_ITEMS,
    }));

    expect(result.current.selectedItems).toEqual([initialSelectedItem]);
    expect(result.current.items).toContainEqual(
      expect.objectContaining({
        ...initialSelectedItem,
        isSelected: true,
      }),
    );
  });
});
