export interface RawClaim {
  claim_id: number;
  policy_number: string;
  claimant_name: string;
  date_submitted: string;
  amount_claimed: number;
  status: string;
}

export interface Claim {
  id: number;
  policyNumber: string;
  claimant: string;
  date: Date;
  amount: number;
  status: string;
}

export interface ClaimsSummary {
  totalClaims: number;
  totalAmount: number;
  averageAmount: number;
  statusBreakdown: Record<string, number>;
}
