import { Request, Response, NextFunction } from 'express';
import { searchSections }                 from '../utils/sectionSearch';
import type { Section }                   from '../types/sections';
import logger                             from '../utils/logger'; // your Winston (or similar) logger
import { getDiff, categorizeDiff }        from '../utils/diffUtils';

interface SectionsQuery {
  act?: string;
  q?: string;
  limit?: string;
  offset?: string;
}

/**
 * GET /api/v1/sections?act=&q=&limit=&offset=
 */
export const searchSectionsHandler = async (
  req: Request<{}, any, any, SectionsQuery>,
  res: Response,
  next: NextFunction
) => {
  const {
    act = 'All',
    q   = '',
    limit  = '50',
    offset = '0',
  } = req.query;

  const actParam = act as Section['act'] | 'All';
  const L = Math.min(Number(limit), 100);
  const O = Math.max(Number(offset), 0);

  try {
    // 1️⃣ Validate act
    const validActs = ['All','IPC','CrPC','CPC','BNS','BNSS','BSA'] as const;
    if (!validActs.includes(actParam as any)) {
      return res
        .status(400)
        .json({ error: `Invalid act; must be one of ${validActs.join(', ')}` });
    }

    // 2️⃣ Perform search
    const allResults = await searchSections(actParam, q);

    // 3️⃣ Logging
    logger.info('Sections search', {
      ip: req.ip,
      act: actParam,
      query: q,
      totalMatches: allResults.length,
    });

    // 4️⃣ Paginate
    const paged = allResults.slice(O, O + L);

    // 5️⃣ Caching headers
    // Data changes infrequently—allow clients to cache for 1 hour
    res.set('Cache-Control', 'public, max-age=3600');

    // 6️⃣ Respond with strictly the Section fields
    return res.json({
      total:   allResults.length,
      limit:   L,
      offset:  O,
      results: paged.map(({ act, number, title, summary, fullText }) => ({
        act, number, title, summary, fullText
      })),
    });
  } catch (err) {
    logger.error('Sections search error', { err, act: actParam, query: q });
    return next(err);
  }
};

export const compareSectionsHandler = async (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  try {
    const { act, number, targetAct } = req.body as {
      act: string;
      number: string;
      targetAct: string;
    };

    // 1) Fetch source and target sections
    const [src] = await searchSections(act as any, number);
    const [tgt] = await searchSections(targetAct as any, number);

    // 2) Compute diff and categorize
    const rawDiff = getDiff(src.fullText, tgt.fullText);
    const result  = categorizeDiff(rawDiff);

    // 3) Return the four arrays
    return res.json(result);
  } catch (err) {
    return next(err);
  }
};
