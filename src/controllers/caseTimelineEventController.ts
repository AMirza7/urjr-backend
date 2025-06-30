import { Request, Response, NextFunction } from "express";
import CaseTimelineEvent from "../models/CaseTimelineEvent";
import { caseTimelineEventSchema } from "../schemas/caseTimelineEvent";

/**
 * Get all events for a case
 */
export const getTimelineEvents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { caseId } = req.params;
    const events = await CaseTimelineEvent.findAll({
      where: { caseId },
      order: [["date", "ASC"]],
    });
    res.json(events);
  } catch (err) {
    next(err);
  }
};

/**
 * Create a timeline event
 */
export const createTimelineEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { caseId } = req.params;
    const parsed = caseTimelineEventSchema.parse(req.body);

    const event = await CaseTimelineEvent.create({
      ...parsed,
      caseId,
    });

    res.status(201).json(event);
  } catch (err) {
    next(err);
  }
};

/**
 * Update a timeline event
 */
export const updateTimelineEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { caseId, eventId } = req.params;
    const event = await CaseTimelineEvent.findOne({
      where: { id: eventId, caseId },
    });
    if (!event) return res.status(404).json({ error: "Not found" });

    const parsed = caseTimelineEventSchema.partial().parse(req.body);
    await event.update(parsed);
    res.json(event);
  } catch (err) {
    next(err);
  }
};

/**
 * Delete a timeline event
 */
export const deleteTimelineEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { caseId, eventId } = req.params;
    const event = await CaseTimelineEvent.findOne({
      where: { id: eventId, caseId },
    });
    if (!event) return res.status(404).json({ error: "Not found" });

    await event.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
