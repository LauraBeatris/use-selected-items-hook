import { renderHook, act } from "@testing-library/react-hooks";

import useSelectedItems from "../../src/index";
import { ERROR_MESSAGES } from "../../src/constants";
import { INITIAL_TEST_ITEMS, TestItem } from "../constants";

describe("Hook Actions", () => {
  it("should toggle a single item", () => {
    const { result } = renderHook(() => useSelectedItems<TestItem>({
      itemIdentifierKey: "id",
      initialItems: INITIAL_TEST_ITEMS,
    }));

    const item = INITIAL_TEST_ITEMS[0];

    act(() => result.current.toggleSingleItem(item));

    expect(result.current.selectedItems).toEqual([item]);

    act(() => result.current.toggleSingleItem(item));

    expect(result.current.selectedItems).toEqual([]);
  });

  it("should toggle all items", () => {
    const { result } = renderHook(() => useSelectedItems<TestItem>({
      itemIdentifierKey: "id",
      initialItems: INITIAL_TEST_ITEMS,
    }));

    act(() => result.current.toggleAllItems());

    expect(result.current.selectedItems).toEqual(INITIAL_TEST_ITEMS);

    act(() => result.current.toggleAllItems());

    expect(result.current.selectedItems).not.toEqual(INITIAL_TEST_ITEMS);
    expect(result.current.selectedItems.length).toBe(0);
  });

  it("should throw error for invalid item identifier key", () => {
    const { result } = renderHook(() => useSelectedItems<TestItem>({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
      itemIdentifierKey: "invalid-key",
      initialItems: INITIAL_TEST_ITEMS,
    }));

    expect(result.error).toEqual(Error(ERROR_MESSAGES.INVALID_ITEM_IDENTIFIER));
  });
});
