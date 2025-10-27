import { describe, it, expect } from "vitest";
import {
  NormalizedUser,
  transformUserApiResponse,
} from "../src/utils/transformUserApiResponse";

describe("transformUserApiResponse", () => {
  it("should normalize a raw API payload of users to a consistent internal format", () => {
    // Arrange
    const apiUsers: any[] = [
      { user_id: 1, full_name: "Alice Example", mail: "alice@test.com" },
      { user_id: 2, full_name: "Bob Builder", mail: "bob@test.com" },
    ];
    const expectedResult: NormalizedUser[] = [
      { id: 1, name: "Alice Example", email: "alice@test.com" },
      { id: 2, name: "Bob Builder", email: "bob@test.com" },
    ];

    // Act
    const result = transformUserApiResponse(apiUsers);

    // Assert
    expect(result).toEqual(expectedResult);
  });

  it("return an empty array when there are no users", () => {
    // Arrange
    const apiUsers: any[] = [];
    const expectedResult: NormalizedUser[] = [];

    // Act
    const result = transformUserApiResponse(apiUsers);

    // Assert
    expect(result).toEqual(expectedResult);
  });
});
