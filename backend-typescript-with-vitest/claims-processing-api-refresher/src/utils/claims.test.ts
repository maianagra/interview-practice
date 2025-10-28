import { describe, it, expect } from "vitest";
import {
  filterClaimsByStatus,
  normalizeClaims,
  getClaimById,
  createClaimsSummary,
} from "./claims";
import { Claim, RawClaim } from "../types/claims";

describe("normalizeClaims", () => {
  it("should normalize a list of claims correctly", () => {
    // Arrange
    const inputClaims = [
      {
        claim_id: 1002,
        policy_number: "PN-67890",
        claimant_name: "Bob Smith",
        amount_claimed: 1299.99,
        date_submitted: "2025-09-15T00:00:00Z",
        status: "approved",
      },
    ];
    const expectedResult = [
      {
        id: 1002,
        policyNumber: "PN-67890",
        claimant: "Bob Smith",
        amount: 1299.99,
        date: new Date("2025-09-15T00:00:00.000Z"),
        status: "approved",
      },
    ];

    // Act
    const result = normalizeClaims(inputClaims);

    // Assert
    expect(result).toEqual(expectedResult);
  });

  it("should return an empty list on empty list input", () => {
    // Arrange
    const inputClaims = [] as RawClaim[];

    // Act
    const result = normalizeClaims(inputClaims);

    // Assert
    expect(result).toEqual(inputClaims);
  });
});

describe("transformClaim", () => {
  it("should transform a single claim correctly", () => {
    // Arrange
    const inputClaim = {
      claim_id: 1003,
      policy_number: "PN-54321",
      claimant_name: "Charlie Brown",
      amount_claimed: 499.5,
      date_submitted: "2025-10-01T00:00:00Z",
      status: "in_review",
    };
    const expectedResult = {
      id: 1003,
      policyNumber: "PN-54321",
      claimant: "Charlie Brown",
      amount: 499.5,
      date: new Date("2025-10-01T00:00:00.000Z"),
      status: "in review",
    };

    // Act
    const result = normalizeClaims([inputClaim])[0];

    // Assert
    expect(result).toEqual(expectedResult);
  });
});

describe("filterClaimsByStatus", () => {
  it("should return only matching claims", () => {
    const inputClaims = [
      {
        id: 1002,
        policyNumber: "PN-67890",
        claimant: "Bob Smith",
        amount: 1299.99,
        date: new Date("2025-09-15T00:00:00.000Z"),
        status: "approved",
      },
      {
        id: 1003,
        policyNumber: "PN-67890",
        claimant: "Bob Smith",
        amount: 1299.99,
        date: new Date("2025-09-15T00:00:00.000Z"),
        status: "other status",
      },
    ];
    const expectedResult = [
      {
        id: 1002,
        policyNumber: "PN-67890",
        claimant: "Bob Smith",
        amount: 1299.99,
        date: new Date("2025-09-15T00:00:00.000Z"),
        status: "approved",
      },
    ];

    const result = filterClaimsByStatus(inputClaims, "approved");

    expect(result).toEqual(expectedResult);
  });

  it("should return an empty list on empty list input", () => {
    const inputClaims = [] as Claim[];
    const expectedResult = [] as Claim[];

    const result = filterClaimsByStatus(inputClaims, "approved");

    expect(result).toEqual(expectedResult);
  });
});

describe("getClaimById", () => {
  it("should return only matching claim", () => {
    const inputClaims = [
      {
        id: 1002,
        policyNumber: "PN-67890",
        claimant: "Bob Smith",
        amount: 1299.99,
        date: new Date("2025-09-15T00:00:00.000Z"),
        status: "approved",
      },
      {
        id: 1003,
        policyNumber: "PN-67890",
        claimant: "Bob Smith",
        amount: 1299.99,
        date: new Date("2025-09-15T00:00:00.000Z"),
        status: "other status",
      },
    ];
    const expectedResult = {
      id: 1002,
      policyNumber: "PN-67890",
      claimant: "Bob Smith",
      amount: 1299.99,
      date: new Date("2025-09-15T00:00:00.000Z"),
      status: "approved",
    };

    const result = getClaimById(inputClaims, 1002);

    expect(result).toEqual(expectedResult);
  });

  it("should return an empty list on empty list input", () => {
    const inputClaims = [] as Claim[];
    const expectedResult = null;

    const result = getClaimById(inputClaims, 123);

    expect(result).toEqual(expectedResult);
  });
});

describe("createClaimsSummary", () => {
  it("should create a correct summary of claims", () => {
    const inputClaims = [
      {
        id: 1001,
        policyNumber: "PN-12345",
        claimant: "Alice Johnson",
        amount: 5500.75,
        date: new Date("2025-10-10T00:00:00.000Z"),
        status: "in review",
      },
      {
        id: 1002,
        policyNumber: "PN-67890",
        claimant: "Bob Smith",
        amount: 1299.99,
        date: new Date("2025-09-15T00:00:00.000Z"),
        status: "approved",
      },
      {
        id: 1003,
        policyNumber: "PN-24680",
        claimant: "Carol White",
        amount: 250.0,
        date: new Date("2025-08-01T00:00:00.000Z"),
        status: "rejected",
      },
      {
        id: 1004,
        policyNumber: "PN-13579",
        claimant: "David Green",
        amount: 3750,
        date: new Date("2025-10-01T00:00:00.000Z"),
        status: "in review",
      },
    ];
    const expectedResult = {
      totalClaims: 4,
      totalAmount: 10800.74,
      averageAmount: 2700.185,
      statusBreakdown: {
        "in review": 2,
        approved: 1,
        rejected: 1,
      },
    };

    const result = createClaimsSummary(inputClaims);

    expect(result).toEqual(expectedResult);
  });
});
