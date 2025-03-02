const mongoose = require("mongoose");

const analyticLogsSchema = new mongoose.Schema(
  {
    timezone: {
      type: String,
      required: true,
    },
    ipAddress: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    referer: {
      type: String,
      required: false,
    },
    browser: {
      type: String,
      required: false,
    },
    browserVersion: {
      type: String,
      required: false,
    },
    os: {
      type: String,
      required: true,
    },
    osVersion: {
      type: String,
      required: false,
    },
    deviceModel: {
      type: String,
      required: false,
    },
    deviceType: {
      type: String,
      required: false,
    },
    deletedAt: {
      type: Date,
      required: false,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const linkSchema = new mongoose.Schema(
  {
    createdBy: {
      type: String,
      required: false,
    },
    originalUrl: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      required: true,
      index: true,
    },
    urlHitCount: {
      type: Number,
      required: true,
    },
    analyticLogs: [
      {
        type: analyticLogsSchema,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Link", linkSchema);
