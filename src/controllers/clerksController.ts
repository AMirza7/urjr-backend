// src/controllers/clerksController.ts
import { Request, Response } from "express";
import { Op, fn, col, literal } from "sequelize";
import { catchAsync } from "../middleware/errorWrapper";
import User          from "../models/User";
import Rating        from "../models/Rating";
import State         from "../models/State";
import City          from "../models/City";

export const getClerks = catchAsync(async (req: Request, res: Response) => {
  // Validate & coerce query params
  const {
    availabilityStatus,
    stateId,
    cityId,
    minRating,
    page = "1",
    limit = "20",
  } = req.query as Record<string, string>;

  const where: any = { role: "legal_clerk" };
  if (availabilityStatus) where.availabilityStatus = availabilityStatus;
  if (stateId)            where.stateId          = stateId;
  if (cityId)             where.cityId           = cityId;

  // Base query options
  let query: any = {
    where,
    attributes: [
      "id",
      "name",
      "email",
      "profilePicture",
      "availabilityStatus",
      "stateId",
      "cityId",
      "address",
    ],
    include: [
      { model: State, as: "state", attributes: ["id", "name"] },
      { model: City,  as: "city",  attributes: ["id", "name"]  },
    ],
    offset: (parseInt(page, 10) - 1) * parseInt(limit, 10),
    limit: parseInt(limit, 10),
  };

  // If filtering by minimum rating, include a HAVING clause
  if (minRating) {
    const min = parseFloat(minRating);
    query.include.push({
      model: Rating,
      as: "ratingsReceived",
      attributes: [],
    });
    query.attributes.push([
      fn("AVG", col("ratingsReceived.score")),
      "avgScore",
    ]);
    query.group  = ["User.id", "state.id", "city.id"];
    query.having = literal(`AVG("ratingsReceived"."score") >= ${min}`);
  }

  const clerks = await User.findAll(query);
  res.json({
    clerks,
    pagination: {
      page:  parseInt(page, 10),
      limit: parseInt(limit, 10),
    },
  });
});
