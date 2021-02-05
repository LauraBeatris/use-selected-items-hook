import { renderHook, act } from "@testing-library/react-hooks";

import useSelectedItems from "../src/index";

const initialExampleItems = [
  { id: 1, text: "What's up" },
  { id: 2, text: "Hey there" },
  { id: 3, text: "How you doin'" },
];

interface ExampleItem {
  id: number;
  text: string;
}

describe("useSelectedItems", () => {
  it("should return all items", () => {
    const { result } = renderHook(() => useSelectedItems<ExampleItem, ExampleItem["text"]>({
      itemIdentifierKey: "id",
      initialItems: initialExampleItems,
    }));

    const expectedItems = initialExampleItems.map((item) => ({
      ...item,
      isSelected: false,
    }));

    expect(result.current.items).toEqual(expectedItems);
  });

  it("should render with initialSelectedItems", () => {
    const { result } = renderHook(() => useSelectedItems<ExampleItem, ExampleItem["text"]>({
      itemIdentifierKey: "id",
      initialSelectedItems: [initialExampleItems[0]],
      initialItems: initialExampleItems,
    }));

    expect(result.current.selectedItems).toContainEqual(
      expect.objectContaining(initialExampleItems[0]),
    );

    expect(result.current.items).toContainEqual(
      expect.objectContaining({ ...initialExampleItems[0], isSelected: true }),
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

    expect(result.current.selectedItems).not.toContainEqual(
      expect.objectContaining(initialExampleItems[0]),
    );

    expect(result.current.selectedItems).not.toContainEqual(
      expect.objectContaining(initialExampleItems[1]),
    );

    expect(result.current.selectedItems).not.toContainEqual(
      expect.objectContaining(initialExampleItems[2]),
    );

    act(() => {
      result.current.toggleAllItems();
    });

    expect(result.current.selectedItems).toContainEqual(
      expect.objectContaining(initialExampleItems[0]),
    );

    expect(result.current.selectedItems).toContainEqual(
      expect.objectContaining(initialExampleItems[1]),
    );

    expect(result.current.selectedItems).toContainEqual(
      expect.objectContaining(initialExampleItems[2]),
    );
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
