import { describe, it, expect } from "vitest";
import {
  truncate,
  capitalizeWords,
  camelToTitle,
} from "../src/utils/stringUtilities";

describe("truncate", () => {
  it("should shorten text and append … if it exceeds maxLength (Normal Case)", () => {
    // Act
    const result = truncate("123456", 3);

    // Assert
    expect(result).toEqual("123...");
  });

  it("should work correctly when max length is 0 (Lower bound edge case)", () => {
    // Act
    const result = truncate("123456", 0);

    // Assert
    expect(result).toEqual("...");
  });

  it("should work correctly when max length is higher than the length of the word (Higher bound edge case)", () => {
    // Act
    const result = truncate("123456", 10);

    // Assert
    expect(result).toEqual("123456");
  });
});

describe("capitalizeWords", () => {
  it("should Capitalize each word in a sentence", () => {
    // Act
    const result = capitalizeWords("this is a sentence.");

    // Assert
    expect(result).toEqual("This Is A Sentence.");
  });

  it("should return an empty string when empty string is input", () => {
    // Act
    const result = capitalizeWords("");

    // Assert
    expect(result).toEqual("");
  });

  it("should work correctly with special chars", () => {
    // Act
    const result = capitalizeWords("this! is? %a sen,t@ence.");

    // Assert
    expect(result).toEqual("This! Is? %a Sen,t@ence.");
  });

  it("should work correctly when some words are already capitalised", () => {
    // Act
    const result = capitalizeWords("This is a sENTENCE.");

    // Assert
    expect(result).toEqual("This Is A SENTENCE.");
  });
});

describe("camelToTitle", () => {
  it("should convert camelcase to title case for multiple words", () => {
    // Act
    const result = camelToTitle("firstName");

    // Assert
    expect(result).toEqual("First Name");
  });

  it("should return an empty string when empty string is input", () => {
    // Act
    const result = camelToTitle("");

    // Assert
    expect(result).toEqual("");
  });

  it("should convert camelcase to title case for a single word", () => {
    // Act
    const result = camelToTitle("first");

    // Assert
    expect(result).toEqual("First");
  });
});
