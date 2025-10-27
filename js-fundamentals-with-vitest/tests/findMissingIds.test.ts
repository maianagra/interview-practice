import { describe, it, expect } from "vitest";
import { findMissingIds } from "../src/utils/findMissingIds";

describe("findMissingIds", () => {
  it("should return the list of missing numbers in sequence", () => {
    // Act
    const result = findMissingIds([1, 2, 4, 6]);

    // Arrange
    expect(result).toEqual([3, 5]);
  });

  it("should return the list of missing numbers in sequence when 1 is not the start", () => {
    // Act
    const result = findMissingIds([2, 4, 6]);

    // Arrange
    expect(result).toEqual([3, 5]);
  });

  it("should return the list of missing numbers in sequence when there are multiple missing in a row", () => {
    // Act
    const result = findMissingIds([2, 4, 8]);

    // Arrange
    expect(result).toEqual([3, 5, 6, 7]);
  });

  it("should return an empty array if an empty array is input", () => {
    // Act
    const result = findMissingIds([]);

    // Arrange
    expect(result).toEqual([]);
  });
});
