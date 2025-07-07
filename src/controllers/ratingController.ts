// src/controllers/ratingController.ts

import { Request, Response } from 'express';
import { Rating }           from '../models/Rating';
import sequelize            from '../config/database';
import { catchAsync }       from '../middleware/errorWrapper';
import requireAuth          from '../middleware/requireAuth';

// POST /api/clerks/:clerkId/rate
export const rateClerk = [
  requireAuth,
  catchAsync(async (req: Request, res: Response) => {
    const { score, comment } = req.body;
    const { clerkId }        = req.params;

    // — Validate score is an integer between 1 and 5
    if (
      typeof score !== 'number' ||
      !Number.isInteger(score) ||
      score < 1 ||
      score > 5
    ) {
      return res
        .status(400)
        .json({ error: 'Score must be an integer between 1 and 5.' });
    }

    // — Validate comment if present
    let safeComment: string | null = null;
    if (comment !== undefined) {
      if (typeof comment !== 'string') {
        return res
          .status(400)
          .json({ error: 'Comment must be a string.' });
      }
      const trimmed = comment.trim();
      if (trimmed.length === 0) {
        safeComment = null;
      } else {
        safeComment = trimmed;
      }
    }

    // — Insert the new Rating
    const rating = await Rating.create({
      clerkId,
      raterId: req.user!.id,
      score,
      comment: safeComment,
    });

    res.status(201).json({ rating });
  }),
];

// GET /api/clerks/:clerkId/ratings
export const listRatings = [
  requireAuth,
  catchAsync(async (req: Request, res: Response) => {
    const { clerkId } = req.params;

    const ratings = await Rating.findAll({
      where: { clerkId },
      order: [['createdAt', 'DESC']],
    });

    res.json({ ratings });
  }),
];

// GET /api/clerks/:clerkId/rating-summary
export const getRatingSummary = [
  requireAuth,
  catchAsync(async (req: Request, res: Response) => {
    const { clerkId } = req.params;

    // run aggregate query
    const rawResult = await Rating.findAll({
      where: { clerkId },
      attributes: [
        [sequelize.fn('AVG',   sequelize.col('score')), 'avgScore'],
        [sequelize.fn('COUNT', sequelize.col('id')),    'count'],
      ],
      raw: true,
    });

    // first row or defaults
    const row = (rawResult[0] as any) ?? { avgScore: '0', count: '0' };
    const avgScore = parseFloat(row.avgScore) || 0;
    const count    = parseInt(row.count, 10)   || 0;

    res.json({ avgScore, count });
  }),
];
