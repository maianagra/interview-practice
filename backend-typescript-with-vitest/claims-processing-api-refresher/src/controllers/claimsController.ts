import { Request, Response } from "express";
import { Claim, ClaimsSummary } from "../types/claims";
import {
  fetchClaims,
  fetchClaimsSearch,
  fetchClaimsSummary,
} from "../services/claimsService";
import { filterClaimsByStatus } from "../utils/claims";

export function getClaims(req: Request, res: Response) {
  try {
    const response: Claim[] = fetchClaims();

    const status = req.query.status;
    if (typeof status === "string") {
      const filteredClaims = filterClaimsByStatus(response, status);
      return res.json(filteredClaims);
    }

    return res.json(response);
  } catch (error: any) {
    if (error.status) {
      return res.status(error.status).json({ error: error.message });
    }
    return res.status(500).json({ error: "Failed to fetch claims" });
  }
}

export function getClaimsSummary(req: Request, res: Response) {
  try {
    // Fetch the claims summary
    const response: ClaimsSummary = fetchClaimsSummary();
    return res.json(response);
  } catch (error: any) {
    if (error.status) {
      return res.status(error.status).json({ error: error.message });
    }
    return res.status(500).json({ error: "Error fetching a claims summary" });
  }
}

export function getClaimsSearch(req: Request, res: Response) {
  try {
    const query = req.query.term;
    if (typeof query !== "string" || query.trim() === "") {
      return res
        .status(400)
        .json({ error: "Query parameter 'term' is required" });
    }

    const response: Claim[] = fetchClaimsSearch(query);
    return res.json(response);
  } catch (error: any) {
    if (error.status) {
      return res.status(error.status).json({ error: error.message });
    }
    return res.status(500).json({ error: "Error searching claims" });
  }
}
