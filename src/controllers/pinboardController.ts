// src/controllers/pinboardController.ts

import { Request, Response, NextFunction } from "express";
import PinboardPost from "../models/PinboardPost";
import { pinboardSchema, idParamSchema } from "../schemas/pinboard";

/**
 * Get all pinboard posts for the authenticated user.
 */
export const getAllPinboardPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const posts = await PinboardPost.findAll({
      where: { userId: req.user.id }
    });
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

/**
 * Get a single pinboard post by ID (must belong to user).
 */
export const getPinboardPostById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Optionally validate req.params here with idParamSchema

    const post = await PinboardPost.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });

    if (!post) {
      return res.status(404).json({ error: "Pinboard post not found" });
    }

    res.json(post);
  } catch (err) {
    next(err);
  }
};

/**
 * Create a new pinboard post for the authenticated user.
 */
export const createPinboardPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // FIX: Directly validate req.body, not { body: req.body }
    const parsed = pinboardSchema.parse(req.body);

    const newPost = await PinboardPost.create({
      content: parsed.content,
      tags: parsed.tags ?? [],
      priority: parsed.priority ?? "low",
      userId: req.user.id
    });

    res.status(201).json(newPost);
  } catch (err) {
    next(err);
  }
};

/**
 * Update a pinboard post (must belong to user).
 */
export const updatePinboardPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const post = await PinboardPost.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });

    if (!post) {
      return res.status(404).json({ error: "Pinboard post not found" });
    }

    // FIX: Use .partial() for partial updates
    const parsed = pinboardSchema.partial().parse(req.body);

    await post.update({
      ...parsed,
      priority: parsed.priority ?? post.priority,
    });

    res.json(post);
  } catch (err) {
    next(err);
  }
};

/**
 * Delete a pinboard post (must belong to user).
 */
export const deletePinboardPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const post = await PinboardPost.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });

    if (!post) {
      return res.status(404).json({ error: "Pinboard post not found" });
    }

    await post.destroy();

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
