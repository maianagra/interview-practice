import { Claim, ClaimsSummary, RawClaim } from "../types/claims";

export function normalizeClaims(claims: RawClaim[]): Claim[] {
  return claims.map((claim) => transformClaim(claim));
}

export function transformClaim(claim: RawClaim): Claim {
  return {
    id: claim.claim_id,
    policyNumber: claim.policy_number,
    claimant: claim.claimant_name,
    amount: claim.amount_claimed,
    date: new Date(claim.date_submitted),
    status: claim.status.replace("_", " "),
  } as Claim;
}

export function filterClaimsByStatus(claims: Claim[], status: string): Claim[] {
  return claims.filter(
    (claim) => claim.status.toLowerCase() === status.toLowerCase()
  );
}

export function getClaimById(claims: Claim[], id: number): Claim | null {
  const claim = claims.filter((claim) => claim.id === id)[0];
  if (claim) {
    return claim;
  }
  return null;
}

export function createClaimsSummary(claims: Claim[]): ClaimsSummary {
  return {
    totalClaims: claims.length,
    totalAmount: claims.reduce((s, c) => s + c.amount, 0),
    averageAmount: claims.length
      ? claims.reduce((s, c) => s + c.amount, 0) / claims.length
      : 0,
    statusBreakdown: claims.reduce((acc, claim) => {
      const status = claim.status;
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
  };
}
