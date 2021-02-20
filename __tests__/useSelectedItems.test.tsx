import { renderHook, act } from "@testing-library/react-hooks";

import useSelectedItems from "../src/index";
import { ERROR_MESSAGES } from "../src/constants";

const initialExampleItems = [
  { id: 1, text: "What's up" },
  { id: 2, text: "Hey there" },
  { id: 3, text: "How you doing?" },
];

type ExampleItem = typeof initialExampleItems[number]

it("should initialize items", () => {
  const { result } = renderHook(() => useSelectedItems<ExampleItem>({
    itemIdentifierKey: "id",
    initialItems: initialExampleItems,
  }));

  expect(result.current.items.length).toBe(initialExampleItems.length);
});

it("should initialize selected items", () => {
  const initialSelectedItem = initialExampleItems[0];

  const { result } = renderHook(() => useSelectedItems<ExampleItem>({
    itemIdentifierKey: "id",
    initialSelectedItems: [initialSelectedItem],
    initialItems: initialExampleItems,
  }));

  expect(result.current.selectedItems).toEqual([initialSelectedItem]);
  expect(result.current.items).toContainEqual(
    expect.objectContaining({
      ...initialSelectedItem,
      isSelected: true,
    }),
  );
});

it("should toggle a single item", () => {
  const { result } = renderHook(() => useSelectedItems<ExampleItem>({
    itemIdentifierKey: "id",
    initialItems: initialExampleItems,
  }));

  const item = initialExampleItems[0];

  act(() => result.current.toggleSingleItem(item));

  expect(result.current.selectedItems).toEqual([item]);

  act(() => result.current.toggleSingleItem(item));

  expect(result.current.selectedItems).toEqual([]);
});

it("should toggle all items", () => {
  const { result } = renderHook(() => useSelectedItems<ExampleItem>({
    itemIdentifierKey: "id",
    initialItems: initialExampleItems,
  }));

  act(() => result.current.toggleAllItems());

  expect(result.current.selectedItems).toEqual(initialExampleItems);

  act(() => result.current.toggleAllItems());

  expect(result.current.selectedItems).not.toEqual(initialExampleItems);
  expect(result.current.selectedItems.length).toBe(0);
});

it("should throw error for invalid item identifier key", () => {
  const { result } = renderHook(() => useSelectedItems<ExampleItem>({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    itemIdentifierKey: "invalid-key",
    initialItems: initialExampleItems,
  }));

  expect(result.error).toEqual(Error(ERROR_MESSAGES.INVALID_ITEM_IDENTIFIER));
});
