import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import asyncHandler from '../utils/asyncHandler';
import { searchSectionsHandler } from '../controllers/sectionsController';
import { compareSectionsHandler } from '../controllers/sectionsController';

const router = Router();

// Rate limiter: max 100 requests per minute per IP
const sectionsLimiter = rateLimit({
  windowMs: 60_000,
  max: 100,
  message: { error: 'Too many requests, please slow down.' },
});

// Mount the versioned, rate-limited endpoint
// Clients will call GET /api/v1/sections
router.use('/', sectionsLimiter);
router.get('/', asyncHandler(searchSectionsHandler));
router.post('/compare', asyncHandler(compareSectionsHandler));

export default router;
