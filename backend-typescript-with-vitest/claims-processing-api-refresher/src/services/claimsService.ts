import { Claim, ClaimsSummary, RawClaim } from "../types/claims";
import { createClaimsSummary, normalizeClaims } from "../utils/claims";
import { rawClaims } from "../utils/mockApi";

export function fetchClaims(): Claim[] {
  // Fetch claims from API
  const response: RawClaim[] = rawClaims;

  // Transform Claims
  return normalizeClaims(response);
}

export function fetchClaimsSummary(): ClaimsSummary {
  // Fetch claims from API
  const response = fetchClaims();

  // Aggregate the Claims
  return createClaimsSummary(response);
}

export function fetchClaimsSearch(term: string): Claim[] {
  // Fetch claims from API
  const response = fetchClaims();

  const lowerQuery = term.toLowerCase();

  const filteredClaims = response.filter(
    (claim) =>
      claim.policyNumber.toLowerCase().includes(lowerQuery) ||
      claim.claimant.toLowerCase().includes(lowerQuery)
  );

  return filteredClaims;
}
