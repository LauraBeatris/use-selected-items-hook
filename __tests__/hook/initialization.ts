import { renderHook } from "@testing-library/react-hooks";

import useSelectedItems from "../../src/index";
import { initialTestItems, TestItem } from "../constants";

describe("Hook Initialization", () => {
  it("should initialize items", () => {
    const { result } = renderHook(() => useSelectedItems<TestItem>({
      itemIdentifierKey: "id",
      initialItems: initialTestItems,
    }));

    expect(result.current.items.length).toBe(initialTestItems.length);
  });

  it("should initialize selected items", () => {
    const initialSelectedItem = initialTestItems[0];

    const { result } = renderHook(() => useSelectedItems<TestItem>({
      itemIdentifierKey: "id",
      initialSelectedItems: [initialSelectedItem],
      initialItems: initialTestItems,
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
