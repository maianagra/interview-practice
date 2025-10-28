import { RawClaim } from "../types/claims";

// mockApi.ts
export const rawClaims = [
  {
    claim_id: 1001,
    policy_number: "PN-12345",
    claimant_name: "Alice Johnson",
    amount_claimed: 5500.75,
    date_submitted: "2025-10-10T00:00:00Z",
    status: "in_review",
  },
  {
    claim_id: 1002,
    policy_number: "PN-67890",
    claimant_name: "Bob Smith",
    amount_claimed: 1299.99,
    date_submitted: "2025-09-15T00:00:00Z",
    status: "approved",
  },
  {
    claim_id: 1003,
    policy_number: "PN-24680",
    claimant_name: "Carol White",
    amount_claimed: 250.0,
    date_submitted: "2025-08-01T00:00:00Z",
    status: "rejected",
  },
  {
    claim_id: 1004,
    policy_number: "PN-13579",
    claimant_name: "David Green",
    amount_claimed: 3750,
    date_submitted: "2025-10-01T00:00:00Z",
    status: "in_review",
  },
  {
    claim_id: 1005,
    policy_number: "PN-11223",
    claimant_name: "Eve Black",
    amount_claimed: 480.5,
    date_submitted: "2025-10-20T00:00:00Z",
    status: "approved",
  },
] as RawClaim[];
