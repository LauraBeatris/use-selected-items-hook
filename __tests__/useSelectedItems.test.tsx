import { renderHook, act } from "@testing-library/react-hooks";

import useSelectedItems from "../src/index";

const initialExampleItems = [
  { id: 1, text: "What's up" },
  { id: 2, text: "Hey there" },
  { id: 3, text: "How you doing?" },
];

type ExampleItem = typeof initialExampleItems[number]

describe("useSelectedItems", () => {
  it("should initialize items", () => {
    const { result } = renderHook(() => useSelectedItems<ExampleItem, ExampleItem["text"]>({
      itemIdentifierKey: "id",
      initialItems: initialExampleItems,
    }));

    expect(result.current.items.length).toBe(initialExampleItems.length);
  });

  it("should initialize selected items", () => {
    const initialSelectedItems = [initialExampleItems[0]];

    const { result } = renderHook(() => useSelectedItems<ExampleItem, ExampleItem["text"]>({
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

  it("should render with empty items", () => {
    const { result } = renderHook(() => useSelectedItems<ExampleItem, ExampleItem["text"]>({
      itemIdentifierKey: "id",
    }));

    expect(result.current.items).toEqual([]);
  });

  it("should toggle a single item", () => {
    const { result } = renderHook(() => useSelectedItems<ExampleItem, ExampleItem["text"]>({
      itemIdentifierKey: "id",
      initialItems: initialExampleItems,
    }));

    act(() => {
      result.current.toggleSingleItem(1);
    });

    expect(result.current.selectedItems).toContainEqual(
      expect.objectContaining(initialExampleItems[0]),
    );

    act(() => {
      result.current.toggleSingleItem(2);
    });

    expect(result.current.selectedItems).toContainEqual(
      expect.objectContaining(initialExampleItems[0]),
    );
    expect(result.current.selectedItems).toContainEqual(
      expect.objectContaining(initialExampleItems[1]),
    );
  });

  it("should toggle all items", () => {
    const { result } = renderHook(() => useSelectedItems<ExampleItem, ExampleItem["text"]>({
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
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();

    expect(() => {
      renderHook(() => useSelectedItems<ExampleItem, ExampleItem["text"]>({
        itemIdentifierKey: "wrong-id",
        initialItems: initialExampleItems,
      }));
    }).toThrowError();

    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
