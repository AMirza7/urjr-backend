// src/controllers/clerksController.ts
import { Request, Response } from "express";
import { Op } from "sequelize";
import asyncHandler from "../utils/asyncHandler";
import User from "../models/User";
import State from "../models/State";
import City from "../models/City";

export const getClerks = asyncHandler(async (req: Request, res: Response) => {
  const {
    availabilityStatus,
    stateId,
    cityId,
    minRating,
  } = req.query as {
    availabilityStatus?: string;
    stateId?: string;
    cityId?: string;
    minRating?: string;
  };

  const where: any = { role: "legal_clerk_typist" };
  if (availabilityStatus) where.availabilityStatus = availabilityStatus;
  if (stateId)            where.stateId          = stateId;
  if (cityId)             where.cityId           = cityId;
  if (minRating)          where.rating           = { [Op.gte]: parseFloat(minRating) };

  const clerks = await User.findAll({
    where,
    attributes: [
      "id",
      "name",
      "email",
      "profilePicture",
      "availabilityStatus",
      "stateId",
      "cityId",
      "rating",
      "address",
    ],
    include: [
      { model: State, as: "state", attributes: ["id", "name"] },
      { model: City,  as: "city",  attributes: ["id", "name"]  },
    ],
  });

  res.json(clerks);
});
