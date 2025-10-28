import { Router } from "express";
import {
  getClaims,
  getClaimsSummary,
  getClaimsSearch,
} from "../controllers/claimsController";

const router = Router();

router.get("/", getClaims);
router.get("/summary", getClaimsSummary);
router.get("/search", getClaimsSearch);

export default router;
