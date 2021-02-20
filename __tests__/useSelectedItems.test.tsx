import { renderHook, act } from "@testing-library/react-hooks";

import useSelectedItems from "../src/index";
import { ERROR_MESSAGES } from "../src/constants";

const initialExampleItems = [
  { id: 1, text: "What's up" },
  { id: 2, text: "Hey there" },
  { id: 3, text: "How you doing?" },
];

type ExampleItem = typeof initialExampleItems[number]

describe("useSelectedItems", () => {
  it("should initialize items", () => {
    const { result } = renderHook(() => useSelectedItems<ExampleItem>({
      itemIdentifierKey: "id",
      initialItems: initialExampleItems,
    }));

    expect(result.current.items.length).toBe(initialExampleItems.length);
  });

  it("should initialize selected items", () => {
    const initialSelectedItems = [initialExampleItems[0]];

    const { result } = renderHook(() => useSelectedItems<ExampleItem>({
      itemIdentifierKey: "id",
      initialSelectedItems,
      initialItems: initialExampleItems,
    }));

    expect(result.current.selectedItems).toEqual(initialSelectedItems);

    expect(result.current.items).toContainEqual(
      expect.objectContaining({
        ...initialSelectedItems[0],
        isSelected: true,
      }),
    );
  });

  it("should toggle a single item", () => {
    const { result } = renderHook(() => useSelectedItems<ExampleItem>({
      itemIdentifierKey: "id",
      initialItems: initialExampleItems,
    }));

    act(() => {
      result.current.toggleSingleItem(initialExampleItems[0]);
    });

    expect(result.current.selectedItems).toContainEqual(
      expect.objectContaining(initialExampleItems[0]),
    );

    act(() => {
      result.current.toggleSingleItem(initialExampleItems[1]);
    });

    expect(result.current.selectedItems).toContainEqual(
      expect.objectContaining(initialExampleItems[0]),
    );
    expect(result.current.selectedItems).toContainEqual(
      expect.objectContaining(initialExampleItems[1]),
    );
  });

  it("should toggle all items", () => {
    const { result } = renderHook(() => useSelectedItems<ExampleItem>({
      itemIdentifierKey: "id",
      initialItems: initialExampleItems,
    }));

    expect(result.current.selectedItems).not.toEqual(initialExampleItems);

    act(() => {
      result.current.toggleAllItems();
    });

    expect(result.current.selectedItems).toEqual(initialExampleItems);
  });

  it("shouldn't render if itemIdentifierKey is wrong", () => {
    const { result } = renderHook(() => useSelectedItems<ExampleItem>({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      itemIdentifierKey: "invalid-key",
      initialItems: initialExampleItems,
    }));

    expect(result.error).toEqual(Error(ERROR_MESSAGES.INVALID_ITEM_IDENTIFIER));
  });
});
