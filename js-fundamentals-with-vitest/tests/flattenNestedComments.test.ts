import { describe, it, expect } from "vitest";
import { flattenNestedComments } from "../src/utils/flattenNestedComments";

describe("flattenComments", () => {
  it("should convert a nested comment tree into a flat array", () => {
    // Arrange
    const comments = [
      {
        id: 1,
        text: "Root",
        replies: [
          { id: 2, text: "Child 1", replies: [] },
          {
            id: 3,
            text: "Child 2",
            replies: [{ id: 4, text: "Nested", replies: [] }],
          },
        ],
      },
    ];
    const expectedResult = [
      { id: 1, text: "Root" },
      { id: 2, text: "Child 1" },
      { id: 3, text: "Child 2" },
      { id: 4, text: "Nested" },
    ];

    // Act
    const result = flattenNestedComments(comments);

    // Assert
    expect(result).toEqual(expectedResult);
  });
});
