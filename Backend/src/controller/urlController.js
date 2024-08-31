import { nanoid } from "nanoid";
import { URL } from "../Models/urlModel.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
export const generateShortURL = asyncHandler(async (req, res) => {
  const body = req.body;
  if (!body.url) throw new ApiError(404, "URL must be passed");

  const shortId = nanoid(8);

  await URL.create({
    shortId: shortId,
    redirectURL: body.url,
    vistHistory: [],
  });

  return res
    .status(201)
    .json(new ApiResponse(201, shortId, "ShortId created successfully"));
});

export const redirectURL = asyncHandler(async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        vistHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

export const getAnalytics = asyncHandler(async (req, res) => {
  const shortId = req.params.shortId;

  const result = await URL.findOne({ shortId });
  const totalClicks = result.vistHistory.length;
  const analytics = result.vistHistory;

  return res.status(200).json(new ApiResponse(200, { analytics, totalClicks }));
});
